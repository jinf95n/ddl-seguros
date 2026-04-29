import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Car, Home, HeartPulse, Briefcase, ArrowRight, MessageCircle } from "lucide-react";
import carImg from "@/assets/insurance-car.png";
import homeImg from "@/assets/insurance-home.png";
import lifeImg from "@/assets/insurance-life.jpg";
import businessImg from "@/assets/insurance-business.jpg";

const WHATSAPP_BASE = "https://wa.me/5491136284033?text=Hola%20DDL%20Seguros%2C%20quiero%20cotizar%20un%20seguro%20de%20";

const items = [
  {
    icon: Car,
    title: "Automotor",
    subtitle: "Auto y Moto",
    desc: "Desde responsabilidad civil hasta todo riesgo. Comparamos entre las principales compañías para que pagues lo justo por la cobertura que realmente necesitás.",
    image: carImg,
    color: "#1a3a6e",
    wsp: WHATSAPP_BASE + "auto",
  },
  {
    icon: Home,
    title: "Hogar",
    subtitle: "Casa y Contenido",
    desc: "Protección para tu casa y todo lo que hay dentro. Incendio, robo, inundación y más. Planes flexibles adaptados a tu vivienda.",
    image: homeImg,
    color: "#0f2452",
    wsp: WHATSAPP_BASE + "hogar",
  },
  {
    icon: HeartPulse,
    title: "Vida",
    subtitle: "Individual y Familiar",
    desc: "Tranquilidad para los que más querés. Planes accesibles con coberturas reales, sin letra chica ni condiciones imposibles.",
    image: lifeImg,
    color: "#162d5c",
    wsp: WHATSAPP_BASE + "vida",
  },
  {
    icon: Briefcase,
    title: "Negocios",
    subtitle: "PyMEs y Comercios",
    desc: "Coberturas pensadas para que tu negocio no se detenga ante ningún imprevisto. ART, responsabilidad civil, incendio y más.",
    image: businessImg,
    color: "#1e3a5f",
    wsp: WHATSAPP_BASE + "negocio",
  },
];

export function InsuranceTypes() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const current = items[active];

  return (
    <section id="seguros" ref={ref} className="bg-background py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-6 bg-cta" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cta">
              Nuestros seguros
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">
              Coberturas para cada<br />
              <span className="text-cta">momento de tu vida.</span>
            </h2>
            <a
              href="#cotizar"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-cta"
            >
              ¿No sabés cuál necesitás? Te asesoramos
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Showcase layout */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid gap-4 lg:grid-cols-[1fr_320px]"
        >
          {/* Panel izquierdo — card activa grande */}
          <div className="relative overflow-hidden rounded-2xl bg-primary" style={{ minHeight: 420 }}>

            {/* Imagen con crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />

            {/* Contenido */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm">
                    <current.icon className="h-3.5 w-3.5 text-cta" />
                    <span className="text-xs font-semibold text-white/80">
                      {current.subtitle}
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-3xl font-extrabold text-white md:text-4xl">
                    Seguro de {current.title}
                  </h3>
                  <p className="mb-6 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                    {current.desc}
                  </p>
                  <a      
                    href={current.wsp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Cotizar {current.title}
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Panel derecho — lista de opciones */}
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <button
                key={item.title}
                onClick={() => setActive(i)}
                className={`group flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all duration-300 ${
                  active === i
                    ? "border-cta/40 bg-primary text-white shadow-lg"
                    : "border-border bg-card text-primary hover:border-cta/20 hover:bg-primary/4"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                    active === i
                      ? "bg-cta/20 text-cta"
                      : "bg-primary/8 text-primary group-hover:bg-cta/10 group-hover:text-cta"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-bold ${
                      active === i ? "text-white" : "text-primary"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p
                    className={`text-xs ${
                      active === i ? "text-white/50" : "text-muted-foreground"
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
                {active === i && (
                  <motion.div
                    layoutId="activeArrow"
                    className="shrink-0"
                  >
                    <ArrowRight className="h-4 w-4 text-cta" />
                  </motion.div>
                )}
              </button>
            ))}

            {/* Card CTA bottom */}
            <div className="mt-auto rounded-xl border border-cta/20 bg-cta/5 p-5">
              <p className="mb-1 text-sm font-bold text-primary">
                ¿Otro tipo de seguro?
              </p>
              <p className="mb-3 text-xs text-muted-foreground">
                Trabajamos con múltiples compañías y coberturas. Consultanos sin compromiso.
              </p>
              <a
                href="https://wa.me/5491136284033?text=Hola%20DDL%20Seguros%2C%20necesito%20asesoramiento"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-cta transition hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Consultá por WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Mobile fallback — pills para mobile */}
        <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
          {items.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                active === i
                  ? "border-cta bg-cta text-white"
                  : "border-border bg-card text-primary"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}