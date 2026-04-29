import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, ArrowRight, Clock } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5491136284033?text=Hola%20DDL%20Seguros%2C%20necesito%20asesoramiento";

export function WhatsAppCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary py-24 border-b border-white/20">

    

      <div className="relative mx-auto w-full max-w-5xl px-4 md:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Badge de disponibilidad */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-sm"
          >
            {/* Punto verde pulsante */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
            </span>
            <span className="text-xs font-semibold text-white/70">
              Respondemos en minutos
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mb-4 font-display text-3xl font-extrabold text-white md:text-5xl"
          >
            ¿Tenés dudas?<br />
            <span className="text-cta">Hablemos ahora.</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-lg text-base text-white/55 md:text-lg"
          >
            Sin formularios, sin esperas. Escribinos y un asesor real
            te ayuda a encontrar la cobertura ideal para tu caso.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            {/* WhatsApp — principal */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              Escribir por WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Cotizador — secundario */}
            <a
              href="#cotizar"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Usar el cotizador
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/35"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Sin esperas · respuesta inmediata
            </div>
            <div className="h-3 w-px bg-white/15" />
            <span>Sin compromiso</span>
            <div className="h-3 w-px bg-white/15" />
            <span>Cotización 100% gratuita</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}