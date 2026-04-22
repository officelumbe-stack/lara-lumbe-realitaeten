import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Lara Lumbe Realitäten | Immobilien in Wien",
  description:
    "Ihr verlässlicher Partner für Kauf und Vermietung von Immobilien in Wien. Lara Lumbe – Maklerin und Hausverwalterin mit über 8 Jahren Erfahrung.",
  keywords: "Immobilien Wien, Makler Wien, Wohnung mieten Wien, Lara Lumbe",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
