"use client";

import type { FormEvent } from "react";
import { siteContact } from "@/data/site-contact";

/**
 * Labelled enquiry UI only. Does not call MailPort / AuthPort yet and never
 * shows a fake “sent” state — submit is intercepted until those ports wire up.
 */
export function MembershipEnquiryForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="interest">
        I want to
        <select id="interest" name="interest" defaultValue="member">
          <option value="member">Become a member</option>
          <option value="volunteer">Volunteer</option>
          <option value="support">Ask about supporting / donating</option>
        </select>
      </label>
      <label htmlFor="full-name">
        Full name
        <input
          id="full-name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
        />
      </label>
      <label htmlFor="phone">
        Phone
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea id="message" name="message" rows={5} />
      </label>
      <div className="form-actions">
        <a className="btn btn-solid" href={siteContact.emailHref}>
          Email Theresa
        </a>
        <a className="btn btn-primary" href={siteContact.phoneHref}>
          Call EXCO line
        </a>
      </div>
      <p className="form-note" role="status">
        Submit-to-server will arrive with Auth/Mail ports. Use email or phone
        above for now.
      </p>
    </form>
  );
}
