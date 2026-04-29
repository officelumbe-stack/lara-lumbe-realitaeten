"use client";

import { useState, useRef } from "react";
import { Upload, CheckCircle, AlertCircle, Loader2, Download } from "lucide-react";
import { properties } from "@/data/properties";

type Status = "idle" | "loading" | "success" | "error";

function FileField({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  const [filename, setFilename] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-warm-500">*</span>}
      </label>
      <div
        onClick={() => ref.current?.click()}
        className="flex items-center gap-3 bg-warm-100 border border-dashed border-warm-300 rounded px-4 py-3 cursor-pointer hover:bg-warm-200/50 transition-colors"
      >
        <Upload size={15} className="text-warm-500 shrink-0" />
        <span className="font-sans text-sm text-warm-600 truncate">
          {filename ?? "Datei auswählen …"}
        </span>
      </div>
      <input
        ref={ref}
        type="file"
        name={name}
        required={required}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        className="hidden"
        onChange={(e) => setFilename(e.target.files?.[0]?.name ?? null)}
      />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-warm-500">*</span>}
      </label>
      <input type={type} name={name} required={required} placeholder={placeholder} />
    </div>
  );
}

function CheckField({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="flex gap-3 cursor-pointer group">
      <input
        type="checkbox"
        name={name}
        required
        className="shrink-0 mt-0.5 w-4 h-4 accent-warm-700 cursor-pointer"
      />
      <span className="font-sans text-sm text-warm-700 leading-relaxed group-hover:text-warm-900">
        {children}
      </span>
    </label>
  );
}

