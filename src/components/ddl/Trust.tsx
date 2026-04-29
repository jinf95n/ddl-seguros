import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Clock, MapPin } from "lucide-react";

const STATS = [
  { value: "+20", label: "Compañías\ncomparadas", icon: Building2 },
  { value: "24hs", label: "Tiempo de\nrespuesta", icon: Clock },
  { value: "100%", label: "Cobertura\nnacional", icon: MapPin },
];

const LOGOS_PLACEHOLDER = [
  "Sancor Seguros",
  "Zurich",
  "San Cristóbal",
  "Federación Patronal",
  "La Caja",
  "Provincia Seguros",
];

function StatCard({ stat, index, inView }: { stat: typeof STATS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cta/15 text-cta">
        <stat.icon className="h-5 w-5" />
      </div>
      <span className="font-display text-3xl font-extrabold text-cta">
        {stat.value}
      </span>
      <span className="mt-1 whitespace-pre-line text-center text-xs leading-tight text-white/50">
        {stat.label}
      </span>
    </motion.div>
  );
}

export function Trust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden bg-primary py-24">

      {/* Textura */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div ref={ref} className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Columna izquierda — copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-6 bg-cta" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cta">
                Por qué elegirnos
              </p>
            </div>

            <h2 className="mb-6 font-display text-3xl font-extrabold text-white md:text-4xl">
              No somos una aseguradora.<br />
              <span className="text-cta">Trabajamos para vos.</span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-white/55">
              <p>
                En DDL Seguros actuamos como intermediarios independientes: comparamos
                entre las principales compañías del mercado argentino para encontrar
                la cobertura que mejor se adapta a tu necesidad y presupuesto.
              </p>
              <p>
                No tenemos vínculo exclusivo con ninguna aseguradora. Eso nos da
                libertad para recomendarte siempre la mejor opción — no la más
                conveniente para nosotros.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <StatCard key={stat.value} stat={stat} index={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* Columna derecha — logos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-white/35">
              Compañías con las que trabajamos
            </p>

            <div className="grid grid-cols-3 gap-3">
              {LOGOS_PLACEHOLDER.map((nombre, i) => (
                <motion.div
                  key={nombre}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center transition hover:border-cta/30 hover:bg-white/8"
                >
                  {/*
                    REEMPLAZAR POR:
                    <img
                      src={logoSancor}
                      alt={nombre}
                      className="h-8 w-auto object-contain opacity-60 brightness-0 invert transition hover:opacity-100"
                    />
                  */}
                  <span className="text-xs font-semibold text-white/50">
                    {nombre}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-xs text-white/25">
              * Trabajamos con múltiples compañías. La disponibilidad varía según el tipo de cobertura y zona.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}