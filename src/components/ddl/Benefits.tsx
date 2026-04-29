import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { HeartHandshake, Zap, ShieldCheck, GitCompare } from "lucide-react";

const benefits = [
  {
    icon: GitCompare,
    number: "01",
    title: "Comparamos por vos",
    desc: "Analizamos las principales compañías del mercado y te presentamos la opción que mejor se adapta a tu necesidad y presupuesto. Sin sesgos, sin complicaciones.",
    accent: true,
  },
  {
    icon: Zap,
    number: "02",
    title: "Respuesta en menos de 24 hs",
    desc: "Tu cotización llega rápido. Sin formularios eternos ni esperas innecesarias.",
    accent: false,
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Cobertura exacta para tu caso",
    desc: "No vendemos pólizas genéricas. Cada propuesta está armada según lo que realmente necesitás cubrir.",
    accent: false,
  },
  {
    icon: HeartHandshake,
    number: "04",
    title: "Atención humana, siempre",
    desc: "Hablás con una persona real en cada paso. Antes, durante y después de contratar.",
    accent: false,
  },
];

function BenefitCard({ benefit, index }: { benefit: (typeof benefits)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
        benefit.accent
          ? "border-cta/30 bg-primary text-white"
          : "border-border bg-card hover:border-cta/30 hover:shadow-card"
      }`}
    >
      {/* Número decorativo de fondo */}
      <span
        className={`pointer-events-none absolute -right-3 -top-5 select-none font-extrabold leading-none transition-all duration-500 group-hover:scale-110 ${
          benefit.accent ? "text-[7rem] text-white/5" : "text-[7rem] text-primary/5"
        }`}
      >
        {benefit.number}
      </span>

      {/* Icono */}
      <div
        className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
          benefit.accent
            ? "bg-cta/20 text-cta"
            : "bg-primary/6 text-primary group-hover:bg-cta/10 group-hover:text-cta"
        }`}
      >
        <benefit.icon className="h-5 w-5" />
      </div>

      <h3
        className={`mb-3 font-display text-lg font-bold leading-snug ${
          benefit.accent ? "text-white" : "text-primary"
        }`}
      >
        {benefit.title}
      </h3>

      <p
        className={`text-sm leading-relaxed ${
          benefit.accent ? "text-white/65" : "text-muted-foreground"
        }`}
      >
        {benefit.desc}
      </p>

      {/* Línea de acento inferior en hover */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] w-0 bg-cta transition-all duration-500 group-hover:w-full ${
          benefit.accent ? "w-full" : ""
        }`}
      />
    </motion.div>
  );
}

export function Benefits() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="beneficios" className="bg-background py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-6 bg-cta" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cta">
                ¿Por qué DDL Seguros?
              </p>
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">
              Tranquilidad real,
              <br />
              <span className="text-cta">sin letra chica.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right">
            Trabajamos para que asegurar lo que importa sea simple, rápido y confiable.
          </p>
        </motion.div>

        {/* Grid asimétrico: 1 grande + 3 normales */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 — destacada, ocupa 2 columnas en lg */}
          <div className="lg:col-span-2">
            <BenefitCard benefit={benefits[0]} index={0} />
          </div>

          {/* Card 2 */}
          <BenefitCard benefit={benefits[1]} index={1} />

          {/* Card 3 */}
          <BenefitCard benefit={benefits[2]} index={2} />

          {/* Card 4 — span 2 en sm */}
          <div className="sm:col-span-1 lg:col-span-2">
            <BenefitCard benefit={benefits[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
