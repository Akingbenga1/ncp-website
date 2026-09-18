"use server";

import { redirect } from "next/navigation";
import type {
  DuesCheckoutState,
  DuesReceiptState,
} from "@/lib/actions/dues-state";
import { getAppServices } from "@/lib/composition";
import { COMMUNITY_DUES_AMOUNT_GBP } from "@/lib/domain/dues";

/**
 * Start Community Dues card checkout via DuesPort (not donate PaymentPort).
 */
export async function createDuesCheckoutAction(
  _prev: DuesCheckoutState,
  _formData: FormData,
): Promise<DuesCheckoutState> {
  const { auth, members, dues } = getAppServices();
  const session = await auth.getSession();
  if (!session) {
    return {
      status: "error",
      message: "Please sign in to pay your community dues.",
    };
  }

  const profile = await members.getOwnProfile();
  if (!profile) {
    return {
      status: "error",
      message: "Please sign in to pay your community dues.",
    };
  }

  if (!dues.isCardCheckoutConfigured()) {
    return {
      status: "error",
      message:
        "Card payment for dues is not available yet. Please use bank transfer and upload your receipt below.",
    };
  }

  const status = await dues.getStatusForMember(profile.id, profile.email);
  if (status.status === "paid") {
    return {
      status: "error",
      message: "Your community dues are already paid for this period.",
    };
  }
  if (status.status === "pending") {
    return {
      status: "error",
      message:
        "A bank-transfer receipt is already pending for this period. You cannot start a card payment until that period ends.",
    };
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
    "http://localhost:3001";

  let redirectUrl: string;
  try {
    const checkout = await dues.createCardCheckout({
      memberId: profile.id,
      email: profile.email,
      successUrl: `${base}/dues/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${base}/dues/cancel`,
    });
    redirectUrl = checkout.redirectUrl;
  } catch (error) {
    console.error("DuesPort.createCardCheckout failed", error);
    return {
      status: "error",
      message:
        "We could not start card checkout right now. Please try again later, or use bank transfer below.",
    };
  }

  redirect(redirectUrl);
}

/**
 * Upload bank-transfer receipt → pending (no replace while active).
 */
export async function submitDuesReceiptAction(
  _prev: DuesReceiptState,
  formData: FormData,
): Promise<DuesReceiptState> {
  const { auth, members, dues } = getAppServices();
  const session = await auth.getSession();
  if (!session) {
    return {
      status: "error",
      message: "Please sign in to upload a dues receipt.",
    };
  }

  const profile = await members.getOwnProfile();
  if (!profile) {
    return {
      status: "error",
      message: "Please sign in to upload a dues receipt.",
    };
  }

  const file = formData.get("receipt");
  if (!(file instanceof File) || file.size === 0) {
    return {
      status: "error",
      message: "Choose a PDF or image receipt to upload.",
    };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  try {
    await dues.submitBankReceipt({
      memberId: profile.id,
      email: profile.email,
      fileName: file.name || "receipt",
      mimeType: file.type || "application/octet-stream",
      bytes,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Could not upload your receipt. Please try again.";
    return { status: "error", message };
  }

  return {
    status: "success",
    message: `Receipt received. Your £${COMMUNITY_DUES_AMOUNT_GBP} dues are marked pending for this period.`,
  };
}
