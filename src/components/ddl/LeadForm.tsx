import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Car,
  Home,
  HeartPulse,
  Briefcase,
  Bike,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  MessageCircle,
  User,
  Phone,
} from "lucide-react";

const PHONE = "5491136284033";

// ─── Tipos de seguro ─────────────────────────────────────────────────────────

const TIPOS = [
  { id: "auto", label: "Auto", icon: Car, emoji: "🚗" },
  { id: "moto", label: "Moto", icon: Bike, emoji: "🏍️" },
  { id: "hogar", label: "Hogar", icon: Home, emoji: "🏠" },
  { id: "vida", label: "Vida", icon: HeartPulse, emoji: "❤️" },
  { id: "comercio", label: "Comercio / PyME", icon: Briefcase, emoji: "🏢" },
];

// ─── Preguntas por tipo ───────────────────────────────────────────────────────

const PREGUNTAS: Record<
  string,
  { id: string; label: string; type: "select" | "text" | "radio"; options?: string[] }[]
> = {
  auto: [
    { id: "marca", label: "Marca y modelo", type: "text" },
    {
      id: "anio",
      label: "Año del vehículo",
      type: "select",
      options: Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i)),
    },
    {
      id: "uso",
      label: "Uso del vehículo",
      type: "radio",
      options: ["Particular", "Comercial / trabajo"],
    },
    {
      id: "cobertura",
      label: "¿Qué cobertura buscás?",
      type: "radio",
      options: [
        "Responsabilidad civil",
        "Terceros completo",
        "Todo riesgo",
        "No sé, necesito asesoramiento",
      ],
    },
  ],
  moto: [
    { id: "marca", label: "Marca y modelo", type: "text" },
    {
      id: "anio",
      label: "Año de la moto",
      type: "select",
      options: Array.from({ length: 20 }, (_, i) => String(new Date().getFullYear() - i)),
    },
    {
      id: "cobertura",
      label: "¿Qué cobertura buscás?",
      type: "radio",
      options: [
        "Responsabilidad civil",
        "Terceros completo",
        "Todo riesgo",
        "No sé, necesito asesoramiento",
      ],
    },
  ],
  hogar: [
    {
      id: "tipo_prop",
      label: "Tipo de propiedad",
      type: "radio",
      options: ["Casa", "Departamento", "PH"],
    },
    { id: "condicion", label: "Condición", type: "radio", options: ["Propietario", "Inquilino"] },
    { id: "zona", label: "Localidad / Barrio", type: "text" },
    {
      id: "cobertura",
      label: "¿Qué querés cubrir?",
      type: "radio",
      options: [
        "Incendio y robo",
        "Cobertura básica",
        "Cobertura completa",
        "No sé, necesito asesoramiento",
      ],
    },
  ],
  vida: [
    {
      id: "edad",
      label: "Rango de edad",
      type: "radio",
      options: ["18–30 años", "31–45 años", "46–60 años", "Más de 60"],
    },
    {
      id: "cobertura",
      label: "¿Qué tipo de cobertura buscás?",
      type: "radio",
      options: [
        "Vida simple",
        "Vida + accidentes",
        "Vida + retiro",
        "No sé, necesito asesoramiento",
      ],
    },
    {
      id: "beneficiario",
      label: "¿Tenés beneficiarios en mente?",
      type: "radio",
      options: ["Sí", "No / No sé todavía"],
    },
  ],
  comercio: [
    { id: "rubro", label: "Rubro del negocio", type: "text" },
    {
      id: "tipo_local",
      label: "Tipo de establecimiento",
      type: "radio",
      options: ["Local comercial", "Oficina", "Depósito / Galpón", "Sin local fijo"],
    },
    {
      id: "cobertura",
      label: "¿Qué querés cubrir?",
      type: "radio",
      options: [
        "Incendio y robo",
        "Responsabilidad civil",
        "ART (personal)",
        "Cobertura integral",
        "No sé, necesito asesoramiento",
      ],
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildMessage(
  tipo: string,
  respuestas: Record<string, string>,
  nombre: string,
  telefono: string,
) {
  const tipoLabel = TIPOS.find((t) => t.id === tipo)?.label ?? tipo;
  const preguntas = PREGUNTAS[tipo] ?? [];
  const detalle = preguntas
    .filter((p) => respuestas[p.id])
    .map((p) => `• ${p.label}: ${respuestas[p.id]}`)
    .join("\n");

  return encodeURIComponent(
    `Hola DDL Seguros, completé el cotizador:\n\n` +
      `👤 Nombre: ${nombre}\n` +
      `📱 Teléfono: ${telefono}\n` +
      `📋 Seguro: ${tipoLabel}\n\n` +
      `${detalle}\n\n` +
      `Quedo a la espera de su cotización.`,
  );
}

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Paso {step} de {total}
        </span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-cta"
          initial={false}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function Campo({
  pregunta,
  value,
  onChange,
}: {
  pregunta: (typeof PREGUNTAS)["auto"][0];
  value: string;
  onChange: (v: string) => void;
}) {
  if (pregunta.type === "radio") {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {pregunta.options!.map((op) => (
          <button
            key={op}
            type="button"
            onClick={() => onChange(op)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
              value === op
                ? "border-cta bg-cta/8 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-cta/30 hover:text-primary"
            }`}
          >
            <div
              className={`h-4 w-4 shrink-0 rounded-full border-2 transition-all ${
                value === op ? "border-cta bg-cta" : "border-border"
              }`}
            />
            {op}
          </button>
        ))}
      </div>
    );
  }

  if (pregunta.type === "select") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Seleccioná una opción</option>
        {pregunta.options!.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Ej: ${pregunta.id === "marca" ? "Toyota Corolla" : pregunta.id === "rubro" ? "Librería / Ferretería" : "San Martín, Mendoza"}`}
      className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
    />
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Cotizador() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [tipo, setTipo] = useState("");
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const preguntas = tipo ? (PREGUNTAS[tipo] ?? []) : [];
  const totalSteps = 4;

  const respuestasCompletas = preguntas.every((p) => respuestas[p.id]);
  const contactoCompleto = nombre.trim().length >= 2 && telefono.trim().length >= 6;

  const next = () => setStep((s) => Math.min(s + 1, 4) as 1 | 2 | 3 | 4);
  const prev = () => setStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3 | 4);

  const tipoLabel = TIPOS.find((t) => t.id === tipo);

  return (
    <section id="cotizar" ref={ref} className="bg-background py-28">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-cta" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cta">
              Cotización gratis
            </p>
            <div className="h-px w-6 bg-cta" />
          </div>
          <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">
            Tu propuesta personalizada,
            <br />
            <span className="text-cta">sin vueltas.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Completá el cotizador y te enviamos la mejor opción del mercado en menos de 24 hs.
          </p>
        </motion.div>

        {/* Card cotizador */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-card md:p-10"
        >
          <ProgressBar step={step} total={totalSteps} />

          <AnimatePresence mode="wait">
            {/* ── PASO 1: Tipo de seguro ── */}
            {step === 1 && (
              <motion.div
                key="paso1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-2 font-display text-xl font-bold text-primary">
                  ¿Qué querés asegurar?
                </h3>
                <p className="mb-7 text-sm text-muted-foreground">
                  Elegí el tipo de seguro para empezar.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {TIPOS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTipo(t.id);
                        setRespuestas({});
                      }}
                      className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                        tipo === t.id
                          ? "border-cta bg-cta/8 text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-cta/30 hover:text-primary"
                      }`}
                    >
                      <span className="text-2xl">{t.emoji}</span>
                      <span className="font-semibold">{t.label}</span>
                      {tipo === t.id && <CheckCircle className="ml-auto h-4 w-4 text-cta" />}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  disabled={!tipo}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {/* ── PASO 2: Preguntas del rubro ── */}
            {step === 2 && (
              <motion.div
                key="paso2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-2xl">{tipoLabel?.emoji}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary">
                      Seguro de {tipoLabel?.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Contanos un poco más para buscar la mejor opción.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {preguntas.map((p) => (
                    <div key={p.id}>
                      <label className="mb-2.5 block text-sm font-semibold text-foreground">
                        {p.label}
                      </label>
                      <Campo
                        pregunta={p}
                        value={respuestas[p.id] ?? ""}
                        onChange={(v) => setRespuestas((r) => ({ ...r, [p.id]: v }))}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-bold text-foreground transition hover:bg-muted"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!respuestasCompletas}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-cta py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuar <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── PASO 3: Contacto ── */}
            {step === 3 && (
              <motion.div
                key="paso3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-2 font-display text-xl font-bold text-primary">
                  ¿A dónde te enviamos la cotización?
                </h3>
                <p className="mb-7 text-sm text-muted-foreground">
                  Te contactamos por WhatsApp con la mejor propuesta en menos de 24 hs.
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">
                      Nombre y apellido
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Juan Pérez"
                        className="w-full rounded-xl border border-input bg-background py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-foreground">
                      WhatsApp / Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Ej: 11 5555-5555"
                        className="w-full rounded-xl border border-input bg-background py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-bold text-foreground transition hover:bg-muted"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!contactoCompleto}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-cta py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Ver resumen <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── PASO 4: Resumen + WhatsApp ── */}
            {step === 4 && (
              <motion.div
                key="paso4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mb-2 font-display text-xl font-bold text-primary">¡Todo listo!</h3>
                <p className="mb-7 text-sm text-muted-foreground">
                  Revisá tu solicitud y enviala por WhatsApp. Te respondemos en menos de 24 hs.
                </p>

                {/* Resumen */}
                <div className="mb-6 space-y-3 rounded-xl border border-border bg-background p-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <span className="text-2xl">{tipoLabel?.emoji}</span>
                    <span className="font-bold text-primary">Seguro de {tipoLabel?.label}</span>
                  </div>

                  {preguntas.map(
                    (p) =>
                      respuestas[p.id] && (
                        <div key={p.id} className="flex justify-between gap-4 text-sm">
                          <span className="text-muted-foreground">{p.label}</span>
                          <span className="font-medium text-foreground text-right">
                            {respuestas[p.id]}
                          </span>
                        </div>
                      ),
                  )}

                  <div className="pt-3 border-t border-border space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nombre</span>
                      <span className="font-medium text-foreground">{nombre}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Teléfono</span>
                      <span className="font-medium text-foreground">{telefono}</span>
                    </div>
                  </div>
                </div>

                {/* CTA WhatsApp */}
                <a
                  href={`https://wa.me/${PHONE}?text=${buildMessage(tipo, respuestas, nombre, telefono)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-cta py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110 hover:scale-[1.01]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar solicitud por WhatsApp
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Sin compromiso · Cotización 100% gratuita · Respuesta en &lt; 24 hs
                </p>

                <button
                  type="button"
                  onClick={prev}
                  className="mt-4 w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline"
                >
                  Volver y modificar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
