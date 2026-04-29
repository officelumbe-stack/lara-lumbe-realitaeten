"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle, AlertCircle, Loader2, Eraser } from "lucide-react";
import { properties } from "@/data/properties";

type Status = "idle" | "loading" | "success" | "error";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-warm-500">*</span>}
      </label>
      <input type={type} name={name} required={required} placeholder={placeholder} />
    </div>
  );
}

function CheckField({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="flex gap-3 cursor-pointer group">
      <input
        type="checkbox"
        name={name}
        required
        className="shrink-0 mt-0.5 w-4 h-4 accent-warm-700 cursor-pointer"
      />
      <span className="font-sans text-sm text-warm-700 leading-relaxed group-hover:text-warm-900">
        {children}
      </span>
    </label>
  );
}

function SignaturePad({ onSign }: { onSign: (dataUrl: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FAFAF7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#3E3028";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSigned(true);
    onSign(canvas.toDataURL("image/png"));
  }

  function endDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    drawing.current = false;
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.fillStyle = "#FAFAF7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    onSign(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="font-sans text-xs text-warm-600 uppercase tracking-wider">
          Unterschrift <span className="text-warm-500">*</span>
        </label>
        {hasSigned && (
          <button
            type="button"
            onClick={clear}
            className="flex items-center gap-1 font-sans text-xs text-warm-500 hover:text-warm-700 transition-colors"
          >
            <Eraser size={12} />
            Löschen
          </button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={140}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        className="w-full border border-warm-300 rounded bg-warm-50 cursor-crosshair touch-none"
        style={{ height: "120px" }}
      />
      <p className="font-sans text-xs text-warm-400 mt-1">
        Bitte hier mit Maus oder Finger unterschreiben
      </p>
    </div>
  );
}

export default function VorzeitigesTaetigwerden() {
  const [status, setStatus] = useState<Status>("idle");
  const [signature, setSignature] = useState<string | null>(null);
  const [signatureError, setSignatureError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!signature) {
      setSignatureError(true);
      return;
    }
    setSignatureError(false);
    setStatus("loading");

    try {
      const form = e.currentTarget;
      const data = {
        objekt: (form.elements.namedItem("objekt") as HTMLSelectElement | HTMLInputElement).value,
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        anschrift: (form.elements.namedItem("anschrift") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        signature,
      };

      const res = await fetch("/api/vorzeitiges-taetigwerden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      formRef.current?.reset();
      setSignature(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="vorzeitiges-taetigwerden" className="py-24 px-6 bg-warm-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-xs text-warm-500 tracking-[0.2em] uppercase mb-3">
            Rechtliche Erklärung
          </p>
          <h2 className="font-serif text-4xl text-warm-800">
            Vorzeitiges Tätigwerden
          </h2>
          <div className="w-12 h-px bg-warm-300 mx-auto mt-4 mb-6" />
          <p className="font-sans text-warm-600 text-sm leading-relaxed max-w-xl mx-auto">
            Mit dieser Erklärung gestatten Sie Lara Lumbe Realitäten, bereits vor
            Ablauf der 14-tägigen Widerrufsfrist tätig zu werden – etwa durch die
            Übermittlung von Detailinformationen oder die Vereinbarung eines
            Besichtigungstermins.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-warm-100 border border-warm-300 p-10 text-center">
            <CheckCircle size={36} className="text-warm-600 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-warm-800 mb-2">
              Vielen Dank!
            </h3>
            <p className="font-sans text-warm-600 text-sm">
              Ihre Erklärung wurde erfolgreich übermittelt.
              <br />
              Wir werden uns umgehend mit Ihnen in Verbindung setzen.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="bg-warm-100/60 border border-warm-200 p-8 sm:p-10 space-y-8">

            {/* Objekt */}
            {properties.length > 0 ? (
              <div>
                <label className="block font-sans text-xs text-warm-600 uppercase tracking-wider mb-1.5">
                  Objekt <span className="text-warm-500">*</span>
                </label>
                <select name="objekt" required>
                  <option value="">Bitte wählen …</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.address}>
                      {p.address}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <Field label="Objekt" name="objekt" required placeholder="z.B. Musterstraße 1/5, 1010 Wien" />
            )}

            {/* Persönliche Daten */}
            <div className="border-t border-warm-200 pt-6 space-y-5">
              <p className="font-serif text-lg text-warm-700">Ihre Daten</p>
              <Field label="Vor- und Nachname" name="name" required placeholder="Maria Muster" />
              <Field label="Anschrift" name="anschrift" required placeholder="Musterstraße 1/2, 1010 Wien" />
              <Field label="E-Mail" name="email" type="email" required placeholder="maria@beispiel.at" />
            </div>

            {/* Erklärungen */}
            <div className="border-t border-warm-200 pt-6">
              <p className="font-serif text-lg text-warm-700 mb-5">Erklärungen</p>

              <div className="bg-warm-50 border border-warm-300 p-5 mb-6 text-xs font-sans text-warm-700 leading-relaxed space-y-3">
                <p className="font-semibold text-warm-800 text-sm">
                  Erklärung zum vorzeitigen Tätigwerden gemäß § 11 FAGG
                </p>
                <p>
                  Ich verlange ausdrücklich, dass <strong>Lara Lumbe Realitäten</strong> bereits
                  vor Ablauf der 14-tägigen Widerrufsfrist mit der Tätigkeit beginnt (z.B.
                  Übermittlung von Detailinformationen, Vereinbarung eines Besichtigungstermins).
                </p>
                <p>
                  Ich nehme zur Kenntnis, dass ich bei vollständiger Vertragserfüllung
                  (insbesondere Namhaftmachung der Geschäftsgelegenheit) mein Widerrufsrecht verliere.
                </p>
              </div>

              <div className="space-y-4">
                <CheckField name="bestaetigung_widerrufsrecht">
                  Ich bestätige, dass ich über mein 14-tägiges Widerrufsrecht informiert wurde.
                </CheckField>
                <CheckField name="bestaetigung_vorzeitig">
                  Ich verlange ausdrücklich, dass Lara Lumbe Realitäten bereits vor Ablauf der
                  14-tägigen Widerrufsfrist mit der Tätigkeit beginnt (z.B. Übermittlung von
                  Detailinformationen, Vereinbarung eines Besichtigungstermins).
                </CheckField>
                <CheckField name="bestaetigung_verlust">
                  Ich nehme zur Kenntnis, dass ich bei vollständiger Vertragserfüllung
                  (insbesondere Namhaftmachung der Geschäftsgelegenheit) mein Widerrufsrecht verliere.
                </CheckField>
              </div>
            </div>

            {/* Unterschrift */}
            <div className="border-t border-warm-200 pt-6">
              <SignaturePad onSign={setSignature} />
              {signatureError && (
                <p className="font-sans text-xs text-red-500 mt-2">
                  Bitte unterschreiben Sie das Formular.
                </p>
              )}
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded">
                <AlertCircle size={16} />
                <p className="font-sans text-sm">
                  Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-warm-700 text-warm-50 font-sans text-sm tracking-widest uppercase py-4 hover:bg-warm-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Wird übermittelt …
                </>
              ) : (
                "Erklärung verbindlich absenden"
              )}
            </button>

            <p className="font-sans text-xs text-warm-400 text-center leading-relaxed">
              Diese Erklärung wird digital übermittelt und ist rechtlich wirksam.
              Datum der Übermittlung wird automatisch erfasst.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
