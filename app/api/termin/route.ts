import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, telefon, email, objekt, termin } = await req.json();

    await resend.emails.send({
      from: "Lara Lumbe Realitäten <onboarding@resend.dev>",
      to: "lara@lumbe.at",
      replyTo: email,
      subject: `Terminbuchung: ${name} – ${termin}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; color: #3E3028;">
          <h2 style="font-size: 20px; border-bottom: 1px solid #D4C5B0; padding-bottom: 10px;">
            Neue Terminbuchung eingegangen
          </h2>
          <table style="width:100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #7D6654; width: 140px;"><strong>Termin</strong></td><td>${termin}</td></tr>
            <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Objekt</strong></td><td>${objekt}</td></tr>
            <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Telefon</strong></td><td>${telefon}</td></tr>
            <tr><td style="padding: 8px 0; color: #7D6654;"><strong>E-Mail</strong></td><td>${email}</td></tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #B8A48A; border-top: 1px solid #EAE0D0; padding-top: 10px;">
            Lara Lumbe Realitäten · lara@lumbe.at · 01 503 179 750
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Termin email error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
