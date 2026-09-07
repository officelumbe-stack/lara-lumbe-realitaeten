export interface Property {
  id: string;
  title: string;
  address: string;
  district: string;
  size: number;
  rooms: number;
  type: "Miete" | "Kauf" | "Gewerbe";
  // Miete / Gewerbe
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
    id: "klimschgasse-25-1030",
    title: "Sonniges Sanierungsobjekt 83m² – zwischen Rennweg und Landstraßer Hauptstraße",
    address: "Klimschgasse 25, 1030 Wien",
    district: "1030 Wien – Landstraße",
    size: 83,
    rooms: 3,
    type: "Kauf",
    purchasePrice: 373500,
    monthlyRunningCosts: 359.02,
    available: "ab sofort",
    images: ["/images/Klimschgasse.png"],
    description:
      "3-Zimmer-Altbauwohnung im 5. Stock eines ruhigen Wohnhauses in einem geschlossenen Wohnkarree im 3. Bezirk – ohne Durchzugsverkehr, mit breiten Gehsteigen und alten Bäumen. Nachmittagssonne in den beiden Zimmern zur Klimschgasse, außergewöhnlich großzügiger begehbarer Schrankraum (8,18 m²). Bad kürzlich saniert (ebenerdige Dusche, Waschtisch, separates WC), Küche mit allen Geräten. Eines der Zimmer mit Fensterfront bis zum Boden. Übrige Räume sanierungsbedürftig. Lift vorhanden, Kellerabteil inklusive.",
    willhabenUrl:
      "https://www.willhaben.at/iad/immobilien/d/eigentumswohnung/wien/wien-1030-landstrasse/sonniges-sanierungsobjekt-83m-zwischen-rennweg-und-landstrasser-hauptstrasse-1045022007/",
    features: [
      "Altbau",
      "3 Zimmer",
      "Lift vorhanden",
      "Parkett",
      "Einbauküche",
      "Begehbarer Schrankraum",
      "Kellerabteil",
      "Bad neu saniert",
      "Gasheizung / Etagenheizung",
      "Sanierungsbedürftig",
      "5. Stock",
      "Sofort verfügbar",
    ],
  },
  {
    id: "operngasse-4-1010",
    title: "Repräsentative Büroetage in Wiener Innenstadt-Palais",
    address: "Operngasse 4, 1010 Wien",
    district: "1010 Wien – Innere Stadt",
    size: 379.87,
    rooms: 10,
    type: "Gewerbe",
    rentTotal: 9989.41,
    rentNet: 8737.01,
    deposit: 39957.64,
    duration: "unbefristet",
    available: "ab 01.10.2026",
    images: ["/images/Inserat Operngasse.jpg"],
    description:
      "Außergewöhnliche Büroetage im 2. OG eines repräsentativen Wiener Palais – unmittelbar neben der Staatsoper. Hohe Räume, Stuckdetails, original Wiener Tafelparkett, eindrucksvolle Flügeltüren und direkter Blick auf die Wiener Staatsoper. Ca. 379,87 m² Nutzfläche, bequem mit Aufzug erreichbar. Ab 1. Oktober 2026 verfügbar.",
    willhabenUrl:
      "https://www.willhaben.at/iad/immobilien/d/gewerbeimmobilien-mieten/wien/wien-1010-innere-stadt/repraesentative-bueroetage-in-wiener-innenstadt-palais-blick-auf-staatsoper-1648419378/",
    features: [
      "Blick auf Staatsoper",
      "Wiener Tafelparkett",
      "Stuckdetails",
      "Flügeltüren",
      "Lift",
      "Einbauküche",
      "Innenhof",
      "Altbau-Palais",
      "2. Obergeschoss",
      "ab Oktober 2026",
    ],
  },
];
