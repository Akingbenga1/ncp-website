"use client";

import { useState, type FormEvent } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";

export function NewsBulletinForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    if (typeof email !== "string" || !email.trim()) return;
    const href = `${siteContact.emailHref}?subject=${encodeURIComponent("NCP civic bulletin subscription")}&body=${encodeURIComponent(`Please add ${email.trim()} to NCP civic bulletins.\n`)}`;
    window.location.href = href;
    setDone(true);
  };

  if (done) {
    return (
      <p className="font-body text-body-sm text-brand-emerald" role="status">
        Opening your mail app to confirm the subscription request…
      </p>
    );
  }

  return (
    <form className="mt-space-2xs flex flex-col gap-2" onSubmit={onSubmit}>
      <label htmlFor="news-bulletin-email" className="sr-only">
        Email address
      </label>
      <input
        id="news-bulletin-email"
        name="email"
        required
        type="email"
        placeholder="Enter your email address..."
        className="w-full rounded-lg bg-surface-card px-space-xs py-2 font-body text-body-sm text-on-surface shadow-sm placeholder:text-text-muted focus:ring-2 focus:ring-primary focus:outline-none"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-1 rounded-lg bg-primary-container px-space-xs py-2 font-label text-label-md font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary"
      >
        <MaterialIcon name="mail" className="text-[16px]" />
        Subscribe to Bulletins
      </button>
    </form>
  );
}
