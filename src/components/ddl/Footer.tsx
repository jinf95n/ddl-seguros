// ─── Footer.tsx ──────────────────────────────────────────────────────────────

import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import logo from "../../assets/logo.png";
const WHATSAPP_URL = "https://wa.me/5491136284033";

const NAV_LINKS = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Tipos de seguros", href: "#seguros" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Cotizar", href: "#cotizar" },
];

const CONTACT_ITEMS = [
  { icon: Phone, label: "+54 9 11 3628-4033", href: "tel:+5491136284033" },
  { icon: MessageCircle, label: "WhatsApp directo", href: WHATSAPP_URL, external: true },
  { icon: Mail, label: "contacto@ddlseguros.com.ar", href: "mailto:contacto@ddlseguros.com.ar" },
  { icon: MapPin, label: "Buenos Aires, Argentina", href: undefined },
];

// Logo inline igual que el Navbar
function DDLLogoFooter() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
        <img src={logo} alt="DDL Seguros" className="h-7 w-7 object-contain brightness-0 invert" />
      </div>
      <div className="leading-tight">
        <p className="font-display text-base font-bold tracking-tight text-white">DDL SEGUROS</p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
          Protección &amp; Confianza
        </p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Cuerpo */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Columna marca */}
          <div>
            <DDLLogoFooter />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Comparamos entre las principales compañías del mercado argentino para encontrar la
              cobertura ideal para cada caso. Sin letra chica.
            </p>

            {/* WhatsApp destacado */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              Escribir por WhatsApp
            </a>
          </div>

          {/* Columna contacto */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
              Contacto
            </p>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, href, external }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 text-sm text-white/60 transition hover:text-cta"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-cta" />
                      {label}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <Icon className="h-4 w-4 shrink-0 text-cta" />
                      {label}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna navegación */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
              Navegación
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 transition hover:text-cta">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/30 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} DDL Seguros. Todos los derechos reservados.</p>
          <p>Productor Asesor de Seguros matriculado · SSN · Información sujeta a evaluación.</p>
        </div>
      </div>
    </footer>
  );
}
