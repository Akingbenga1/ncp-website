"use client";

import { useState, type FormEvent } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";
import { siteContact } from "@/data/site-contact";

const INTERESTS = [
  "Event Setup & Logistics",
  "Welcome & Hospitality",
  "Youth & Student Mentoring",
  "Media, Photos & Socials",
  "Elder Welfare & Visits",
  "Catering & Cultural Food",
] as const;

export function VolunteerInterestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleInterest = (label: string) => {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label],
    );
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const body = [
      `Name: ${name}`,
      `Phone / WhatsApp: ${phone}`,
      `Interests: ${interests.length ? interests.join(", ") : "(none selected)"}`,
      "",
      notes || "(no additional notes)",
    ].join("\n");
    const href = `mailto:${siteContact.email}?subject=${encodeURIComponent("NCP volunteer interest")}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  return (
    <form className="space-y-space-md" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-label text-label-md font-semibold text-text-primary">
            Your Name
          </label>
          <input
            className="w-full rounded-lg bg-surface-stone px-space-sm py-2.5 font-body text-body-sm text-text-primary placeholder:text-text-muted focus:bg-surface-card focus:ring-2 focus:ring-primary-container focus:outline-none"
            placeholder="e.g. Amaka Nwosu"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block font-label text-label-md font-semibold text-text-primary">
            Phone Number / WhatsApp
          </label>
          <input
            className="w-full rounded-lg bg-surface-stone px-space-sm py-2.5 font-body text-body-sm text-text-primary placeholder:text-text-muted focus:bg-surface-card focus:ring-2 focus:ring-primary-container focus:outline-none"
            placeholder="+44 7..."
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="mb-space-2xs block font-label text-label-md font-semibold text-text-primary">
          Areas of interest (Select all that apply)
        </label>
        <div className="grid grid-cols-1 gap-space-2xs sm:grid-cols-2 md:grid-cols-3">
          {INTERESTS.map((label) => (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-space-2xs rounded-lg bg-surface-stone p-space-xs transition-colors hover:bg-surface-tinted"
            >
              <input
                className="h-4 w-4 rounded accent-primary focus:ring-primary"
                type="checkbox"
                checked={interests.includes(label)}
                onChange={() => toggleInterest(label)}
              />
              <span className="font-body text-body-sm text-text-primary">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1 block font-label text-label-md font-semibold text-text-primary">
          A few words on what you&apos;d like to bring (optional)
        </label>
        <textarea
          className="w-full rounded-lg bg-surface-stone px-space-sm py-2.5 font-body text-body-sm text-text-primary placeholder:text-text-muted focus:bg-surface-card focus:ring-2 focus:ring-primary-container focus:outline-none"
          placeholder="Tell us a little bit about yourself, your background, or any ideas you have for Peterborough..."
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="pt-space-xs text-center">
        <button
          className="inline-flex items-center justify-center gap-space-3xs rounded-lg bg-primary px-space-xl py-space-xs font-label text-label-lg text-on-primary shadow-sm transition-all hover:bg-primary-container"
          type="submit"
        >
          <span>Submit Volunteer Interest</span>
          <MaterialIcon name="send" className="text-[18px]" />
        </button>
      </div>
    </form>
  );
}
