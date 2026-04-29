import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { objekt, name, anschrift, email, signature } = await req.json();

    const datum = new Date().toLocaleDateString("de-AT", { dateStyle: "full" });
    const uhrzeit = new Date().toLocaleTimeString("de-AT", { timeStyle: "short" });

    const signatureImg = signature
      ? `<img src="${signature}" alt="Unterschrift" style="max-width:300px; border:1px solid #D4C5B0; border-radius:2px;" />`
      : "<em>keine Unterschrift übermittelt</em>";

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #3E3028;">
        <h2 style="font-size: 22px; border-bottom: 1px solid #D4C5B0; padding-bottom: 10px;">
          Erklärung zum vorzeitigen Tätigwerden
        </h2>

        <table style="width:100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #7D6654; width: 160px;"><strong>Objekt</strong></td><td>${objekt}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Anschrift</strong></td><td>${anschrift}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>E-Mail</strong></td><td>${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Datum</strong></td><td>${datum}, ${uhrzeit} Uhr</td></tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #F5F0E8; border: 1px solid #D4C5B0; font-size: 13px; line-height: 1.7;">
          <p style="margin: 0 0 8px; font-weight: bold;">Bestätigte Erklärungen:</p>
          <p style="margin: 4px 0;">✓ Ich bestätige, dass ich über mein 14-tägiges Widerrufsrecht informiert wurde.</p>
          <p style="margin: 4px 0;">✓ Ich verlange ausdrücklich, dass Lara Lumbe Realitäten bereits vor Ablauf der 14-tägigen Widerrufsfrist mit der Tätigkeit beginnt.</p>
          <p style="margin: 4px 0;">✓ Ich nehme zur Kenntnis, dass ich bei vollständiger Vertragserfüllung mein Widerrufsrecht verliere.</p>
        </div>

        <div style="margin-top: 24px;">
          <p style="font-size: 13px; color: #7D6654; margin-bottom: 8px;"><strong>Unterschrift:</strong></p>
          ${signatureImg}
        </div>

        <p style="margin-top: 24px; font-size: 13px; color: #9B8470;">
          Eingegangen am ${datum} um ${uhrzeit} Uhr
        </p>
        <p style="font-size: 12px; color: #B8A48A; border-top: 1px solid #EAE0D0; padding-top: 10px; margin-top: 16px;">
          Lara Lumbe Realitäten · lara@lumbe.at · 01 503 179 750
        </p>
      </div>
    `;

    await resend.emails.send({
      from: "Lara Lumbe Realitäten <onboarding@resend.dev>",
      to: "lara@lumbe.at",
      replyTo: email,
      subject: `Vorzeitiges Tätigwerden: ${name} – ${objekt}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Vorzeitiges Tätigwerden email error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
