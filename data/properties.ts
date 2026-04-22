export interface Property {
  id: string;
  title: string;
  address: string;
  district: string;
  size: number;
  rooms: number;
  rentTotal: number;
  rentNet: number;
  deposit: number;
  available: string;
  duration: string;
  type: "Miete" | "Kauf";
  images: string[];
  description: string;
  willhabenUrl: string;
  features: string[];
}

export const properties: Property[] = [
  {
    id: "diehlgasse-47",
    title: "Erstbezug: Exklusive Neubauwohnungen im Altbaustil",
    address: "Diehlgasse 47, 1050 Wien",
    district: "1050 Wien – Margareten",
    size: 31.67,
    rooms: 2,
    rentTotal: 799,
    rentNet: 715.74,
    deposit: 5141.94,
    available: "nach Vereinbarung",
    duration: "5 Jahre befristet",
    type: "Miete",
    images: [],
    description:
      "Exklusive Erstbezugswohnungen in einem zur Gänze neu errichteten Haus im charmanten Altbaustil im 5. Bezirk. Mehrere Einheiten verfügbar (ca. 32 m²). Die angeführten Betriebskosten sind Schätzwerte – die tatsächliche Höhe wird nach Ablauf des ersten Jahres festgesetzt.",
    willhabenUrl:
      "https://www.willhaben.at/iad/immobilien/d/mietwohnungen/wien/wien-1050-margareten/erstbezug-exklusive-neubauwohnungen-im-altbaustil-beispiel-32-m-apartment-1579248295/",
    features: ["Erstbezug", "Neubau im Altbaustil", "5. Bezirk", "Mehrere Einheiten"],
  },
];
