import { MapPin, Maximize2, ExternalLink } from "lucide-react";
import { properties } from "@/data/properties";

export default function Properties() {
  return (
    <section id="angebote" className="py-24 px-6 bg-warm-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-xs text-warm-500 tracking-[0.2em] uppercase mb-3">
            Verfügbare Objekte
          </p>
          <h2 className="font-serif text-4xl text-warm-800">
            Aktuelle Angebote
          </h2>
          <div className="w-12 h-px bg-warm-300 mx-auto mt-4" />
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 border border-warm-200 bg-warm-100/50">
            <p className="font-sans text-warm-500 text-sm tracking-wide">
              Derzeit sind keine Objekte verfügbar.
            </p>
            <p className="font-sans text-warm-400 text-sm mt-2">
              Bitte schauen Sie bald wieder vorbei oder nehmen Sie Kontakt auf.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-warm-200 hover:border-warm-400 transition-colors group"
              >
                {p.images[0] ? (
                  <div className="aspect-[4/3] overflow-hidden bg-warm-100">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-warm-100 flex items-center justify-center">
                    <span className="font-serif text-warm-300 text-2xl">LL</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-warm-800 mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-warm-500 mb-1">
                    <MapPin size={13} />
                    <span className="font-sans text-xs">{p.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-warm-500 mb-4">
                    <Maximize2 size={13} />
                    <span className="font-sans text-xs">
                      {p.size} m² · {p.rooms} Zimmer · {p.type}
                    </span>
                  </div>
                  <div className="border-t border-warm-100 pt-4 flex items-end justify-between">
                    <div>
                      <p className="font-sans text-xs text-warm-400 uppercase tracking-wide">
                        Gesamtmiete
                      </p>
                      <p className="font-serif text-2xl text-warm-700">
                        € {p.rentTotal.toLocaleString("de-AT", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    {p.willhabenUrl && (
                      <a
                        href={p.willhabenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-sans text-xs text-warm-600 hover:text-warm-800 border border-warm-300 px-3 py-1.5 hover:bg-warm-100 transition-colors"
                      >
                        Willhaben <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                  <div className="mt-4">
                    <a
                      href="#kontakt"
                      className="block w-full text-center bg-warm-700 text-warm-50 font-sans text-xs tracking-widest uppercase py-2.5 hover:bg-warm-800 transition-colors"
                    >
                      Interesse bekunden
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
