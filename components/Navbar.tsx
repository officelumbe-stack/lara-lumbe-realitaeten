"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Angebote", href: "#angebote" },
  { label: "Über mich", href: "#ueber-mich" },
  { label: "Termine", href: "#termine" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-50/95 backdrop-blur-sm border-b border-warm-200">
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Lara Lumbe Realitäten Logo"
            width={40}
            height={40}
            className="rounded-full opacity-80"
          />
          <span className="font-serif text-lg text-warm-800 tracking-wide hidden sm:block">
            Lara Lumbe Realitäten
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-sans text-sm text-warm-600 hover:text-warm-800 transition-colors tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-warm-700 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-warm-50 border-t border-warm-200 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-sans text-sm text-warm-700 hover:text-warm-900"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
