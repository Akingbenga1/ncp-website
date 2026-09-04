"use server";

import { redirect } from "next/navigation";
import {
  getAppServices,
  isPaymentCheckoutConfigured,
} from "@/lib/composition";
import type { DonationFrequency } from "@/lib/domain/payment";

export type DonateCheckoutState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<
    Record<
      | "amount"
      | "frequency"
      | "giftAidName"
      | "giftAidAddress"
      | "giftAidPostcode",
      string
    >
  >;
};

export const initialDonateCheckoutState: DonateCheckoutState = {
  status: "idle",
};

const SUGGESTED_AMOUNTS = new Set(["10", "25", "50"]);

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function siteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
    "http://localhost:3001"
  );
}

function parseAmountGbp(formData: FormData): number | null {
  const preset = readString(formData, "amountPreset");
  if (preset === "other") {
    const other = readString(formData, "amountOther").replace(/,/g, "");
    const value = Number.parseFloat(other);
    if (!Number.isFinite(value)) return null;
    return Math.round(value * 100) / 100;
  }
  if (!SUGGESTED_AMOUNTS.has(preset)) return null;
  return Number.parseInt(preset, 10);
}

function isFrequency(value: string): value is DonationFrequency {
  return value === "one-off" || value === "monthly";
}

/**
 * Start card checkout via PaymentPort only — never imports Stripe SDK.
 * On success, redirects to the opaque checkout URL from the adapter.
 */
export async function createCheckoutAction(
  _prev: DonateCheckoutState,
  formData: FormData,
): Promise<DonateCheckoutState> {
  if (!isPaymentCheckoutConfigured()) {
    return {
      status: "error",
      message:
        "Card donations are not available yet. Please use bank transfer below, or contact Theresa.",
    };
  }

  const amountGbp = parseAmountGbp(formData);
  const frequencyRaw = readString(formData, "frequency");
  const giftAidOptedIn = formData.get("giftAid") === "on";
  const giftAidName = readString(formData, "giftAidName");
  const giftAidAddress = readString(formData, "giftAidAddress");
  const giftAidPostcode = readString(formData, "giftAidPostcode");

  const fieldErrors: DonateCheckoutState["fieldErrors"] = {};

  if (amountGbp === null || amountGbp <= 0) {
    fieldErrors.amount = "Choose a suggested amount or enter another amount.";
  } else if (amountGbp < 1) {
    fieldErrors.amount = "The minimum donation is £1.";
  } else if (amountGbp > 25000) {
    fieldErrors.amount = "Please enter an amount of £25,000 or less.";
  }

  if (!isFrequency(frequencyRaw)) {
    fieldErrors.frequency = "Choose one-off or monthly.";
  }

  if (giftAidOptedIn) {
    if (!giftAidName) {
      fieldErrors.giftAidName = "Enter the name for Gift Aid.";
    }
    if (!giftAidAddress) {
      fieldErrors.giftAidAddress = "Enter your address for Gift Aid.";
    }
    if (!giftAidPostcode) {
      fieldErrors.giftAidPostcode = "Enter your postcode for Gift Aid.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const frequency = frequencyRaw as DonationFrequency;
  const base = siteBaseUrl();
  const { payments } = getAppServices();

  let redirectUrl: string;
  try {
    const session = await payments.createCheckout({
      amountGbp: amountGbp as number,
      frequency,
      giftAid: giftAidOptedIn
        ? {
            optedIn: true,
            fullName: giftAidName,
            addressLine: giftAidAddress,
            postcode: giftAidPostcode,
          }
        : { optedIn: false },
      successUrl: `${base}/donation/success`,
      cancelUrl: `${base}/donation/cancel`,
    });
    redirectUrl = session.redirectUrl;
  } catch (error) {
    console.error("PaymentPort.createCheckout failed", error);
    return {
      status: "error",
      message:
        "We could not start card checkout right now. Please try again later, or use bank transfer below.",
    };
  }

  redirect(redirectUrl);
}
