"use client";

import { contactPage, partners, site } from "@/content/site-data";
import type { FormEvent } from "react";
import { useState } from "react";

export function AppointmentForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const partner = partners.find(
      (person) => person.slug === formData.get("partner"),
    );
    const subject = `Appointment request — ${partner?.name ?? "Asentya"}`;
    const lines = [
      `Name: ${formData.get("firstName") ?? ""} ${formData.get("lastName") ?? ""}`.trim(),
      `Email: ${formData.get("email") ?? ""}`,
      `Phone: ${formData.get("phone") ?? ""}`,
      `Partner: ${partner?.name ?? ""}`,
      `Date: ${formData.get("date") ?? ""}`,
      `Method: ${formData.get("method") ?? ""}`,
      "",
      "Message:",
      String(formData.get("message") ?? ""),
    ];
    const payload = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      partner: partner?.name ?? "",
      date: String(formData.get("date") ?? ""),
      method: String(formData.get("method") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    setIsSubmitting(true);
    setStatus("Sending your appointment request…");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        form.reset();
        setStatus("Thank you. Your appointment request has been sent.");
        return;
      }
    } catch {
      // The email link below remains available when server delivery is offline.
    } finally {
      setIsSubmitting(false);
    }

    setStatus("Opening your email app to complete the appointment request.");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <form
      className="appointment-form"
      aria-describedby="appointment-consent appointment-status"
      onSubmit={handleSubmit}
    >
      <div className="appointment-form__fields">
        <div className="appointment-form__honeypot" aria-hidden="true">
          <label htmlFor="appointment-website">Website</label>
          <input
            id="appointment-website"
            name="website"
            type="text"
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
        <div className="appointment-form__row appointment-form__row--names">
          <div className="appointment-form__field">
            <label htmlFor="appointment-first-name">First Name</label>
            <input
              id="appointment-first-name"
              name="firstName"
              type="text"
              placeholder="Jane"
              autoComplete="given-name"
            />
          </div>
          <div className="appointment-form__field">
            <label htmlFor="appointment-last-name">Last Name</label>
            <input
              id="appointment-last-name"
              name="lastName"
              type="text"
              placeholder="Smith"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="appointment-form__field">
          <label htmlFor="appointment-email">Email</label>
          <input
            id="appointment-email"
            name="email"
            type="email"
            placeholder="name@mail.com"
            autoComplete="email"
          />
        </div>

        <div className="appointment-form__field">
          <label htmlFor="appointment-phone">Phone Number</label>
          <input
            id="appointment-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="+62812345678"
            autoComplete="tel"
          />
        </div>

        <div className="appointment-form__field">
          <label htmlFor="appointment-partner">Choose Partner</label>
          <select id="appointment-partner" name="partner" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {partners.map((partner) => (
              <option value={partner.slug} key={partner.slug}>
                {partner.name}
              </option>
            ))}
          </select>
        </div>

        <div className="appointment-form__field">
          <label htmlFor="appointment-date">Date</label>
          <input id="appointment-date" name="date" type="date" />
        </div>

        <div className="appointment-form__field">
          <label htmlFor="appointment-method">Method</label>
          <select id="appointment-method" name="method" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        <div className="appointment-form__field appointment-form__field--message">
          <label htmlFor="appointment-message">Message*</label>
          <textarea
            id="appointment-message"
            name="message"
            placeholder="What do you need help with?"
            rows={6}
            required
          />
        </div>
      </div>

      <div className="appointment-form__footer">
        <button
          className="appointment-form__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : contactPage.submitLabel}
        </button>
        <p id="appointment-consent" className="appointment-form__consent">
          {contactPage.consent}
        </p>
      </div>

      <p
        id="appointment-status"
        className="appointment-form__status"
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}
