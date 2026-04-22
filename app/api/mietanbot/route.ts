import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const name             = data.get("name") as string;
    const beruf            = data.get("beruf") as string;
    const adresse          = data.get("adresse") as string;
    const telefon          = data.get("telefon") as string;
    const email            = data.get("email") as string;
    const geburtsdatum     = data.get("geburtsdatum") as string;
    const staatsbuerger    = data.get("staatsbuergerschaft") as string;
    const objekt           = data.get("objekt") as string;
    const anmerkungen      = data.get("anmerkungen") as string;

    const fileFields = ["lebenslauf", "gehalt1", "gehalt2", "gehalt3", "ausweis"];
    const fileLabels: Record<string, string> = {
      lebenslauf: "Lebenslauf",
      gehalt1: "Gehaltsnachweis (letzter Monat)",
      gehalt2: "Gehaltsnachweis (vorletzter Monat)",
      gehalt3: "Gehaltsnachweis (drittletzter Monat)",
      ausweis: "Reisepass / Ausweis",
    };

    const attachments: { filename: string; content: Buffer }[] = [];
    for (const field of fileFields) {
      const file = data.get(field) as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: `${fileLabels[field]} – ${name} – ${file.name}`,
          content: buffer,
        });
      }
    }

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #3E3028;">
        <h2 style="font-size: 22px; border-bottom: 1px solid #D4C5B0; padding-bottom: 10px;">
          Neues Mietanbot eingegangen
        </h2>

        <table style="width:100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #7D6654; width: 160px;"><strong>Objekt</strong></td><td>${objekt}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Beruf</strong></td><td>${beruf}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Adresse</strong></td><td>${adresse}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Telefon</strong></td><td>${telefon}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>E-Mail</strong></td><td>${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Geburtsdatum</strong></td><td>${geburtsdatum}</td></tr>
          <tr><td style="padding: 8px 0; color: #7D6654;"><strong>Staatsbürgerschaft</strong></td><td>${staatsbuerger}</td></tr>
          ${anmerkungen ? `<tr><td style="padding: 8px 0; color: #7D6654; vertical-align: top;"><strong>Anmerkungen</strong></td><td>${anmerkungen}</td></tr>` : ""}
        </table>

        <p style="margin-top: 24px; font-size: 13px; color: #9B8470;">
          Eingegangen am ${new Date().toLocaleDateString("de-AT", { dateStyle: "full" })} um ${new Date().toLocaleTimeString("de-AT", { timeStyle: "short" })} Uhr
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
      subject: `Mietanbot: ${name} – ${objekt}`,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mietanbot email error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