export default function MietanbotForm() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch("/api/mietanbot", { method: "POST", body: data });
      if (!res.ok) throw new Error();
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="mietanbot" className="py-24 px-6 bg-warm-100/60">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs text-warm-500 tracking-[0.2em] uppercase mb-3">
            Nach der Besichtigung
          </p>
          <h2 className="font-serif text-4xl text-warm-800">
            Verbindliches Mietanbot
          </h2>
          <div className="w-12 h-px bg-warm-300 mx-auto mt-4 mb-6" />
          <p className="font-sans text-warm-600 text-sm leading-relaxed max-w-xl mx-auto">
            Füllen Sie das Formular vollständig aus, bestätigen Sie die rechtlichen
            Bedingungen und laden Sie die erforderlichen Unterlagen hoch.
          </p>

          {/* PDF Download */}
          <a
            href="/downloads/mietanbot-vorlage.pdf"
            download
            className="inline-flex items-center gap-2 mt-5 font-sans text-xs text-warm-600 border border-warm-300 px-4 py-2 hover:bg-warm-200 transition-colors"
          >
            <Download size={13} />
            Mietanbot als PDF herunterladen (zum Ausdrucken &amp; Unterschreiben)
          </a>
        </div>

        {status === "success" ? (
          <div className="bg-warm-50 border border-warm-300 p-10 text-center">
            <CheckCircle size={36} className="text-warm-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-warm-800 mb-2">
              Vielen Dank!
            </h3>
            <p className="font-sans text-warm-600 text-sm">
              Ihr Mietanbot wurde erfolgreich übermittelt.
              <br />
              Wir melden uns so bald wie möglich bei Ihnen.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="bg-warm-50 border border-warm-200 p-8 sm:p-10 space-y-8">

            {/* Objekt */}
            {properties.length > 0 ? (
              <div>
                <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
                  Gewünschtes Objekt <span className="text-warm-500">*</span>
                </label>
                <select name="objekt" required>
                  <option value="">Bitte wählen …</option>
                  {properties.filter((p) => p.type === "Miete").map((p) => (
                    <option key={p.id} value={p.address}>
                      {p.address} – € {p.rentTotal?.toFixed(2)}/Monat
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <Field
                label="Gewünschtes Objekt / Adresse"
                name="objekt"
                required
                placeholder="z.B. Musterstraße 1/5, 1010 Wien"
              />
            )}

            {/* Persönliche Daten */}
            <div className="border-t border-warm-200 pt-6">
              <p className="font-serif text-lg text-warm-700 mb-5">Persönliche Daten</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Vorname & Nachname" name="name" required placeholder="Maria Muster" />
                <Field label="Beruf / Tätigkeitsbereich" name="beruf" required placeholder="Angestellte" />
                <Field label="Adresse (aktuell)" name="adresse" required placeholder="Musterstraße 1/2, 1010 Wien" />
                <Field label="Telefon" name="telefon" type="tel" required placeholder="+43 660 …" />
                <Field label="E-Mail" name="email" type="email" required placeholder="maria@beispiel.at" />
                <Field label="Geburtsdatum" name="geburtsdatum" type="date" required />
                <Field label="Staatsbürgerschaft" name="staatsbuergerschaft" required placeholder="Österreich" />
              </div>
            </div>

            {/* Rechtliche Bestätigungen */}
            <div className="border-t border-warm-200 pt-6">
              <p className="font-serif text-lg text-warm-700 mb-2">
                Rechtliche Bestätigungen
              </p>
              <p className="font-sans text-xs text-warm-500 mb-5">
                Alle Punkte müssen bestätigt werden, bevor das Mietanbot eingereicht werden kann.
              </p>

              {/* Rechtsbelehrung Box */}
              <div className="bg-warm-100 border border-warm-300 p-5 mb-6 text-xs font-sans text-warm-700 leading-relaxed space-y-3">
                <p className="font-semibold text-warm-800 text-sm">Inhalt des verbindlichen Mietanbots</p>
                <p>
                  Durch die Vermittlungstätigkeit der Firma <strong>Lara Lumbe Realitäten</strong> stellt
                  der Anbotsteller dem Anbotnehmer als Eigentümer oder dessen Bevollmächtigter des unten
                  beschriebenen Mietobjektes das folgende rechtverbindliche Angebot, mit welchem der
                  Anbotsteller <strong>unwiderruflich bis zum vereinbarten Datum gebunden</strong> ist.
                </p>
                <p className="font-semibold">I. Vertragsabschluss</p>
                <p>
                  Der Anbotsteller verpflichtet sich, nach Annahme des Anbotes durch den Anbotnehmer oder
                  dessen Bevollmächtigten, unwiderruflich und rechtsverbindlich, den Mietvertrag bis zum
                  vereinbarten Datum abzuschließen und sämtliche Kosten, Steuern und Abgaben des damit
                  verbundenen Mietvertrages zu bezahlen. Der Anbotsteller bestätigt, dass in Ergänzung oder
                  Abänderung dieses Mietanbots keine mündlichen Nebenabreden getroffen oder Erklärungen
                  abgegeben wurden.
                </p>
                <p className="font-semibold">II. Pönale bei Rücktritt</p>
                <p>
                  Tritt der Anbotsteller ohne triftigen Grund vom Mietanbot zurück und kommt das
                  Mietverhältnis somit nicht zustande, ist der Anbotsteller verpflichtet, eine{" "}
                  <strong>Pönale in der Höhe von 2 Bruttomonatsmieten</strong> an die Lara Lumbe
                  Realitäten zu entrichten.
                </p>
                <p className="font-semibold">III. Rechtsbelehrung</p>
                <p>
                  Der Anbotsteller nimmt zur Kenntnis, dass die Firma Lara Lumbe Realitäten kraft
                  bestehenden Geschäftsgebrauchs mit dem Abgeber in einem wirtschaftlichen Naheverhältnis
                  steht. Irrtum vorbehalten.
                </p>
              </div>

              <div className="space-y-4">
                <CheckField name="bestaetigung_besichtigt">
                  Ich bestätige, das Objekt persönlich eingehend besichtigt und alle für mich wesentlichen
                  Umstände zur Kenntnis genommen zu haben. Diese Geschäftsgelegenheit war mir zuvor nicht
                  bekannt und wurde mir durch die Firma Lara Lumbe Realitäten vermittelt.
                </CheckField>

                <CheckField name="bestaetigung_bindung">
                  Ich nehme zur Kenntnis, dass dieses Mietanbot <strong>rechtsverbindlich und unwiderruflich</strong> ist
                  und ich bis zum vereinbarten Datum an mein Anbot gebunden bin.
                </CheckField>

                <CheckField name="bestaetigung_vertragsabschluss">
                  Ich verpflichte mich, nach Annahme durch den Eigentümer den Mietvertrag fristgerecht
                  abzuschließen und alle damit verbundenen Kosten, Steuern und Abgaben zu tragen.
                </CheckField>

                <CheckField name="bestaetigung_poenale">
                  Ich nehme zur Kenntnis, dass bei einem Rücktritt ohne triftigen Grund eine{" "}
                  <strong>Pönale von 2 Bruttomonatsmieten</strong> an die Lara Lumbe Realitäten fällig wird.
                </CheckField>

                <CheckField name="bestaetigung_naheverhaeltnis">
                  Ich nehme zur Kenntnis, dass die Firma Lara Lumbe Realitäten mit dem Abgeber in einem
                  wirtschaftlichen Naheverhältnis steht (§ 30b KSchG).
                </CheckField>

                <CheckField name="bestaetigung_unterlagen">
                  Ich bestätige, eine Kopie dieses Mietanbotes, eine Nebenkostenübersicht gemäß
                  ÖVI-Form 13M/11/2017 sowie sämtliche Informationen gemäß § 30 KSchG in schriftlicher
                  Form erhalten zu haben. Es gelten die AGBs der Lara Lumbe Realitäten.
                </CheckField>

                <CheckField name="bestaetigung_wahrheit">
                  Ich bestätige, dass alle von mir gemachten Angaben im vorliegenden Formular der Wahrheit
                  entsprechen.
                </CheckField>
              </div>
            </div>

            {/* Dokumente */}
            <div className="border-t border-warm-200 pt-6">
              <p className="font-serif text-lg text-warm-700 mb-2">Erforderliche Unterlagen</p>
              <p className="font-sans text-xs text-warm-500 mb-5">
                Bitte laden Sie alle Dokumente als PDF, JPG oder PNG hoch.
              </p>
              <div className="space-y-4">
                <FileField label="Lebenslauf" name="lebenslauf" required />
                <FileField label="Gehaltsnachweis (letzter Monat)" name="gehalt1" required />
                <FileField label="Gehaltsnachweis (vorletzter Monat)" name="gehalt2" required />
                <FileField label="Gehaltsnachweis (drittletzter Monat)" name="gehalt3" required />
                <FileField label="Reisepass oder Personalausweis" name="ausweis" required />
                <FileField label="Unterschriebenes Mietanbot als PDF (optional)" name="mietanbot_pdf" />
              </div>
            </div>

            {/* Anmerkungen */}
            <div className="border-t border-warm-200 pt-6">
              <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
                Anmerkungen (optional)
              </label>
              <textarea name="anmerkungen" rows={4} placeholder="Haben Sie noch Fragen oder Anmerkungen?" />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded">
                <AlertCircle size={16} />
                <p className="font-sans text-sm">
                  Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder senden Sie uns eine E-Mail.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-warm-700 text-warm-50 font-sans text-sm tracking-widest uppercase py-4 hover:bg-warm-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Wird übermittelt …
                </>
              ) : (
                "Mietanbot verbindlich einreichen"
              )}
            </button>

            <p className="font-sans text-xs text-warm-400 text-center leading-relaxed">
              Mit dem Absenden bestätigen Sie alle oben angeführten rechtlichen Bedingungen.
              Dieses Anbot ist gemäß den bestätigten Punkten rechtlich verbindlich.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
