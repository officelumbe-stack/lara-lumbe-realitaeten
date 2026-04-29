export interface Property {
  id: string;
  title: string;
  address: string;
  district: string;
  size: number;
  rooms: number;
  type: "Miete" | "Kauf";
  // Miete
  rentTotal?: number;
  rentNet?: number;
  deposit?: number;
  duration?: string;
  // Kauf
  purchasePrice?: number;
  monthlyRunningCosts?: number;
  available: string;
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
    type: "Miete",
    rentTotal: 799,
    rentNet: 715.74,
    deposit: 5141.94,
    duration: "5 Jahre befristet",
    available: "nach Vereinbarung",
    images: ["/images/Inserat.jpeg"],
    description:
      "Exklusive Erstbezugswohnungen in einem zur Gänze neu errichteten Haus im charmanten Altbaustil im 5. Bezirk. Mehrere Einheiten verfügbar (ca. 32 m²). Die angeführten Betriebskosten sind Schätzwerte – die tatsächliche Höhe wird nach Ablauf des ersten Jahres festgesetzt.",
    willhabenUrl:
      "https://www.willhaben.at/iad/immobilien/d/mietwohnungen/wien/wien-1050-margareten/erstbezug-exklusive-neubauwohnungen-im-altbaustil-beispiel-32-m-apartment-1579248295/",
    features: ["Erstbezug", "Neubau im Altbaustil", "5. Bezirk", "Mehrere Einheiten"],
  },
  {
    id: "silbergasse-1190",
    title: "Eleganter Altbau-Charme in begehrter Döblinger Lage",
    address: "Silbergasse, 1190 Wien",
    district: "1190 Wien – Döbling",
    size: 128,
    rooms: 4,
    type: "Kauf",
    purchasePrice: 765000,
    monthlyRunningCosts: 536,
    available: "sofort bezugsfrei",
    images: ["/images/Inserat Silbergasse.jpg"],
    description:
      "Großzügige 4-Zimmer-Altbauwohnung in einem gepflegten Zinshaus aus ca. 1910 – saniert und sofort bezugsfrei. Hohe Räume, Fischgrätparkett, Stuckdecken, eindrucksvolle Flügeltüren, westseitiger Balkon mit Schmiedeeisengeländer und grüner Gemeinschaftsgarten im Innenhof. 1. Obergeschoss mit Lift.",
    willhabenUrl: "https://www.willhaben.at/iad/object?adId=1190580010",
    features: [
      "Balkon westseitig",
      "Lift vorhanden",
      "Gemeinschaftsgarten",
      "Fischgrätparkett",
      "Stuckdecken",
      "Einbauküche",
      "Sofort bezugsfrei",
      "Baujahr ca. 1910",
    ],
  },
];
