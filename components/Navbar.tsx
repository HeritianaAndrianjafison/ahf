"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Hôtels membres", href: "#hotels" },
  { label: "À propos",       href: "#apropos" },
  { label: "Rejoindre",      href: "#rejoindre" },
  { label: "Contact",        href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-4"
        )}
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" aria-label="AHF Foulpointe — Accueil">
            <div className="rounded-xl overflow-hidden shrink-0"
              style={{ boxShadow: "0 2px 12px rgba(200,169,110,.25)" }}
            >
              <Image
                src="/logo ahf.jpeg"
                alt="Logo AHF"
                width={120}
                height={64}
                className="block h-10 w-auto"
              />
            </div>
            <div>
              <div className="text-white font-display font-bold text-[1rem] leading-none tracking-wide">
                AHF Foulpointe
              </div>
              <div className="text-[9px] tracking-[0.25em] uppercase mt-0.5" style={{ color: "var(--color-gold)" }}>
                Association Hôtelière
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-medium transition-colors duration-200 cursor-pointer"
                style={{ color: "rgba(255,255,255,.65)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold-l)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.65)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#rejoindre"
              className="hidden md:flex items-center font-bold text-sm px-5 rounded-full transition-all duration-200 cursor-pointer hover:opacity-90 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
                color: "#07120A",
                minHeight: "42px",
                boxShadow: "0 4px 20px rgba(200,169,110,.35)",
              }}
            >
              Devenir membre
            </a>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden transition-colors cursor-pointer flex items-center justify-center"
              style={{ minWidth: "44px", minHeight: "44px", color: "rgba(255,255,255,.70)" }}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div
            className="relative ml-auto w-72 h-full flex flex-col px-6 py-8 gap-6"
            style={{ background: "rgba(9,14,26,.98)", borderLeft: "1px solid rgba(200,169,110,.22)" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="self-end transition-colors cursor-pointer"
              style={{
                minWidth: "44px", minHeight: "44px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,.45)",
              }}
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-medium text-lg py-3 border-b transition-colors duration-200 cursor-pointer"
                  style={{ color: "rgba(255,255,255,.75)", borderColor: "rgba(200,169,110,.15)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="#rejoindre"
              onClick={() => setOpen(false)}
              className="mt-auto flex items-center justify-center font-bold text-sm rounded-full cursor-pointer"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
                color: "#07120A",
                minHeight: "48px",
                boxShadow: "0 4px 20px rgba(200,169,110,.35)",
              }}
            >
              Devenir membre
            </a>
          </div>
        </div>
      )}
    </>
  );
}
