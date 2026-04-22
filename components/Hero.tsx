export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-warm-100 via-warm-50 to-warm-50 px-6 pt-16">
      <div className="text-center max-w-2xl">
        <p className="font-sans text-xs text-warm-500 tracking-[0.25em] uppercase mb-6">
          Wien · Immobilien
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-warm-800 leading-tight mb-6">
          Lara Lumbe
          <br />
          <span className="text-warm-600 text-4xl sm:text-5xl md:text-6xl font-light">
            Realitäten
          </span>
        </h1>
        <div className="w-16 h-px bg-warm-300 mx-auto mb-6" />
        <p className="font-sans text-warm-600 text-base sm:text-lg leading-relaxed mb-10 font-light max-w-xl mx-auto">
          Mit langjähriger Erfahrung in der Immobilienbranche unterstütze ich Sie gerne
          bei der Vermietung oder dem Verkauf Ihrer Immobilie. Als Hausverwalterin im
          eigenen Familienbetrieb sammle ich täglich umfassende Erfahrung, die mir bei
          der Vermarktung von Objekten aller Art zugute kommt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#angebote"
            className="inline-block bg-warm-700 text-warm-50 font-sans text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-warm-800 transition-colors"
          >
            Aktuelle Angebote
          </a>
          <a
            href="#kontakt"
            className="inline-block border border-warm-400 text-warm-700 font-sans text-sm tracking-widest uppercase px-8 py-3.5 hover:bg-warm-100 transition-colors"
          >
            Kontakt
          </a>
        </div>
      </div>
    </section>
  );
}
