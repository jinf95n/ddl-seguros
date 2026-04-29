import { motion } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, ArrowRight, ShieldCheck, Clock, Building2, ChevronDown } from "lucide-react";
import heroImage from "@/assets/insurance-family.png";

const WHATSAPP_URL = "https://wa.me/5491136284033?text=Hola%20DDL%20Seguros%2C%20quiero%20una%20cotizaci%C3%B3n";

const STATS = [
  { value: "+20", label: "Compañías" },
  { value: "24hs", label: "Respuesta" },
  { value: "100%", label: "Nacional" },
];

const SEGUROS = ["Automotor", "Hogar", "Vida", "Motos", "Comercios", "ART"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen flex-col overflow-hidden">

      {/* ── Background image con overlay fuerte ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Overlay en dos capas: izquierda más oscura, derecha respira */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20" />
      </div>

      {/* ── Noise ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Glow accent ── */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/3 h-[600px] w-[600px] rounded-full bg-cta/10 blur-[140px]" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-4 pb-28 pt-28 md:grid-cols-2 md:px-8">

        {/* Columna izquierda — copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-px w-6 bg-cta" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cta">
              Protección &amp; Confianza
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-display text-4xl font-extrabold leading-[1.06] text-white sm:text-5xl md:text-[3.25rem]"
          >
            Protegé lo que<br />
            más te importa,<br />
            <span className="text-cta">con la cobertura exacta.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8 max-w-md text-base leading-relaxed text-white/65 md:text-lg"
          >
            Comparamos entre las principales compañías del mercado argentino
            para encontrar la póliza ideal para tu situación.
            Sin vueltas, sin letra chica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#cotizar"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
            >
              Cotizar ahora
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </motion.div>

          {/* Tipos de seguro como pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {SEGUROS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/60 backdrop-blur-sm"
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Columna derecha — card cotizador rápido */}
        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <div className="rounded-2xl border border-white/10 bg-white/8 p-8 shadow-2xl backdrop-blur-xl">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-cta">
              Cotización gratuita
            </p>
            <h2 className="mb-6 text-xl font-bold text-white">
              ¿Qué querés asegurar?
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { emoji: "🚗", label: "Auto / Moto" },
                { emoji: "🏠", label: "Hogar" },
                { emoji: "❤️", label: "Vida" },
                { emoji: "🏢", label: "Comercio" },
              ].map(({ emoji, label }) => (
                <a
                  key={label}
                  href="#cotizar"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all duration-200 hover:border-cta/40 hover:bg-white/10"
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white">
                    {label}
                  </span>
                </a>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cta py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" />
              Empezar cotización por WhatsApp
            </a>

            <p className="mt-3 text-center text-xs text-white/35">
              Sin compromiso · Respuesta en menos de 24 hs
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Stats bar — fondo navy sólido ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-primary border-t border-white/8"
      >
        <div className="mx-auto flex max-w-7xl divide-x divide-white/8">
          {STATS.map(({ value, label }) => (
            <div key={value} className="flex flex-1 items-center justify-center gap-3 py-4 px-4">
              <span className="text-xl font-extrabold text-cta md:text-2xl">{value}</span>
              <span className="text-xs text-white/40 hidden sm:block">{label}</span>
            </div>
          ))}
          <div className="flex flex-1 items-center justify-center gap-2 py-4 px-4">
            <ShieldCheck className="h-4 w-4 text-cta" />
            <span className="text-xs text-white/40 hidden sm:block">Compañías líderes</span>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 right-8 z-20 hidden flex-col items-center gap-1 md:flex"
      >
        <span className="text-[9px] uppercase tracking-widest text-white/40">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-3.5 w-3.5 text-white/40" />
        </motion.div>
      </motion.div>

    </section>
  );
}