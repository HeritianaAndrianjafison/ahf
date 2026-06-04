import Image from "next/image";
import { MapPin, ChevronDown, Waves } from "lucide-react";

const HERO_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=85&auto=format&fit=crop";

interface HeroSectionProps {
  coverImage?: string;
}

export default function HeroSection({ coverImage }: HeroSectionProps) {
  const heroImage = coverImage || HERO_IMAGE_FALLBACK;
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Image
        src={heroImage}
        alt="Plage tropicale de Foulpointe, côte Est Madagascar"
        fill priority
        className="object-cover"
        style={{ filter: "brightness(0.58) saturate(1.3)" }}
        sizes="100vw"
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to bottom, rgba(7,15,24,.40) 0%, rgba(7,15,24,.18) 38%, rgba(7,15,24,.55) 80%, rgba(7,15,24,.98) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute z-[1] pointer-events-none"
        style={{
          top: "-10%", left: "-10%", width: "55%", height: "55%",
          background: "radial-gradient(circle, rgba(200,169,110,.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-px shimmer-bar z-10" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-5 md:px-10 pt-24">

        {/* Logo AHF */}
        <div className="hidden justify-center mb-7 au1">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              boxShadow: "0 16px 60px rgba(200,169,110,.40), 0 0 0 3px rgba(200,169,110,.35)",
            }}
          >
            <Image
              src="/logo-ahf.jpeg"
              alt="Logo AHF — Association Hôtelière de Foulpointe"
              width={400}
              height={215}
              className="block w-72 md:w-96 h-auto"
              priority
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 au2">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(200,169,110,.12)",
              border: "1px solid rgba(200,169,110,.35)",
              color: "var(--color-gold-l)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Waves className="w-3.5 h-3.5" aria-hidden="true" />
            Foulpointe · Côte Est · Madagascar
          </div>
        </div>

        {/* Titre */}
        <h1
          className="font-display font-black leading-[0.95] mb-6 au3"
          style={{
            fontSize: "clamp(2.8rem, 9vw, 8rem)",
            letterSpacing: "-0.03em",
            textShadow: "0 4px 32px rgba(0,0,0,.55)",
          }}
        >
          <span className="text-white">Association</span>
          <br />
          <span style={{ color: "var(--color-gold-l)" }}>Hôtelière</span>
          <br />
          <span className="text-white">de Foulpointe</span>
        </h1>

        {/* Sous-titre */}
        <p
          className="leading-relaxed max-w-2xl mx-auto mb-10 au4"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,.72)",
            textShadow: "0 2px 16px rgba(0,0,0,.45)",
          }}
        >
          Regroupant les meilleurs établissements hôteliers de Foulpointe,
          l'AHF garantit qualité, authenticité et excellence de l'accueil
          au cœur de la nature de la côte Est malgache.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 au5">
          <a
            href="#hotels"
            className="flex items-center gap-2 font-bold rounded-full px-8 transition-all duration-200 cursor-pointer hover:opacity-90 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
              color: "#07120A",
              minHeight: "52px",
              fontSize: "0.95rem",
              boxShadow: "0 8px 32px rgba(200,169,110,.40)",
            }}
          >
            Voir les hôtels membres
          </a>
          <a
            href="#rejoindre"
            className="flex items-center gap-2 font-semibold rounded-full px-8 transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(200,169,110,.10)",
              border: "1px solid rgba(200,169,110,.40)",
              backdropFilter: "blur(20px)",
              minHeight: "52px",
              fontSize: "0.95rem",
              color: "var(--color-gold-l)",
            }}
          >
            Rejoindre l'AHF
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto au6">
          {[
            { value: "AHF",  label: "Certifié" },
            { value: "100%", label: "Qualité garantie" },
            { value: "7j/7", label: "Disponible" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-black text-2xl md:text-3xl" style={{ color: "var(--color-gold)" }}>
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "rgba(255,255,255,.42)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Localisation */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
        style={{
          background: "rgba(7,15,24,.72)",
          border: "1px solid rgba(200,169,110,.22)",
          backdropFilter: "blur(16px)",
        }}
      >
        <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
        <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,.65)" }}>
          Mahavelona (Foulpointe) — 800m de la mer
        </span>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce-y z-10" aria-hidden="true">
        <ChevronDown className="w-5 h-5" style={{ color: "rgba(200,169,110,.45)" }} />
      </div>
    </section>
  );
}
