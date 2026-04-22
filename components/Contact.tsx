import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="kontakt" className="py-24 px-6 bg-warm-800 text-warm-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-xs text-warm-400 tracking-[0.2em] uppercase mb-3">
            Sprechen Sie uns an
          </p>
          <h2 className="font-serif text-4xl text-warm-100">Kontakt</h2>
          <div className="w-12 h-px bg-warm-600 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-9 h-9 bg-warm-700 flex items-center justify-center rounded-full">
                <MapPin size={15} className="text-warm-200" />
              </div>
              <div>
                <p className="font-sans text-xs text-warm-500 uppercase tracking-wider mb-1">Adresse</p>
                <p className="font-sans text-warm-200 text-sm leading-relaxed">
                  Schönburgstraße 11<br />1040 Wien
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-9 h-9 bg-warm-700 flex items-center justify-center rounded-full">
                <Phone size={15} className="text-warm-200" />
              </div>
              <div>
                <p className="font-sans text-xs text-warm-500 uppercase tracking-wider mb-1">Telefon</p>
                <a href="tel:01503179750" className="font-sans text-warm-200 text-sm hover:text-warm-50">
                  01 503 179 750
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-9 h-9 bg-warm-700 flex items-center justify-center rounded-full">
                <Mail size={15} className="text-warm-200" />
              </div>
              <div>
                <p className="font-sans text-xs text-warm-500 uppercase tracking-wider mb-1">E-Mail</p>
                <a href="mailto:lara@lumbe.at" className="font-sans text-warm-200 text-sm hover:text-warm-50">
                  lara@lumbe.at
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-9 h-9 bg-warm-700 flex items-center justify-center rounded-full">
                <Clock size={15} className="text-warm-200" />
              </div>
              <div>
                <p className="font-sans text-xs text-warm-500 uppercase tracking-wider mb-1">Erreichbarkeit</p>
                <p className="font-sans text-warm-200 text-sm">
                  Mo – Fr, 9:00 – 17:00 Uhr
                </p>
              </div>
            </div>
          </div>

          {/* Impressum */}
          <div className="border border-warm-700 p-6">
            <p className="font-sans text-xs text-warm-500 uppercase tracking-wider mb-4">
              Impressum & Offenlegung
            </p>
            <div className="space-y-2 font-sans text-xs text-warm-400 leading-relaxed">
              <p className="text-warm-300 font-medium">Lara Lumbe Realitäten</p>
              <p>Inhaberin: Lara Lumbe</p>
              <p>Schönburgstraße 11, 1040 Wien</p>
              <p>
                Steuernummer: 04 453/4295
              </p>
              <p className="pt-2">
                Mitglied der Wirtschaftskammer Österreich<br />
                Immobilien- und Vermögenstreuhänder
              </p>
              <p className="pt-2">
                Aufsichtsbehörde: Magistrat der Stadt Wien<br />
                Rechtsgrundlage: GewO 1994
              </p>
              <p className="pt-2 text-warm-500">
                Es gelten unsere Allgemeinen Geschäftsbedingungen.<br />
                Alle Preise inkl. MwSt. sofern nicht anders angegeben.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
