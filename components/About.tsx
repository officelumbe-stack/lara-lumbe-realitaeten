import Image from "next/image";
import { Award, Home, Shield } from "lucide-react";

const highlights = [
  {
    icon: Award,
    title: "8+ Jahre Erfahrung",
    text: "Immobilien, Hausverwaltung, Consulting und Projektentwicklung – ein breites Fundament, das jeder Vermittlung zugutekommt.",
  },
  {
    icon: Home,
    title: "Hausverwaltung & Makler",
    text: "Als Hausverwalterin im eigenen Familienbetrieb kenne ich die rechtlichen, technischen und menschlichen Feinheiten, die normale Makler selten haben.",
  },
  {
    icon: Shield,
    title: "Kauf & Vermietung",
    text: "Ob Verkauf oder Vermietung – ich begleite Sie verlässlich und persönlich durch jeden Schritt.",
  },
];

export default function About() {
  return (
    <section id="ueber-mich" className="py-24 px-6 bg-warm-100/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-xs text-warm-500 tracking-[0.2em] uppercase mb-3">
            Ihre Ansprechpartnerin
          </p>
          <h2 className="font-serif text-4xl text-warm-800">Über mich</h2>
          <div className="w-12 h-px bg-warm-300 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <h3 className="font-serif text-3xl text-warm-700 mb-2">
              Lara Lumbe
            </h3>
            <p className="font-sans text-xs text-warm-500 tracking-widest uppercase mb-6">
              Maklerin · Hausverwalterin · Treuhänderin · Consultant
            </p>
            <div className="space-y-4 font-sans text-warm-700 leading-relaxed text-[0.95rem]">
              <p>
                Immobilien sind mehr als nur vier Wände – sie sind Lebensräume,
                Heimat und Investition zugleich. Mit diesem Bewusstsein begleite
                ich meine Klientinnen und Klienten seit über acht Jahren.
              </p>
              <p>
                Hauptberuflich als Hausverwalterin tätig, kenne ich die
                rechtlichen, technischen und menschlichen Feinheiten rund um
                Wohnimmobilien und Geschäftsräumlichkeiten aus einer ganz
                besonderen Perspektive. Dieses Wissen bringe ich in jede
                Vermittlung mit ein – zum Vorteil aller Beteiligten.
              </p>
              <p>
                Darüber hinaus war ich in den letzten acht Jahren auch im
                Consulting- und Projektentwicklungsbereich tätig – eine
                Erfahrung, die mir bei der strategischen Vermarktung und
                Entwicklung von Immobilienprojekten jeder Größenordnung
                besonders zugute kommt.
              </p>
              <p>
                Ob Sie eine Wohnung vermieten oder kaufen möchten, kontaktieren
                Sie mich gerne!
              </p>
            </div>

            <div className="mt-10 space-y-6">
              {highlights.map((h) => (
                <div key={h.title} className="flex gap-4">
                  <div className="shrink-0 w-9 h-9 bg-warm-200 flex items-center justify-center rounded-full mt-0.5">
                    <h.icon size={16} className="text-warm-700" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-warm-800">
                      {h.title}
                    </p>
                    <p className="font-sans text-sm text-warm-500 mt-0.5 leading-relaxed">
                      {h.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 sm:w-80">
              <div className="absolute -top-3 -left-3 w-full h-full border border-warm-300" />
              <div className="relative overflow-hidden">
                <Image
                  src="/images/lara.jpeg"
                  alt="Lara Lumbe – Maklerin und Hausverwalterin"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover grayscale"
                  priority={false}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-warm-700 px-4 py-2">
                <p className="font-serif text-warm-50 text-sm">
                  Lara Lumbe Realitäten
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
