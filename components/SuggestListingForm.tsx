"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { CommunityPhoto } from "@/components/CommunityPhoto";
import { MaterialIcon } from "@/components/MaterialIcon";
import { communityPhotos } from "@/data/pixabay-credits";
import { siteContact } from "@/data/site-contact";
import {
  initialSuggestListingState,
  suggestListingAction,
  type SuggestListingState,
} from "@/lib/actions/suggest-listing";
import {
  LISTING_CATEGORIES,
  listingCategoryLabel,
} from "@/lib/domain/listing-labels";
import type { ListingCategory } from "@/lib/domain/directory";

const LOCALITIES = [
  "Peterborough Central (PE1)",
  "Woodston & Fletton (PE2)",
  "Bretton & Ravensthorpe (PE3)",
  "Werrington & Paston (PE4)",
  "Hampton, Yaxley & Orton (PE7)",
  "Cambridgeshire & Surrounding County",
  "Remote / UK-Wide Service",
] as const;

const DELIVERY_OPTIONS = [
  "Collection / Takeaway",
  "Local Doorstep Delivery",
  "Physical Dine-in / Stall",
  "UK Royal Mail Shipping",
  "Virtual / Phone Booking",
] as const;

const inputClass =
  "w-full rounded-lg bg-surface-card px-space-sm py-space-xs font-body text-body-md text-text-primary shadow-sm transition-all focus:bg-surface-tinted focus:outline-none";
const labelClass =
  "mb-space-3xs block font-label text-label-lg font-semibold text-text-primary";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-space-3xs font-body text-body-sm text-error" id={id} role="alert">
      {message}
    </p>
  );
}

