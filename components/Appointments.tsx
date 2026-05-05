"use client";

import { useState, useRef } from "react";
import { Calendar, Clock, MapPin, CheckCircle, Loader2, AlertCircle } from "lucide-react";

// Hier trägt Lara die jeweils aktuellen Besichtigungstermine ein.
// Pro Objekt ein Eintrag – einfach bei Bedarf ergänzen oder ändern.
const termine: { id: string; datum: string; uhrzeit: string; objekt: string; adresse: string }[] = [];

type Status = "idle" | "loading" | "success" | "error";

export default function Appointments() {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected) return;
    setStatus("loading");

    const termin = termine.find((t) => t.id === selected)!;
    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/termin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          telefon: fd.get("telefon"),
          email: fd.get("email"),
          objekt: termin.objekt,
          termin: `${termin.datum} um ${termin.uhrzeit}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      formRef.current?.reset();
      setSelected(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="termine" className="py-24 px-6 bg-warm-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs text-warm-500 tracking-[0.2em] uppercase mb-3">
            Besichtigung vereinbaren
          </p>
          <h2 className="font-serif text-4xl text-warm-800">
            Besichtigungstermine
          </h2>
          <div className="w-12 h-px bg-warm-300 mx-auto mt-4 mb-6" />
          <p className="font-sans text-warm-600 text-sm leading-relaxed max-w-lg mx-auto">
            Wählen Sie einen verfügbaren Termin aus und melden Sie sich direkt an.
            Wir bestätigen Ihre Buchung per E-Mail oder Telefon.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-warm-50 border border-warm-300 p-10 text-center">
            <CheckCircle size={36} className="text-warm-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-warm-800 mb-2">
              Vielen Dank!
            </h3>
            <p className="font-sans text-warm-600 text-sm">
              Ihre Anmeldung wurde übermittelt. Wir melden uns in Kürze bei Ihnen.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Keine Termine */}
            {termine.length === 0 && (
              <div className="text-center py-12 border border-warm-200 bg-warm-100/40">
                <p className="font-serif text-lg text-warm-700 mb-2">
                  Derzeit sind keine Termine eingetragen.
                </p>
                <p className="font-sans text-sm text-warm-500">
                  Bitte nehmen Sie direkt{" "}
                  <a href="#kontakt" className="underline underline-offset-2 hover:text-warm-700">
                    Kontakt
                  </a>{" "}
                  auf – wir vereinbaren gerne einen individuellen Besichtigungstermin.
                </p>
              </div>
            )}

            {/* Terminslots */}
            <div className="space-y-3">
              {termine.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelected(selected === t.id ? null : t.id)}
                  className={`w-full text-left border px-6 py-5 transition-colors ${
                    selected === t.id
                      ? "border-warm-600 bg-warm-100"
                      : "border-warm-200 bg-warm-50 hover:border-warm-400"
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-x-8 gap-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="text-warm-500 shrink-0" />
                      <span className="font-sans text-sm text-warm-800 font-medium">
                        {t.datum}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-warm-500 shrink-0" />
                      <span className="font-sans text-sm text-warm-700">{t.uhrzeit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={15} className="text-warm-500 shrink-0" />
                      <span className="font-sans text-sm text-warm-600">{t.adresse}</span>
                    </div>
                  </div>
                  {selected === t.id && (
                    <p className="font-sans text-xs text-warm-600 mt-3 border-t border-warm-200 pt-3">
                      ✓ Termin ausgewählt – bitte Kontaktdaten ausfüllen und absenden.
                    </p>
                  )}
                </button>
              ))}
            </div>

            {/* Buchungsformular */}
            {selected && (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-warm-50 border border-warm-200 p-6 sm:p-8 space-y-4"
              >
                <p className="font-serif text-lg text-warm-700 mb-2">
                  Ihre Kontaktdaten
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
                      Vor- und Nachname <span className="text-warm-500">*</span>
                    </label>
                    <input type="text" name="name" required placeholder="Maria Muster" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
                      Telefon <span className="text-warm-500">*</span>
                    </label>
                    <input type="tel" name="telefon" required placeholder="+43 660 …" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
                      E-Mail <span className="text-warm-500">*</span>
                    </label>
                    <input type="email" name="email" required placeholder="maria@beispiel.at" />
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded">
                    <AlertCircle size={15} />
                    <p className="font-sans text-sm">
                      Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-warm-700 text-warm-50 font-sans text-sm tracking-widest uppercase py-3.5 hover:bg-warm-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Wird gesendet …
                    </>
                  ) : (
                    "Termin verbindlich anmelden"
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
