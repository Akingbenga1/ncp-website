"use client";

import { useState, type FormEvent } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";

type EventRsvpFormProps = {
  eventTitle: string;
};

export function EventRsvpForm({ eventTitle }: EventRsvpFormProps) {
  const [confirmed, setConfirmed] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div
        className="flex flex-col items-center gap-space-xs py-space-md text-center"
        role="status"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-tinted text-primary">
          <MaterialIcon name="check_circle" className="text-[32px]" />
        </div>
        <h4 className="font-headline text-headline-sm font-bold text-text-primary">
          You&apos;re Registered!
        </h4>
        <p className="font-body text-body-sm text-text-secondary">
          A confirmation for <strong>{eventTitle}</strong> has been reserved. We
          look forward to meeting you!
        </p>
        <button
          type="button"
          className="mt-space-2xs font-label text-label-md text-primary underline"
          onClick={() => setConfirmed(false)}
        >
          Register another guest
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-space-xs" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <label className="font-label text-label-md text-text-primary" htmlFor="rsvp-name">
          Full Name *
        </label>
        <input
          id="rsvp-name"
          name="name"
          required
          type="text"
          placeholder="e.g. Adebayo Ogunlesi"
          className="w-full rounded-lg bg-surface-canvas px-space-xs py-space-2xs font-body text-body-sm text-text-primary shadow-inner placeholder:text-text-muted focus:ring-2 focus:ring-primary/40 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-label text-label-md text-text-primary" htmlFor="rsvp-email">
          Email Address *
        </label>
        <input
          id="rsvp-email"
          name="email"
          required
          type="email"
          placeholder="adebayo@example.com"
          className="w-full rounded-lg bg-surface-canvas px-space-xs py-space-2xs font-body text-body-sm text-text-primary shadow-inner placeholder:text-text-muted focus:ring-2 focus:ring-primary/40 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-label text-label-md text-text-primary" htmlFor="rsvp-phone">
          WhatsApp / Mobile *
        </label>
        <input
          id="rsvp-phone"
          name="phone"
          required
          type="tel"
          placeholder="+44 7123 456789"
          className="w-full rounded-lg bg-surface-canvas px-space-xs py-space-2xs font-body text-body-sm text-text-primary shadow-inner placeholder:text-text-muted focus:ring-2 focus:ring-primary/40 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-label text-label-md text-text-primary" htmlFor="rsvp-guests">
          Number of Attendees
        </label>
        <select
          id="rsvp-guests"
          name="guests"
          defaultValue="1"
          className="w-full rounded-lg bg-surface-canvas px-space-xs py-space-2xs font-body text-body-sm text-text-primary shadow-inner focus:ring-2 focus:ring-primary/40 focus:outline-none"
        >
          <option value="1">1 Person (Just Me)</option>
          <option value="2">2 Persons</option>
          <option value="3">3 Persons (Family)</option>
          <option value="4">4 Persons (Family)</option>
          <option value="5">5+ Persons</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label
          className="font-label text-label-md text-text-primary"
          htmlFor="rsvp-affiliation"
        >
          Category / Affiliation
        </label>
        <select
          id="rsvp-affiliation"
          name="affiliation"
          defaultValue="newcomer"
          className="w-full rounded-lg bg-surface-canvas px-space-xs py-space-2xs font-body text-body-sm text-text-primary shadow-inner focus:ring-2 focus:ring-primary/40 focus:outline-none"
        >
          <option value="newcomer">New Relocator in Peterborough (&lt; 1 yr)</option>
          <option value="nhs">NHS / Healthcare Worker</option>
          <option value="student">ARU Peterborough Student</option>
          <option value="resident">Long-term Peterborough Resident</option>
          <option value="friend">Community Ally / Partner</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-space-2xs flex w-full items-center justify-center gap-space-2xs rounded-lg bg-primary py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container hover:shadow-md"
      >
        <MaterialIcon name="how_to_reg" className="text-[20px]" />
        <span>Reserve My Free Spot</span>
      </button>
      <p className="text-center font-body text-body-sm text-xs text-text-muted">
        Instant confirmation sent to your email &amp; WhatsApp.
      </p>
    </form>
  );
}
