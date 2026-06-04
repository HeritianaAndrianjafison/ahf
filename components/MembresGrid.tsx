"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Globe, MapPin, ArrowUpRight } from "lucide-react";
import type { HotelAHF } from "@/lib/api";
import HotelDrawer, { FacebookIcon } from "@/components/HotelDrawer";

interface Props {
  hotels: HotelAHF[];
}

function MemberCard({
  hotel,
  onSelect,
}: {
  hotel: HotelAHF;
  onSelect: (h: HotelAHF) => void;
}) {
  const cover = hotel.photoCouverture ?? hotel.photos[0] ?? null;

  return (
    <article
      onClick={() => onSelect(hotel)}
      className="glass-card rounded-2xl overflow-hidden group reveal cursor-pointer"
    >
      {/* Cover */}
      <div className="relative h-52 overflow-hidden" style={{ background: "#0D1D26" }}>
        {cover ? (
          <Image
            src={cover}
            alt={`${hotel.nom} — hôtel membre AHF Foulpointe`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0D1D26, #122432)" }}
          >
            <span
              className="font-display font-black"
              style={{ fontSize: "4rem", color: "rgba(200,169,110,.15)" }}
            >
              {hotel.nom.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(7,9,13,.95) 0%, rgba(7,9,13,.40) 55%, transparent 100%)",
          }}
        />

        {/* numeroAHF badge */}
        {hotel.numeroAHF && (
          <div
            className="absolute top-3 left-3 text-[15px] font-black tracking-wider uppercase px-3 py-1.5 rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
              color: "#07120A",
              boxShadow: "0 4px 16px rgba(200,169,110,.45)",
            }}
          >
            #{hotel.numeroAHF}
          </div>
        )}

        {/* Certifié AHF badge */}
        <div
          className="absolute top-3 right-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(7,9,13,.78)",
            color: "var(--color-gold-l)",
            border: "1px solid rgba(200,169,110,.32)",
          }}
        >
          Certifié AHF
        </div>

        {/* Name + address overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h3 className="font-display font-bold text-white text-base leading-snug line-clamp-1">
            {hotel.nom}
          </h3>
          {hotel.adresse && (
            <p
              className="flex items-center gap-1.5 mt-1 text-[11px] line-clamp-1"
              style={{ color: "rgba(255,255,255,.52)" }}
            >
              <MapPin className="w-3 h-3 shrink-0" style={{ color: "var(--color-gold)" }} />
              {hotel.adresse}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Gold divider */}
        <div
          className="h-px mb-4"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(200,169,110,.40) 40%, rgba(200,169,110,.22) 60%, transparent)",
          }}
        />

        {/* Description */}
        {hotel.description && hotel.description.trim().length > 0 && (
          <p
            className="text-[13px] leading-relaxed line-clamp-3 mb-4"
            style={{ color: "rgba(255,255,255,.50)", fontFamily: "var(--font-body)" }}
          >
            {hotel.description}
          </p>
        )}

        {/* Quick links */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {hotel.siteWeb && (
            <a
              href={hotel.siteWeb}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-opacity duration-200 hover:opacity-75 cursor-pointer"
              style={{
                background: "rgba(200,169,110,.12)",
                color: "var(--color-gold-l)",
                border: "1px solid rgba(200,169,110,.25)",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              Site web
            </a>
          )}
          {hotel.facebook && (
            <a
              href={hotel.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-opacity duration-200 hover:opacity-75 cursor-pointer"
              style={{
                background: "rgba(24,119,242,.12)",
                color: "#93C5FD",
                border: "1px solid rgba(24,119,242,.28)",
              }}
            >
              <FacebookIcon className="w-3.5 h-3.5" />
              Facebook
            </a>
          )}
          {hotel.telephone && (
            <a
              href={`tel:${hotel.telephone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-opacity duration-200 hover:opacity-75 cursor-pointer ml-auto"
              style={{
                color: "var(--color-cyan)",
                border: "1px solid rgba(103,232,249,.22)",
                background: "rgba(103,232,249,.07)",
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              Appeler
            </a>
          )}
        </div>

        {/* CTA */}
        <button
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer transition-all duration-200"
          style={{
            background: "rgba(200,169,110,.10)",
            border: "1px solid rgba(200,169,110,.22)",
            color: "var(--color-gold-l)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))";
            el.style.color = "#07120A";
            el.style.borderColor = "transparent";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(200,169,110,.10)";
            el.style.color = "var(--color-gold-l)";
            el.style.borderColor = "rgba(200,169,110,.22)";
          }}
        >
          Voir le profil
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function MembresGrid({ hotels }: Props) {
  const [selectedHotel, setSelectedHotel] = useState<HotelAHF | null>(null);

  const sorted = useMemo(
    () =>
      [...hotels].sort((a, b) => {
        if (!a.numeroAHF && !b.numeroAHF) return a.ordre - b.ordre;
        if (!a.numeroAHF) return 1;
        if (!b.numeroAHF) return -1;
        return a.numeroAHF.localeCompare(b.numeroAHF, undefined, { numeric: true });
      }),
    [hotels],
  );

  return (
    <main className="min-h-screen" style={{ background: "var(--color-night)" }}>
      <HotelDrawer hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: "#091B2F" }}
      >
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-20 left-1/3 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(200,169,110,.22) 0%, transparent 70%)",
              filter: "blur(72px)",
              opacity: 0.7,
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(14,165,233,.18) 0%, transparent 70%)",
              filter: "blur(56px)",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(200,169,110,.55) 35%, rgba(226,201,142,.45) 55%, rgba(200,169,110,.55) 75%, transparent 95%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-200 cursor-pointer group"
            style={{ color: "rgba(255,255,255,.42)" }}
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              style={{ color: "var(--color-gold)" }}
            />
            Retour à l'accueil
          </Link>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5 reveal">
            <div
              className="h-px w-12"
              style={{ background: "rgba(200,169,110,.50)" }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-gold)" }}
            >
              Association Hôtelière de Foulpointe
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display font-black text-white leading-tight mb-5 reveal"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            Nos{" "}
            <span style={{ color: "var(--color-gold-l)" }}>hôtels</span>
            <br />
            membres
          </h1>

          <p
            className="text-base leading-relaxed mb-8 max-w-xl reveal"
            style={{ color: "rgba(255,255,255,.52)", fontFamily: "var(--font-body)" }}
          >
            Découvrez les établissements certifiés de l'AHF — des hôtels engagés pour la
            qualité d'accueil et l'authenticité de la côte Est de Madagascar.
          </p>

          {/* Count badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold reveal"
            style={{
              background: "rgba(200,169,110,.10)",
              border: "1px solid rgba(200,169,110,.28)",
              color: "var(--color-gold-l)",
            }}
          >
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
                color: "#07120A",
              }}
            >
              {sorted.length}
            </span>
            hôtel{sorted.length > 1 ? "s" : ""} membre
            {sorted.length > 1 ? "s" : ""} certifié
            {sorted.length > 1 ? "s" : ""}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {sorted.length === 0 ? (
            <p
              className="text-center py-24 text-base"
              style={{ color: "rgba(255,255,255,.32)", fontFamily: "var(--font-body)" }}
            >
              Aucun membre actif pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sorted.map((hotel) => (
                <MemberCard key={hotel.id} hotel={hotel} onSelect={setSelectedHotel} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