function SectionCard({
  step,
  title,
  lead,
  badge,
  children,
}: {
  step: number;
  title: string;
  lead: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-surface-card p-space-md shadow-sm lg:p-space-lg">
      <div className="mb-space-md flex items-center justify-between pb-space-xs">
        <div className="flex items-center gap-space-xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-headline text-headline-sm text-on-primary">
            {step}
          </div>
          <div>
            <h2 className="font-headline text-headline-md font-bold text-text-primary">
              {title}
            </h2>
            <p className="font-body text-body-sm text-text-secondary">{lead}</p>
          </div>
        </div>
        {badge ? (
          <span className="rounded-full bg-surface-stone px-space-xs py-space-3xs font-label text-label-md text-text-muted">
            {badge}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function SuggestListingForm() {
  const [state, formAction, pending] = useActionState(
    suggestListingAction,
    initialSuggestListingState,
  );
  const [previewName, setPreviewName] = useState("Mama T's Kitchen & Catering");
  const [previewCategory, setPreviewCategory] =
    useState<ListingCategory>("business");
  const [previewTagline, setPreviewTagline] = useState(
    "Authentic smoky firewood jollof, warm meat pies & party trays across Cambridgeshire.",
  );
  const [previewLocality, setPreviewLocality] = useState<string>(LOCALITIES[0]);
  const [previewFrom, setPreviewFrom] = useState("12.50");

  const categoryLabel = useMemo(
    () => listingCategoryLabel(previewCategory),
    [previewCategory],
  );

  if (state.status === "success") {
    return (
      <div
        className="rounded-2xl bg-surface-card p-space-lg shadow-sm"
        role="status"
      >
        <div className="mb-space-md flex h-14 w-14 items-center justify-center rounded-full bg-surface-tinted text-brand-emerald">
          <MaterialIcon name="check_circle" className="text-[32px]" />
        </div>
        <h2 className="font-headline text-headline-md font-bold text-text-primary">
          Suggestion received
        </h2>
        <p className="mt-space-2xs font-body text-body-md text-text-secondary">
          {state.message}
        </p>
        <div className="mt-space-md flex flex-wrap gap-space-2xs">
          <Link
            href="/market"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-space-md py-space-2xs font-label text-label-lg text-on-primary hover:bg-primary-container"
          >
            Back to Market
          </Link>
          <a
            href="/market/suggest"
            className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-surface-card px-space-md py-space-2xs font-label text-label-lg text-primary hover:bg-surface-tinted"
          >
            Suggest another
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
      <div className="flex flex-col gap-space-lg lg:col-span-8">
        <form className="flex flex-col gap-space-lg" action={formAction} noValidate>
          {state.status === "error" && state.message ? (
            <p
              className="rounded-lg bg-error-container px-space-sm py-space-2xs font-body text-body-md text-on-error-container"
              role="alert"
            >
              {state.message}
            </p>
          ) : null}

          <SectionCard
            step={1}
            title="Business & Offering Overview"
            lead="Core details visible directly on directory search cards."
            badge="Required"
          >
            <div className="space-y-space-md">
              <div>
                <label className={labelClass} htmlFor="listing-name">
                  Listing or Business Name{" "}
                  <span className="text-accent-warm-ochre">*</span>
                </label>
                <input
                  id="listing-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="e.g. Mama T's Kitchen & Catering, Adire UK Bespoke"
                  className={inputClass}
                  defaultValue=""
                  onChange={(e) =>
                    setPreviewName(e.target.value || "Your business name")
                  }
                  aria-invalid={Boolean(state.fieldErrors?.name)}
                  aria-describedby={
                    state.fieldErrors?.name ? "listing-name-error" : undefined
                  }
                />
                <p className="mt-space-3xs font-body text-body-sm text-text-muted">
                  Use your recognized trading or community project brand name.
                </p>
                <FieldError
                  id="listing-name-error"
                  message={state.fieldErrors?.name}
                />
              </div>

              <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="listing-category">
                    Primary Category{" "}
                    <span className="text-accent-warm-ochre">*</span>
                  </label>
                  <select
                    id="listing-category"
                    name="category"
                    required
                    defaultValue="business"
                    className={`${inputClass} appearance-none pr-space-lg`}
                    onChange={(e) =>
                      setPreviewCategory(e.target.value as ListingCategory)
                    }
                    aria-invalid={Boolean(state.fieldErrors?.category)}
                    aria-describedby={
                      state.fieldErrors?.category
                        ? "listing-category-error"
                        : undefined
                    }
                  >
                    {LISTING_CATEGORIES.map((value) => (
                      <option key={value} value={value}>
                        {listingCategoryLabel(value)}
                      </option>
                    ))}
                  </select>
                  <FieldError
                    id="listing-category-error"
                    message={state.fieldErrors?.category}
                  />
                </div>
                <div>
                  <span className={labelClass}>
                    Offering Type <span className="text-accent-warm-ochre">*</span>
                  </span>
                  <div className="grid grid-cols-3 gap-space-2xs">
                    {(
                      [
                        ["Business", true],
                        ["Item / Menu", false],
                        ["Event / Promo", false],
                      ] as const
                    ).map(([label, checked]) => (
                      <label key={label} className="cursor-pointer">
                        <input
                          className="peer sr-only"
                          name="offeringType"
                          type="radio"
                          value={label}
                          defaultChecked={checked}
                        />
                        <div className="rounded-lg bg-surface-stone px-space-3xs py-space-2xs text-center font-label text-label-md text-text-secondary transition-all peer-checked:bg-primary-container peer-checked:text-on-primary">
                          {label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="listing-tagline">
                  Short Tagline / Catchphrase{" "}
                  <span className="text-accent-warm-ochre">*</span>
                </label>
                <input
                  id="listing-tagline"
                  name="tagline"
                  type="text"
                  maxLength={110}
                  required
                  placeholder="e.g. Authentic smoky firewood jollof, warm meat pies & party trays across Cambridgeshire"
                  className={inputClass}
                  onChange={(e) =>
                    setPreviewTagline(
                      e.target.value ||
                        "Your short tagline will appear on the directory card.",
                    )
                  }
                />
                <p className="mt-space-3xs font-body text-body-sm text-text-muted">
                  A punchy one-sentence summary (max 110 characters).
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            step={2}
            title="Location & Delivery Coverage"
            lead="Help residents find your stall or confirm if you deliver to their postcode."
          >
            <div className="space-y-space-md">
              <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="listing-locality">
                    Primary Peterborough Area{" "}
                    <span className="text-accent-warm-ochre">*</span>
                  </label>
                  <select
                    id="listing-locality"
                    name="locality"
                    required
                    defaultValue={LOCALITIES[0]}
                    className={`${inputClass} appearance-none`}
                    onChange={(e) => setPreviewLocality(e.target.value)}
                  >
                    {LOCALITIES.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="physical-address">
                    Physical Stall / Workshop Address (Optional)
                  </label>
                  <input
                    id="physical-address"
                    name="physicalAddress"
                    type="text"
                    placeholder="e.g. Stall #14, Peterborough City Market, PE1 1AY"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <span className={`${labelClass} mb-space-2xs`}>
                  Fulfillment &amp; Delivery Methods
                </span>
                <div className="grid grid-cols-2 gap-space-2xs sm:grid-cols-3">
                  {DELIVERY_OPTIONS.map((mode, index) => (
                    <label
                      key={mode}
                      className="flex cursor-pointer items-center gap-space-2xs rounded-lg bg-surface-stone/70 p-space-xs transition-colors hover:bg-surface-tinted"
                    >
                      <input
                        className="h-4 w-4 rounded accent-primary"
                        name="deliveryModes"
                        type="checkbox"
                        value={mode}
                        defaultChecked={index < 2}
                      />
                      <span className="font-body text-body-sm text-text-primary">
                        {mode}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            step={3}
            title="Offering Details & Indicative Pricing"
            lead="Detail your craft, specialties, or packages for potential buyers."
          >
            <div className="space-y-space-md">
              <div>
                <label className={labelClass} htmlFor="listing-description">
                  Detailed Description{" "}
                  <span className="text-accent-warm-ochre">*</span>
                </label>
                <textarea
                  id="listing-description"
                  name="description"
                  rows={4}
                  required
                  placeholder="Describe what makes your offering special…"
                  className={inputClass}
                  aria-invalid={Boolean(state.fieldErrors?.description)}
                  aria-describedby={
                    state.fieldErrors?.description
                      ? "listing-description-error"
                      : undefined
                  }
                />
                <FieldError
                  id="listing-description-error"
                  message={state.fieldErrors?.description}
                />
              </div>
              <div>
                <span className={`${labelClass} mb-space-2xs`}>
                  Popular Items &amp; Starting Rates
                </span>
                <div className="space-y-space-2xs">
                  <div className="flex flex-col gap-space-2xs sm:flex-row">
                    <input
                      name="priceItem"
                      type="text"
                      defaultValue="Party Jollof Rice (Party Foil Tray)"
                      className="flex-1 rounded-lg bg-surface-stone/70 px-space-sm py-space-2xs font-body text-body-sm text-text-primary focus:bg-surface-tinted focus:outline-none"
                    />
                    <div className="relative w-36">
                      <span className="absolute top-2 left-3 font-body text-body-sm text-text-muted">
                        £
                      </span>
                      <input
                        name="priceAmount"
                        type="text"
                        defaultValue="38.00"
                        className="w-full rounded-lg bg-surface-stone/70 py-space-2xs pr-space-2xs pl-7 font-body text-body-sm text-text-primary focus:bg-surface-tinted focus:outline-none"
                        onChange={(e) =>
                          setPreviewFrom(e.target.value || "12.50")
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-space-2xs sm:flex-row">
                    <input
                      name="priceItem"
                      type="text"
                      defaultValue="Fresh Golden Puff-Puff Box (25 pcs)"
                      className="flex-1 rounded-lg bg-surface-stone/70 px-space-sm py-space-2xs font-body text-body-sm text-text-primary focus:bg-surface-tinted focus:outline-none"
                    />
                    <div className="relative w-36">
                      <span className="absolute top-2 left-3 font-body text-body-sm text-text-muted">
                        £
                      </span>
                      <input
                        name="priceAmount"
                        type="text"
                        defaultValue="12.50"
                        className="w-full rounded-lg bg-surface-stone/70 py-space-2xs pr-space-2xs pl-7 font-body text-body-sm text-text-primary focus:bg-surface-tinted focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-surface-tinted/70 p-space-sm">
                <div className="mb-space-2xs flex items-center gap-space-2xs">
                  <MaterialIcon
                    name="stars"
                    className="text-[20px] text-accent-warm-ochre"
                  />
                  <label
                    className="font-label text-label-lg font-semibold text-primary"
                    htmlFor="promo-offer"
                  >
                    Exclusive Community Member Perk (Recommended)
                  </label>
                </div>
                <input
                  id="promo-offer"
                  name="promoOffer"
                  type="text"
                  defaultValue="10% off for verified NCP members with code NCPCOMMUNITY"
                  className="w-full rounded-lg bg-surface-card px-space-sm py-space-xs font-body text-body-sm text-text-primary shadow-sm focus:outline-none"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            step={4}
            title="Showcase Photography"
            lead="High quality visuals increase WhatsApp engagement. Photos can be shared with EXCO after approval."
          >
            <div className="rounded-xl bg-surface-stone/40 p-space-lg text-center">
              <div className="mx-auto mb-space-2xs flex h-12 w-12 items-center justify-center rounded-full bg-surface-card text-primary shadow-sm">
                <MaterialIcon name="add_photo_alternate" className="text-[28px]" />
              </div>
              <h3 className="font-headline text-headline-sm font-bold text-text-primary">
                Photos after verification
              </h3>
              <p className="mx-auto mt-space-3xs max-w-sm font-body text-body-sm text-text-muted">
                Listing images are added by NCP once your suggestion is approved.
                Email clear product or storefront photos to{" "}
                {siteContact.contactName} if you already have them.
              </p>
              <a
                href={`${siteContact.emailHref}?subject=${encodeURIComponent("Marketplace listing photos")}`}
                className="mt-space-sm inline-flex rounded-lg bg-surface-card px-space-md py-space-2xs font-label text-label-md font-semibold text-primary shadow-sm hover:bg-surface-tinted"
              >
                Email photos to EXCO
              </a>
            </div>
          </SectionCard>

          <SectionCard
            step={5}
            title="Direct Customer Contact Channels"
            lead="Community members connect with you directly through these lines."
          >
            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="listing-whatsapp">
                  WhatsApp Business Number{" "}
                  <span className="text-accent-warm-ochre">*</span>
                </label>
                <div className="relative">
                  <span className="absolute top-2.5 left-3 flex items-center gap-1 font-body text-body-md font-semibold text-brand-emerald">
                    <MaterialIcon name="chat" className="text-[18px]" />
                    +44
                  </span>
                  <input
                    id="listing-whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    placeholder="7700 900123"
                    className={`${inputClass} pr-space-sm pl-20`}
                  />
                </div>
                <p className="mt-space-3xs font-body text-body-sm text-text-muted">
                  Primary chat channel for instant quotes and customer questions.
                </p>
              </div>
              <div>
                <label className={labelClass} htmlFor="listing-phone">
                  Phone for Calls (Optional)
                </label>
                <input
                  id="listing-phone"
                  name="contactPhone"
                  type="tel"
                  placeholder="+44 7700 900000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="listing-email">
                  Public Business Email (Optional)
                </label>
                <input
                  id="listing-email"
                  name="contactEmail"
                  type="email"
                  placeholder="orders@example.co.uk"
                  className={inputClass}
                  aria-invalid={Boolean(state.fieldErrors?.contactEmail)}
                  aria-describedby={
                    state.fieldErrors?.contactEmail
                      ? "listing-email-error"
                      : undefined
                  }
                />
                <FieldError
                  id="listing-email-error"
                  message={state.fieldErrors?.contactEmail}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="listing-website">
                  Website (Optional)
                </label>
                <input
                  id="listing-website"
                  name="websiteUrl"
                  type="url"
                  placeholder="https://"
                  className={inputClass}
                  aria-invalid={Boolean(state.fieldErrors?.websiteUrl)}
                  aria-describedby={
                    state.fieldErrors?.websiteUrl
                      ? "listing-website-error"
                      : undefined
                  }
                />
                <FieldError
                  id="listing-website-error"
                  message={state.fieldErrors?.websiteUrl}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            step={6}
            title="Submitter Details & Verification Agreement"
            lead="Kept confidential with NCP EXCO for verification."
          >
            <div className="mb-space-md flex items-start gap-space-xs rounded-xl bg-surface-stone p-space-sm">
              <MaterialIcon
                name="info"
                className="mt-0.5 shrink-0 text-[24px] text-primary"
              />
              <p className="font-body text-body-sm leading-relaxed text-text-secondary">
                Suggestions stay unpublished until NCP reviews and approves them.
                We may contact you to confirm local Peterborough activity prior to
                public display.
              </p>
            </div>
            <div className="mb-space-md grid grid-cols-1 gap-space-md sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="submitter-name">
                  Your Full Name <span className="text-accent-warm-ochre">*</span>
                </label>
                <input
                  id="submitter-name"
                  name="submitterName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Theresa Okogwa"
                  className={inputClass}
                />
                <p className="mt-space-3xs font-body text-body-sm text-text-muted">
                  Not published publicly on the listing page.
                </p>
              </div>
              <div>
                <label className={labelClass} htmlFor="listing-submitter">
                  Your Contact Email{" "}
                  <span className="text-accent-warm-ochre">*</span>
                </label>
                <input
                  id="listing-submitter"
                  name="submittedByEmail"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="yourname@gmail.com"
                  className={inputClass}
                  aria-invalid={Boolean(state.fieldErrors?.submittedByEmail)}
                  aria-describedby={
                    state.fieldErrors?.submittedByEmail
                      ? "listing-submitter-error"
                      : undefined
                  }
                />
                <FieldError
                  id="listing-submitter-error"
                  message={state.fieldErrors?.submittedByEmail}
                />
              </div>
            </div>
            <div className="space-y-space-xs pt-space-xs">
              <label className="flex cursor-pointer items-start gap-space-2xs">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  value="on"
                  className="mt-1 h-4 w-4 shrink-0 rounded accent-primary"
                  aria-invalid={Boolean(state.fieldErrors?.consent)}
                  aria-describedby={
                    state.fieldErrors?.consent
                      ? "listing-consent-error"
                      : undefined
                  }
                />
                <span className="font-body text-body-sm text-text-secondary">
                  I confirm this business or offering is active in Peterborough /
                  Cambridgeshire and agree that Nigerian Community Peterborough
                  (NCP) may store this submission to review and publish. Nothing
                  goes live without admin approval.{" "}
                  <span className="text-accent-warm-ochre">*</span>
                </span>
              </label>
              <FieldError
                id="listing-consent-error"
                message={state.fieldErrors?.consent}
              />
              <label className="flex cursor-pointer items-start gap-space-2xs">
                <input
                  name="adviceOptIn"
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 rounded accent-primary"
                />
                <span className="font-body text-body-sm text-text-secondary">
                  I would like to receive free advice on food hygiene
                  registration, council market stall opportunities, or local
                  business compliance from the NCP Trade &amp; Welfare Committee.
                </span>
              </label>
            </div>
          </SectionCard>

          <div className="flex flex-col items-center justify-between gap-space-md pt-space-2xs sm:flex-row">
            <div className="flex items-center gap-space-2xs font-body text-body-sm text-text-muted">
              <MaterialIcon
                name="verified_user"
                className="text-[18px] text-brand-emerald"
              />
              Encrypted &amp; confidential submission
            </div>
            <div className="flex w-full items-center gap-space-sm sm:w-auto">
              <Link
                href="/market"
                className="w-1/2 rounded-lg bg-surface-stone px-space-md py-space-xs text-center font-label text-label-lg text-text-secondary transition-colors hover:bg-surface-variant sm:w-auto"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-1/2 items-center justify-center gap-space-2xs rounded-lg bg-primary-container px-space-lg py-space-xs font-label text-label-lg font-semibold text-on-primary shadow-md transition-all hover:bg-primary hover:shadow-lg disabled:opacity-60 sm:w-auto"
              >
                <MaterialIcon name="send" className="text-[20px]" />
                {pending ? "Sending…" : "Submit for Verification"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <aside className="sticky top-24 flex flex-col gap-space-lg lg:col-span-4">
        <div className="rounded-2xl bg-surface-card p-space-md shadow-sm">
          <div className="mb-space-sm flex items-center justify-between">
            <span className="font-label text-label-eyebrow tracking-wider text-text-muted uppercase">
              Interactive Live Preview
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-stone px-2 py-0.5 font-label text-[11px] text-text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-mint" />{" "}
              Dynamic
            </span>
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-canvas shadow-sm">
            <div className="relative h-44 w-full">
              <CommunityPhoto
                credit={communityPhotos.ukStreetMarket}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="rounded-md bg-surface-card/95 px-space-2xs py-0.5 font-label text-[11px] text-primary shadow-sm">
                  {categoryLabel}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 font-label text-[11px] text-on-primary shadow-sm">
                  <MaterialIcon name="verified" className="text-[13px]" /> NCP
                  Verified
                </span>
              </div>
            </div>
            <div className="space-y-space-2xs p-space-sm">
              <h3 className="truncate font-headline text-headline-sm font-bold text-text-primary">
                {previewName}
              </h3>
              <p className="line-clamp-2 font-body text-body-sm text-text-secondary">
                {previewTagline}
              </p>
              <div className="flex items-center gap-space-2xs pt-space-3xs font-body text-body-sm text-text-muted">
                <MaterialIcon
                  name="location_on"
                  className="shrink-0 text-[16px] text-brand-emerald"
                />
                <span className="truncate">{previewLocality}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface-stone/80 p-space-2xs text-[12px] text-text-secondary">
                <span>Starting rates:</span>
                <span className="font-semibold text-text-primary">
                  From £{previewFrom}
                </span>
              </div>
              <div className="pt-space-2xs">
                <div className="flex w-full items-center justify-center gap-space-2xs rounded-lg bg-brand-emerald py-space-2xs font-label text-label-md text-on-primary">
                  <MaterialIcon name="chat" className="text-[18px]" />
                  WhatsApp Vendor
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-card p-space-md shadow-sm">
          <h3 className="mb-space-sm flex items-center gap-space-2xs font-headline text-headline-sm font-bold text-text-primary">
            <MaterialIcon
              name="workspace_premium"
              className="text-brand-emerald"
            />
            Why list on NCP Market?
          </h3>
          <ul className="space-y-space-sm font-body text-body-sm text-text-secondary">
            <li className="flex items-start gap-space-2xs">
              <MaterialIcon
                name="groups"
                className="mt-0.5 shrink-0 text-[18px] text-brand-emerald"
              />
              <span>
                <strong>1,400+ Diaspora Households:</strong> Reach Nigerian
                families throughout Peterborough and Cambridgeshire.
              </span>
            </li>
            <li className="flex items-start gap-space-2xs">
              <MaterialIcon
                name="campaign"
                className="mt-0.5 shrink-0 text-[18px] text-brand-emerald"
              />
              <span>
                <strong>Monthly Newsletter Spotlight:</strong> New listings are
                featured in NCP community updates.
              </span>
            </li>
            <li className="flex items-start gap-space-2xs">
              <MaterialIcon
                name="sentiment_very_satisfied"
                className="mt-0.5 shrink-0 text-[18px] text-brand-emerald"
              />
              <span>
                <strong>Zero Middleman Margins:</strong> Customers contact you
                directly — no platform commission.
              </span>
            </li>
            <li className="flex items-start gap-space-2xs">
              <MaterialIcon
                name="handshake"
                className="mt-0.5 shrink-0 text-[18px] text-brand-emerald"
              />
              <span>
                <strong>NCP Trust Endorsement:</strong> The verified badge builds
                confidence with newcomers and residents.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-surface-tinted p-space-md shadow-sm">
          <div className="mb-space-2xs flex items-center gap-space-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
              TO
            </div>
            <div>
              <h4 className="font-headline text-headline-sm font-bold text-primary">
                {siteContact.contactName}
              </h4>
              <p className="font-body text-body-sm text-text-secondary">
                Community Trade &amp; Welfare Lead
              </p>
            </div>
          </div>
          <p className="mb-space-sm font-body text-body-sm text-text-secondary">
            Questions about hygiene certificates, stall licensing, or drafting
            your listing? Reach out before you submit.
          </p>
          <div className="flex flex-col gap-space-2xs">
            <a
              href={siteContact.phoneHref}
              className="flex items-center gap-space-2xs font-label text-label-md text-text-primary transition-colors hover:text-primary"
            >
              <MaterialIcon
                name="call"
                className="text-[18px] text-brand-emerald"
              />
              {siteContact.phoneDisplay}
            </a>
            <a
              href={siteContact.emailHref}
              className="inline-flex items-center justify-center gap-space-2xs rounded-lg bg-surface-card py-space-2xs font-label text-label-md font-semibold text-primary shadow-sm transition-all hover:bg-surface-card/80"
            >
              <MaterialIcon
                name="mail"
                className="text-[18px] text-brand-emerald"
              />
              Message Trade Team
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-card p-space-md shadow-sm">
          <h4 className="mb-space-2xs font-label text-label-lg font-bold text-text-primary">
            Listing Guidelines
          </h4>
          <div className="space-y-space-2xs font-body text-body-sm text-text-secondary">
            <p>
              • <strong>Turnaround:</strong> NCP volunteers review listings every
              Tuesday and Friday.
            </p>
            <p>
              • <strong>Authenticity:</strong> Businesses must be active locally
              within PE1–PE8 or offer proven delivery to Peterborough.
            </p>
            <p>
              • <strong>Food Standards:</strong> Catering listings should confirm
              UK Food Standards Agency basic hygiene adherence.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export type { SuggestListingState };
