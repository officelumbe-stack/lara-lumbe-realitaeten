export default function Appointments() {
  // CALENDLY_URL: Lara trägt hier ihre Calendly-Seite ein, z.B.:
  // "https://calendly.com/lara-lumbe/besichtigung"
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

  return (
    <section id="termine" className="py-24 px-6 bg-warm-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs text-warm-500 tracking-[0.2em] uppercase mb-3">
            Besichtigung vereinbaren
          </p>
          <h2 className="font-serif text-4xl text-warm-800">
            Besichtigungstermine
          </h2>
          <div className="w-12 h-px bg-warm-300 mx-auto mt-4 mb-6" />
          <p className="font-sans text-warm-600 text-sm leading-relaxed max-w-xl mx-auto">
            Wählen Sie einfach einen freien Termin aus und buchen Sie direkt online.
            Nach der Buchung erhalten Sie eine Bestätigung per E-Mail.
          </p>
        </div>

        {calendlyUrl ? (
          <div className="border border-warm-200 overflow-hidden">
            <iframe
              src={calendlyUrl}
              width="100%"
              height="700"
              frameBorder="0"
              title="Besichtigungstermin buchen"
            />
          </div>
        ) : (
          <div className="border border-warm-200 bg-warm-100/50 p-12 text-center">
            <p className="font-sans text-warm-500 text-sm mb-4">
              Online-Terminbuchung wird in Kürze eingerichtet.
            </p>
            <p className="font-sans text-warm-600 text-sm">
              Bitte nehmen Sie direkt Kontakt auf:
            </p>
            <a
              href="tel:01503179750"
              className="inline-block mt-4 font-serif text-warm-700 text-xl hover:text-warm-900"
            >
              01 503 179 750
            </a>
            <span className="block font-sans text-warm-400 text-xs mt-1">oder</span>
            <a
              href="mailto:lara@lumbe.at"
              className="inline-block mt-2 font-sans text-warm-600 text-sm hover:text-warm-800"
            >
              lara@lumbe.at
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
