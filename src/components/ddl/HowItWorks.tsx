import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, Search, Send, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5491136284033?text=Hola%20DDL%20Seguros%2C%20quiero%20una%20cotizaci%C3%B3n";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Nos contás qué necesitás",
    desc: "Por WhatsApp o el formulario. Sin papeles, sin turnos. Solo nos decís qué querés cubrir y nosotros hacemos el resto.",
    detail: "Auto · Hogar · Vida · Negocio · Moto",
  },
  {
    icon: Search,
    number: "02",
    title: "Comparamos por vos",
    desc: "Analizamos coberturas y precios entre las principales compañías del mercado argentino para encontrar la opción ideal para tu caso.",
    detail: "Sin costo adicional · Sin compromiso",
  },
  {
    icon: Send,
    number: "03",
    title: "Recibís tu propuesta",
    desc: "En menos de 24 hs te enviamos la mejor opción con todo detalle. Vos decidís si avanzar. Sin presiones.",
    detail: "Respuesta garantizada en < 24 hs",
  },
];

function Step({ step, index, total }: { step: typeof steps[0]; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex flex-col items-start">

      {/* Conector horizontal (desktop) */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="absolute left-[calc(50%+2rem)] top-10 hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-white/20 to-white/5 lg:block"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full"
      >
        {/* Número grande decorativo */}
        <span className="pointer-events-none absolute -top-6 right-0 select-none font-extrabold leading-none text-white/4 transition-all duration-500 group-hover:text-white/7"
          style={{ fontSize: "7rem" }}
        >
          {step.number}
        </span>

        {/* Ícono con ring animado */}
        <div className="relative mb-6 inline-flex">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cta backdrop-blur-sm transition-all duration-300 group-hover:border-cta/30 group-hover:bg-cta/10">
            <step.icon className="h-8 w-8" />
          </div>
          {/* Pulso en el paso activo (primero) */}
          {index === 0 && (
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 rounded-2xl border border-cta/30"
            />
          )}
        </div>

        {/* Número visible pequeño */}
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs font-extrabold tracking-widest text-cta/60">
            {step.number}
          </span>
          <div className="h-px flex-1 bg-white/8" />
        </div>

        <h3 className="mb-3 font-display text-xl font-bold text-white leading-snug">
          {step.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-white/55">
          {step.desc}
        </p>

        {/* Detail pill */}
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40">
          {step.detail}
        </span>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="como-funciona" className="relative overflow-hidden bg-primary py-28">

      {/* Textura de fondo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cta/8 blur-[120px]" />
        <div className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-white/3 blur-[100px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-6 bg-cta" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cta">
                Cómo funciona
              </p>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
              Tu seguro ideal,<br />
              <span className="text-cta">en 3 pasos.</span>
            </h2>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/8 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15 md:self-auto"
          >
            Empezar ahora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} total={steps.length} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-20 flex flex-col items-center gap-4 rounded-2xl border border-white/8 bg-white/4 p-8 text-center backdrop-blur-sm md:flex-row md:justify-between md:text-left"
        >
          <div>
            <p className="text-lg font-bold text-white">
              ¿Listo para empezar?
            </p>
            <p className="text-sm text-white/50">
              Sin turnos, sin papeles. Solo escribinos y en menos de 24 hs tenés tu propuesta.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.716a.5.5 0 00.614.676l6.07-1.59A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.964-1.354l-.356-.211-3.695.969.984-3.595-.232-.37A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            Cotizar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}