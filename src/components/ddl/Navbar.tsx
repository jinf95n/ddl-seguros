// ─── Navbar.tsx ──────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

const WHATSAPP_URL =
  "https://wa.me/5491136284033?text=Hola%20DDL%20Seguros%2C%20quiero%20una%20cotizaci%C3%B3n";

const NAV_LINKS = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Seguros", href: "#seguros" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Cotizar", href: "#cotizar" },
];

// Logo DDL — casa + candado en SVG inline
function DDLLogo() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center">
        <img src={logo} alt="DDL Seguros" className="h-7 w-7 object-contain" />
      </div>
      <div className="leading-tight">
        <p className="font-display text-base font-bold tracking-tight text-primary">DDL SEGUROS</p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Protección &amp; Confianza
        </p>
      </div>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menú al hacer click en un link
  const handleLink = () => setOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
          <DDLLogo />

          {/* Nav desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs desktop */}
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-cta/30 hover:text-cta"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="#cotizar"
              className="inline-flex items-center rounded-full bg-cta px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Cotizar ahora
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:bg-muted md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 border-b border-border bg-background/95 px-4 py-6 shadow-lg backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLink}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLink}
                className="flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold text-foreground transition hover:border-cta/30"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="#cotizar"
                onClick={handleLink}
                className="flex items-center justify-center rounded-full bg-cta py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Cotizar ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
