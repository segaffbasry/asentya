import { site } from "@/content/site-data";
import { NextResponse } from "next/server";

type AppointmentPayload = Readonly<{
  date?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  message?: string;
  method?: string;
  partner?: string;
  phone?: string;
  website?: string;
}>;

function clean(value: unknown, maximumLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

export async function POST(request: Request) {
  let input: AppointmentPayload;

  try {
    input = (await request.json()) as AppointmentPayload;
  } catch {
    return NextResponse.json({ error: "Invalid appointment request." }, { status: 400 });
  }

  if (clean(input.website)) {
    return NextResponse.json({ ok: true });
  }

  const appointment = {
    firstName: clean(input.firstName, 100),
    lastName: clean(input.lastName, 100),
    email: clean(input.email, 254),
    phone: clean(input.phone, 50),
    partner: clean(input.partner, 100),
    date: clean(input.date, 30),
    method: clean(input.method, 30),
    message: clean(input.message, 5_000),
  };

  if (!appointment.partner || !appointment.method || !appointment.message) {
    return NextResponse.json(
      { error: "Please choose a partner and method, then add a message." },
      { status: 400 },
    );
  }

  if (appointment.email && !/^\S+@\S+\.\S+$/.test(appointment.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.APPOINTMENTS_FROM_EMAIL;
  const to = process.env.APPOINTMENTS_TO_EMAIL ?? site.contact.email;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured.", fallback: "mailto" },
      { status: 503 },
    );
  }

  const subject = `Appointment request — ${appointment.partner}`;
  const text = [
    `Name: ${appointment.firstName} ${appointment.lastName}`.trim(),
    `Email: ${appointment.email}`,
    `Phone: ${appointment.phone}`,
    `Partner: ${appointment.partner}`,
    `Date: ${appointment.date}`,
    `Method: ${appointment.method}`,
    "",
    "Message:",
    appointment.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: appointment.email || undefined,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "The appointment could not be delivered.", fallback: "mailto" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
