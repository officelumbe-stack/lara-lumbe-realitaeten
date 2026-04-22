import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-warm-900 text-warm-500 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-full opacity-50"
          />
          <span className="font-serif text-warm-400 text-sm">
            Lara Lumbe Realitäten
          </span>
        </div>
        <p className="font-sans text-xs text-warm-600">
          © {year} Lara Lumbe Realitäten · Wien
        </p>
      </div>
    </footer>
  );
}
