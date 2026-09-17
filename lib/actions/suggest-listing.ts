"use server";

import { siteContact } from "@/data/site-contact";
import { getAppServices } from "@/lib/composition";
import type { ListingCategory } from "@/lib/domain/directory";
import { isListingCategory } from "@/lib/domain/listing-labels";

export type SuggestListingState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<
    Record<
      | "name"
      | "category"
      | "description"
      | "locality"
      | "contactEmail"
      | "contactPhone"
      | "websiteUrl"
      | "submittedByEmail"
      | "consent",
      string
    >
  >;
};

export const initialSuggestListingState: SuggestListingState = {
  status: "idle",
};

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidOptionalEmail(value: string): boolean {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidOptionalUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Public suggest-a-listing mutation via DirectoryPort.
 * Optional MailPort notify when a mail adapter is configured (noop = silent skip).
 */
export async function suggestListingAction(
  _prev: SuggestListingState,
  formData: FormData,
): Promise<SuggestListingState> {
  const name = readString(formData, "name");
  const categoryRaw = readString(formData, "category");
  const tagline = readString(formData, "tagline");
  const descriptionRaw = readString(formData, "description");
  const locality = readString(formData, "locality");
  const contactEmail = readString(formData, "contactEmail");
  const whatsapp = readString(formData, "whatsapp");
  const contactPhoneRaw = readString(formData, "contactPhone");
  const websiteUrl = readString(formData, "websiteUrl");
  const submittedByEmail = readString(formData, "submittedByEmail");
  const promoOffer = readString(formData, "promoOffer");
  const consentGiven = formData.get("consent") === "on";
  const deliveryModes = formData
    .getAll("deliveryModes")
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .map((v) => v.trim());
  const priceItems = formData
    .getAll("priceItem")
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim());
  const priceAmounts = formData
    .getAll("priceAmount")
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim());

  const priceLines = priceItems
    .map((item, index) => {
      const amount = priceAmounts[index]?.trim();
      if (!item) return null;
      return amount ? `${item} — from £${amount}` : item;
    })
    .filter(Boolean);

  const descriptionParts = [
    tagline ? `Tagline: ${tagline}` : null,
    descriptionRaw || null,
    deliveryModes.length > 0
      ? `Fulfillment: ${deliveryModes.join(", ")}`
      : null,
    priceLines.length > 0
      ? `Popular items & rates:\n${priceLines.map((line) => `• ${line}`).join("\n")}`
      : null,
    promoOffer ? `Community perk: ${promoOffer}` : null,
  ].filter(Boolean);
  const description = descriptionParts.join("\n\n");

  let contactPhone = contactPhoneRaw || whatsapp;
  if (whatsapp && !contactPhoneRaw) {
    const digits = whatsapp.replace(/\D/g, "");
    contactPhone = digits.startsWith("44")
      ? `+${digits}`
      : digits
        ? `+44${digits.replace(/^0/, "")}`
        : whatsapp;
  }

  const fieldErrors: SuggestListingState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Enter the listing name.";
  if (!isListingCategory(categoryRaw)) {
    fieldErrors.category = "Choose a category.";
  }
  if (!descriptionRaw && !tagline) {
    fieldErrors.description = "Add a short description.";
  }
  if (!consentGiven) {
    fieldErrors.consent =
      "Please confirm you agree to us storing this suggestion for review.";
  }
  if (!isValidOptionalEmail(contactEmail)) {
    fieldErrors.contactEmail = "Enter a valid email, or leave blank.";
  }
  if (!submittedByEmail) {
    fieldErrors.submittedByEmail = "Enter your contact email.";
  } else if (!isValidOptionalEmail(submittedByEmail)) {
    fieldErrors.submittedByEmail = "Enter a valid email.";
  }
  if (!isValidOptionalUrl(websiteUrl)) {
    fieldErrors.websiteUrl =
      "Enter a full website address starting with https://, or leave blank.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const category = categoryRaw as ListingCategory;
  const { directory, mail } = getAppServices();

  const result = await directory.suggestListing({
    name,
    category,
    description,
    locality: locality || undefined,
    contactEmail: contactEmail || undefined,
    contactPhone: contactPhone || undefined,
    websiteUrl: websiteUrl || undefined,
    submittedByEmail: submittedByEmail || undefined,
    consentGiven: true,
  });

  if (!result.accepted) {
    return {
      status: "error",
      message:
        "We could not save this suggestion right now. Please try again later, or email Theresa directly.",
    };
  }

  // Best-effort notify — never fail the user if mail is unconfigured.
  const notify = await mail.send({
    to: {
      email: siteContact.email,
      name: siteContact.contactName,
    },
    subject: `Market listing suggestion: ${name}`,
    text: [
      "A new Market listing suggestion needs review in Strapi.",
      "",
      `Name: ${name}`,
      `Category: ${category}`,
      locality ? `Area/town: ${locality}` : null,
      "",
      description,
      "",
      contactPhone ? `Phone / WhatsApp: ${contactPhone}` : null,
      contactEmail ? `Listing email: ${contactEmail}` : null,
      websiteUrl ? `Website: ${websiteUrl}` : null,
      submittedByEmail ? `Submitted by: ${submittedByEmail}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
    replyTo: submittedByEmail
      ? { email: submittedByEmail }
      : contactEmail
        ? { email: contactEmail }
        : undefined,
  });

  if (!notify.ok) {
    // Expected when MailPort is still noop — suggestion already accepted.
  }

  return {
    status: "success",
    message:
      "Thank you. Your suggestion is with NCP for approval and will not appear in the Market until an admin publishes it.",
  };
}
