"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { MapPin, Phone, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { HotelAHF } from "@/lib/api";
import HotelDrawer, { FALLBACK } from "@/components/HotelDrawer";

/* ── constantes ─────────────────────────────────────────────────── */
const CARD_W   = 300;  // px
const CARD_GAP = 20;   // px
const MIN_LOOP = 8;    // nb min de cartes uniques pour un rendu sans vide
const PX_PER_S = 72;   // vitesse du ticker (pixels par seconde)

interface HotelsGridProps { hotels: HotelAHF[] }

/* ── Carte ───────────────────────────────────────────────────────── */
function HotelCard({ hotel, onSelect }: { hotel: HotelAHF; onSelect: (h: HotelAHF) => void }) {
  const cover = hotel.photoCouverture ?? FALLBACK;
  return (
    <article
      onClick={() => onSelect(hotel)}
      className="group relative flex flex-col overflow-hidden cursor-pointer select-none"
      style={{
        width: CARD_W,
        flexShrink: 0,
        borderRadius: 20,
        background: "rgba(10,22,38,.88)",
        border: "1px solid rgba(14,165,233,.18)",
        boxShadow: "0 8px 32px rgba(0,0,0,.30), inset 0 1px 0 rgba(14,165,233,.10)",
        backdropFilter: "blur(20px)",
        transition: "border-color .3s, box-shadow .35s, transform .35s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(14,165,233,.48)";
        el.style.boxShadow = "0 24px 64px rgba(0,0,0,.50), 0 0 40px rgba(14,165,233,.14), inset 0 1px 0 rgba(14,165,233,.24)";
        el.style.transform = "translateY(-8px) scale(1.01)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(14,165,233,.18)";
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,.30), inset 0 1px 0 rgba(14,165,233,.10)";
        el.style.transform = "translateY(0) scale(1)";
      }}
    >
      {/* Ligne or signature AHF */}
      <div className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,110,.55) 40%, rgba(226,201,142,.45) 60%, transparent)" }} />

      {/* Image */}
      <div className="relative overflow-hidden shrink-0" style={{ height: 190 }}>
        <Image
          src={cover}
          alt={`Photo de ${hotel.nom}`}
          fill
          className="object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          sizes="300px"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(7,15,24,.15) 0%, rgba(7,15,24,.08) 35%, rgba(7,15,24,.90) 100%)" }} />

        {/* Numéro AHF — haut gauche */}
        {hotel.numeroAHF && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-black tracking-widest uppercase"
            style={{ background: "rgba(9,21,39,.78)", border: "1px solid rgba(200,169,110,.40)", color: "rgba(200,169,110,.95)", backdropFilter: "blur(10px)" }}>
            {hotel.numeroAHF}
          </div>
        )}

        {/* Badge AHF — haut droit */}
        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase"
          style={{ background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))", color: "#07120A", boxShadow: "0 3px 12px rgba(200,169,110,.45)" }}>
          AHF
        </div>

        {/* Nom + adresse */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8">
          <h3 className="font-display font-black text-white leading-tight mb-1"
            style={{ fontSize: "1rem", letterSpacing: "-0.01em", textShadow: "0 2px 12px rgba(0,0,0,.70)" }}>
            {hotel.nom}
          </h3>
          {hotel.adresse && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 shrink-0" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
              <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,.58)" }}>{hotel.adresse}</span>
            </div>
          )}
        </div>
      </div>

      {/* Corps */}
      <div className="flex flex-col flex-1 px-4 py-3.5 gap-3">
        <p className="text-[12.5px] leading-relaxed line-clamp-2 flex-1"
          style={{ color: "rgba(255,255,255,.48)", fontFamily: "var(--font-body)" }}>
          {hotel.description}
        </p>

        {hotel.telephone && (
          <a href={`tel:${hotel.telephone.replace(/\s/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs font-semibold w-fit hover:opacity-70 cursor-pointer transition-opacity duration-200"
            style={{ color: "#5EEAD4" }}>
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            {hotel.telephone}
          </a>
        )}

        <div className="h-px" style={{ background: "rgba(14,165,233,.12)" }} />

        {/* CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(hotel); }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer"
          style={{ background: "rgba(14,165,233,.10)", border: "1px solid rgba(14,165,233,.22)", color: "#5EEAD4", transition: "background .2s, color .2s, border-color .2s" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "linear-gradient(135deg, var(--color-ocean-deep), var(--color-ocean))";
            el.style.color = "#fff";
            el.style.borderColor = "transparent";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(14,165,233,.10)";
            el.style.color = "#5EEAD4";
            el.style.borderColor = "rgba(14,165,233,.22)";
          }}
        >
          Découvrir
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

/* ── Carousel infini avec drag-to-scroll ────────────────────────── */
function Carousel({ hotels, onSelect }: { hotels: HotelAHF[]; onSelect: (h: HotelAHF) => void }) {
  const trackRef       = useRef<HTMLDivElement>(null);
  const posRef         = useRef(0);
  const hoverRef       = useRef(false);
  const resumeAfterRef = useRef<number>(0);
  const rafRef         = useRef<number>(0);
  const lastTimeRef    = useRef<number>(0);
  const nudgeRef       = useRef<{ from: number; to: number; start: number; dur: number } | null>(null);
  /* drag */
  const dragRef     = useRef<{ startX: number; startPos: number; lastX: number; velX: number } | null>(null);
  const velRef      = useRef(0);   // momentum px/ms
  const dragDistRef = useRef(0);   // distance totale draguée (pour bloquer les clics accidentels)
  const [grabbing, setGrabbing] = useState(false);

  const base = useMemo<HotelAHF[]>(() => {
    if (hotels.length === 0) return [];
    const copies = Math.ceil(MIN_LOOP / hotels.length);
    const arr: HotelAHF[] = [];
    for (let i = 0; i < copies; i++) arr.push(...hotels);
    return arr;
  }, [hotels]);

  const loop      = useMemo(() => [...base, ...base], [base]);
  const baseWidth = useMemo(() => base.length * (CARD_W + CARD_GAP), [base]);

  useEffect(() => {
    if (baseWidth === 0) return;
    posRef.current = 0;
    lastTimeRef.current = 0;

    const norm    = (p: number) => ((p % baseWidth) + baseWidth) % baseWidth;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (time: number) => {
      const dt = lastTimeRef.current ? Math.min(time - lastTimeRef.current, 50) : 0;
      lastTimeRef.current = time;

      if (nudgeRef.current) {
        const { from, to, start, dur } = nudgeRef.current;
        const t = Math.min((time - start) / dur, 1);
        posRef.current = from + (to - from) * easeOut(t);
        if (t >= 1) {
          posRef.current = norm(to);
          nudgeRef.current = null;
          resumeAfterRef.current = time + 1500;
        }
      } else if (dragRef.current) {
        posRef.current = norm(posRef.current); // normalise pendant le drag
      } else if (Math.abs(velRef.current) > 0.01) {
        /* momentum après relâchement */
        posRef.current = norm(posRef.current + velRef.current * dt);
        velRef.current *= Math.pow(0.95, dt / 16);
        if (Math.abs(velRef.current) < 0.01) velRef.current = 0;
      } else {
        /* défilement automatique */
        if (!hoverRef.current && time >= resumeAfterRef.current) {
          posRef.current += (PX_PER_S * dt) / 1000;
          if (posRef.current >= baseWidth) posRef.current -= baseWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseWidth]);

  const norm = useCallback((p: number) => ((p % baseWidth) + baseWidth) % baseWidth, [baseWidth]);

  const nudge = useCallback((dir: "left" | "right") => {
    velRef.current = 0;
    const step = (CARD_W + CARD_GAP) * (dir === "right" ? 1 : -1);
    let from = posRef.current;
    let to   = from + step;
    if (to < 0) { from += baseWidth; to += baseWidth; posRef.current = from; }
    nudgeRef.current = { from, to, start: performance.now(), dur: 450 };
  }, [baseWidth]);

  const startDrag = useCallback((clientX: number) => {
    velRef.current  = 0;
    nudgeRef.current = null;
    dragDistRef.current = 0;
    dragRef.current = { startX: clientX, startPos: posRef.current, lastX: clientX, velX: 0 };
    hoverRef.current = true;
    setGrabbing(true);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!dragRef.current) return;
    const dx = clientX - dragRef.current.lastX;
    dragRef.current.velX = dx;
    dragRef.current.lastX = clientX;
    dragDistRef.current += Math.abs(dx);
    posRef.current = norm(dragRef.current.startPos - (clientX - dragRef.current.startX));
  }, [norm]);

  const endDrag = useCallback(() => {
    if (!dragRef.current) return;
    velRef.current = -dragRef.current.velX / 16; // momentum initial
    dragRef.current = null;
    hoverRef.current = false;
    setGrabbing(false);
    resumeAfterRef.current = performance.now() + 2000;
    setTimeout(() => { dragDistRef.current = 0; }, 150);
  }, []);

  /* Filtre les clics parasites après un vrai drag */
  const handleSelect = useCallback((hotel: HotelAHF) => {
    if (dragDistRef.current > 8) return;
    onSelect(hotel);
  }, [onSelect]);

  if (loop.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden"
      style={{ cursor: grabbing ? "grabbing" : "grab", userSelect: "none" }}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; endDrag(); }}
      onMouseDown={(e) => { if (e.button === 0) { e.preventDefault(); startDrag(e.clientX); } }}
      onMouseMove={(e) => { if (dragRef.current) moveDrag(e.clientX); }}
      onMouseUp={() => endDrag()}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
      onTouchEnd={() => endDrag()}
    >
      {/* Fondu bords */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0E2844 0%, transparent 100%)" }} aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0E2844 0%, transparent 100%)" }} aria-hidden="true" />

      {/* Flèche gauche */}
      <button
        onClick={() => nudge("left")} aria-label="Précédent"
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute left-4 top-1/2 z-20 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
        style={{ width: 44, height: 44, marginTop: -22, background: "rgba(200,169,110,.15)", border: "1px solid rgba(200,169,110,.35)", color: "var(--color-gold-l)", backdropFilter: "blur(12px)", boxShadow: "0 4px 20px rgba(0,0,0,.35)" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))"; el.style.color = "#07120A"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(200,169,110,.15)"; el.style.color = "var(--color-gold-l)"; }}>
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Track infini */}
      <div
        ref={trackRef}
        className="flex py-6"
        style={{ gap: CARD_GAP, paddingInline: CARD_GAP, willChange: "transform" } as React.CSSProperties}
      >
        {loop.map((hotel, i) => (
          <HotelCard key={`${hotel.id}-${i}`} hotel={hotel} onSelect={handleSelect} />
        ))}
      </div>

      {/* Flèche droite */}
      <button
        onClick={() => nudge("right")} aria-label="Suivant"
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute right-4 top-1/2 z-20 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
        style={{ width: 44, height: 44, marginTop: -22, background: "rgba(200,169,110,.15)", border: "1px solid rgba(200,169,110,.35)", color: "var(--color-gold-l)", backdropFilter: "blur(12px)", boxShadow: "0 4px 20px rgba(0,0,0,.35)" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))"; el.style.color = "#07120A"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(200,169,110,.15)"; el.style.color = "var(--color-gold-l)"; }}>
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Barre décorative */}
      <div className="mx-auto mt-1 w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(200,169,110,.12)" }}>
        <div className="h-full rounded-full" style={{ width: "40%", background: "linear-gradient(90deg, var(--color-gold-d), var(--color-gold))", boxShadow: "0 0 6px rgba(200,169,110,.50)" }} />
      </div>
    </div>
  );
}

/* ── Carte membre accordion ──────────────────────────────────────── */
function MemberCard({
  hotel, cover, thumb, isActive, onActivate, onViewProfile, reduceMotion, isMobile,
}: {
  hotel: HotelAHF;
  cover: string;
  thumb: string;
  isActive: boolean;
  onActivate: () => void;
  onViewProfile: () => void;
  reduceMotion: boolean;
  isMobile: boolean;
}) {
  const raw  = hotel.description ?? hotel.adresse ?? "Hôtel membre certifié AHF · Foulpointe";
  const desc = raw.length > (isMobile ? 80 : 110) ? raw.slice(0, isMobile ? 80 : 110) + "…" : raw;

  const activeWidth = isMobile ? "calc(100vw - 2.5rem)" : "30rem";
  const inactiveWidth = isMobile ? "3.5rem" : "5rem";

  const cardTransition = reduceMotion ? "none"
    : "flex-basis 0.55s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.55s ease";

  const imgTransition = reduceMotion ? "none"
    : "filter 0.35s, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)";

  return (
    <article
      onClick={onActivate}
      onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) onActivate(); }}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(); } }}
      aria-label={hotel.nom}
      aria-pressed={isActive}
      className="focus-visible:outline-none"
      style={{
        position: "relative",
        flexShrink: 0,
        flexBasis: isActive ? activeWidth : inactiveWidth,
        height: "26rem",
        borderRadius: "1.1rem",
        overflow: "hidden",
        cursor: "pointer",
        transition: cardTransition,
        transform: isActive ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isActive
          ? "0 24px 64px rgba(0,0,0,.62), 0 0 0 1px rgba(200,169,110,.42), 0 0 56px rgba(200,169,110,.08)"
          : "0 4px 20px rgba(0,0,0,.28), 0 0 0 1px rgba(200,169,110,.13)",
      }}
    >
      {/* Ligne shimmer dorée — active uniquement */}
      {isActive && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: "6%", right: "6%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(200,169,110,.72) 35%, rgba(226,201,142,.60) 65%, transparent)",
            zIndex: 4,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Image de fond */}
      <Image
        src={cover}
        alt={`Couverture ${hotel.nom}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 480px"
        style={{
          filter: isActive ? "brightness(0.80) saturate(110%)" : "brightness(0.55) saturate(60%)",
          transform: isActive ? "scale(1.05)" : "scale(1)",
          transition: imgTransition,
        }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: isActive
            ? "linear-gradient(135deg, rgba(0,0,0,.12) 0%, rgba(0,0,0,.05) 40%, rgba(0,0,0,.78) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,.10) 0%, rgba(0,0,0,.88) 100%)",
        }}
      />

      {/* Contenu */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: isActive && !isMobile ? "row" : "column",
          alignItems: isActive && isMobile ? "flex-start" : "center",
          justifyContent: isActive && isMobile ? "flex-start" : "center",
          padding: isActive ? (isMobile ? "1rem 1.25rem" : "1.25rem 1.75rem") : "0",
          gap: isActive ? (isMobile ? "0.55rem" : "1.25rem") : "0.7rem",
          overflow: "hidden",
        }}
      >
        {/* Thumbnail portrait — active + desktop seulement */}
        {isActive && !isMobile && (
          <div style={{
            position: "relative",
            flexShrink: 0,
            width: 120,
            height: 248,
            borderRadius: "0.65rem",
            overflow: "hidden",
            boxShadow: "0 8px 28px rgba(0,0,0,.55), 0 0 0 1px rgba(200,169,110,.28)",
          }}>
            <Image src={thumb} alt={`Photo ${hotel.nom}`} fill className="object-cover" sizes="120px" />
          </div>
        )}

        {/* Panneau droite : badge + titre + adresse + desc + bouton */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", flex: isActive ? 1 : "unset", minWidth: 0 }}>

          {/* Badge numéro AHF — active seulement */}
          {isActive && hotel.numeroAHF && (
            <div style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              padding: "0.18rem 0.68rem",
              borderRadius: "9999px",
              background: "rgba(7,9,13,.82)",
              border: "1px solid rgba(200,169,110,.40)",
              color: "rgba(200,169,110,.92)",
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
            }}>
              {hotel.numeroAHF}
            </div>
          )}

          {/* Titre — vertical si inactif, horizontal si actif */}
          <h3
            className="font-display"
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: isActive ? (isMobile ? "1.5rem" : "2.1rem") : "1.25rem",
              writingMode: isActive ? "horizontal-tb" : "vertical-rl",
              transform: isActive ? "none" : "rotate(180deg)",
              letterSpacing: isActive ? "-0.025em" : "0.04em",
              whiteSpace: isActive ? "normal" : "nowrap",
              lineHeight: 1.1,
              textShadow: "0 2px 12px rgba(0,0,0,.65)",
            }}
          >
            {hotel.nom}
          </h3>

          {/* Contenu étendu — active seulement */}
          {isActive && (
            <>
              {hotel.adresse && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  color: "rgba(200,169,110,.72)",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-body)",
                }}>
                  <MapPin style={{ width: 12, height: 12, flexShrink: 0 }} aria-hidden="true" />
                  {hotel.adresse}
                </div>
              )}

              <p style={{
                color: "rgba(255,255,255,.75)",
                fontSize: isMobile ? "0.82rem" : "0.92rem",
                lineHeight: 1.5,
                maxWidth: isMobile ? "100%" : "17rem",
                fontFamily: "var(--font-body)",
              }}>
                {desc}
              </p>

              <button
                onClick={(e) => { e.stopPropagation(); onViewProfile(); }}
                style={{
                  marginTop: "0.2rem",
                  padding: "0.52rem 1.3rem",
                  border: "none",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
                  color: "#07120A",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "fit-content",
                  boxShadow: "0 4px 18px rgba(200,169,110,.38)",
                  transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--color-gold-l)";
                  el.style.boxShadow = "0 6px 24px rgba(200,169,110,.55)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))";
                  el.style.boxShadow = "0 4px 18px rgba(200,169,110,.38)";
                  el.style.transform = "translateY(0)";
                }}
              >
                Voir le profil
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Slider membres actifs (accordion) ──────────────────────────── */
function MembersSlider({ hotels, onSelect }: { hotels: HotelAHF[]; onSelect: (h: HotelAHF) => void }) {
  const [activeIdx,   setActiveIdx]   = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const outerRef   = useRef<HTMLDivElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });

  /* prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  /* Détection mobile */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  /* Centre la carte active */
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const track = outer.firstElementChild as HTMLElement;
    if (!track) return;
    const card = track.children[activeIdx] as HTMLElement;
    if (!card) return;
    const left = card.offsetLeft - (outer.clientWidth / 2 - card.clientWidth / 2);
    outer.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeIdx, reduceMotion]);

  /* Navigation clavier */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveIdx(p => Math.min(p + 1, hotels.length - 1));
      if (e.key === "ArrowLeft")  setActiveIdx(p => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", fn, { passive: true });
    return () => window.removeEventListener("keydown", fn);
  }, [hotels.length]);

  if (hotels.length === 0) return null;

  const isFirst = activeIdx === 0;
  const isLast  = activeIdx === hotels.length - 1;

  const navBtnBase: React.CSSProperties = {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    border: "1px solid rgba(200,169,110,.28)",
    background: "rgba(200,169,110,.10)",
    color: "var(--color-gold-l)",
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.25s, border-color 0.25s, color 0.25s, opacity 0.25s",
    backdropFilter: "blur(8px)",
  };

  return (
    <section style={{ background: "#07090d", position: "relative", overflow: "hidden" }}>

      {/* Glows de fond */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 42% at 50% 0%, rgba(200,169,110,.055) 0%, transparent 65%)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        pointerEvents: "none", width: "55%", height: "180px",
        background: "radial-gradient(ellipse, rgba(200,169,110,.042) 0%, transparent 70%)",
      }} />

      {/* Ligne dorée de séparation en haut */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent, rgba(200,169,110,.32) 30%, rgba(226,201,142,.25) 70%, transparent)",
      }} />

      {/* ── En-tête ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 reveal" style={{ paddingTop: "4.5rem", paddingBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: "rgba(200,169,110,.45)" }} aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
                Membres actifs
              </span>
            </div>
            <h2
              className="font-display font-black text-white"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.6rem)", lineHeight: 1.12, letterSpacing: "-0.022em" }}
            >
              Nos établissements<br />
              <span style={{ color: "var(--color-gold-l)" }}>certifiés AHF</span>
            </h2>
          </div>

          {/* Compteur + boutons */}
          <div className="flex items-center gap-3 shrink-0">
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,.22)", fontVariantNumeric: "tabular-nums" }}>
              {activeIdx + 1} / {hotels.length}
            </span>
            <div className="flex gap-2">
              <button
                aria-label="Hôtel précédent"
                disabled={isFirst}
                onClick={() => setActiveIdx(p => Math.max(p - 1, 0))}
                style={{ ...navBtnBase, cursor: isFirst ? "default" : "pointer", opacity: isFirst ? 0.28 : 1 }}
                onMouseEnter={(e) => {
                  if (!isFirst) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))";
                    el.style.color = "#07120A";
                    el.style.borderColor = "transparent";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(200,169,110,.10)";
                  el.style.color = "var(--color-gold-l)";
                  el.style.borderColor = "rgba(200,169,110,.28)";
                }}
              >‹</button>

              <button
                aria-label="Hôtel suivant"
                disabled={isLast}
                onClick={() => setActiveIdx(p => Math.min(p + 1, hotels.length - 1))}
                style={{ ...navBtnBase, cursor: isLast ? "default" : "pointer", opacity: isLast ? 0.28 : 1 }}
                onMouseEnter={(e) => {
                  if (!isLast) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))";
                    el.style.color = "#07120A";
                    el.style.borderColor = "transparent";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(200,169,110,.10)";
                  el.style.color = "var(--color-gold-l)";
                  el.style.borderColor = "rgba(200,169,110,.28)";
                }}
              >›</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Track accordion ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto overflow-hidden" ref={outerRef}>
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingBottom: "3rem",
            paddingInline: "1.25rem",
          }}
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            const dy = e.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
              setActiveIdx(p => dx > 0 ? Math.max(p - 1, 0) : Math.min(p + 1, hotels.length - 1));
            }
          }}
        >
          {hotels.map((hotel, i) => (
            <MemberCard
              key={hotel.id}
              hotel={hotel}
              cover={hotel.photoCouverture ?? FALLBACK}
              thumb={hotel.photos[1] ?? hotel.photos[0] ?? hotel.photoCouverture ?? FALLBACK}
              isActive={i === activeIdx}
              onActivate={() => setActiveIdx(i)}
              onViewProfile={() => onSelect(hotel)}
              reduceMotion={reduceMotion}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* ── Dots pill ────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: "0.45rem", justifyContent: "center", paddingBottom: "3.5rem" }}>
        {hotels.map((h, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Aller à ${h.nom}`}
            style={{
              height: 7,
              width: i === activeIdx ? 28 : 7,
              borderRadius: "9999px",
              border: i === activeIdx ? "none" : "1px solid rgba(200,169,110,.20)",
              cursor: "pointer",
              background: i === activeIdx
                ? "linear-gradient(90deg, var(--color-gold-d), var(--color-gold))"
                : "rgba(255,255,255,.14)",
              boxShadow: i === activeIdx ? "0 0 10px rgba(200,169,110,.45)" : "none",
              transition: reduceMotion ? "none" : "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Section principale ──────────────────────────────────────────── */
export default function HotelsGrid({ hotels }: HotelsGridProps) {
  const [selectedHotel, setSelectedHotel] = useState<HotelAHF | null>(null);

  const sorted = useMemo(() =>
    [...hotels].sort((a, b) => {
      if (!a.numeroAHF && !b.numeroAHF) return a.ordre - b.ordre;
      if (!a.numeroAHF) return 1;
      if (!b.numeroAHF) return -1;
      return a.numeroAHF.localeCompare(b.numeroAHF, undefined, { numeric: true });
    }),
  [hotels]);

  /* Membres "complets" : ≥ 2 photos + description non vide + Facebook ou site web */
  const featured = useMemo(() =>
    sorted.filter(h =>
      h.photos.length >= 2 &&
      h.description.trim().length > 0 &&
      (h.facebook || h.siteWeb),
    ),
  [sorted]);

  return (
    <>
      <HotelDrawer hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />

      <section id="hotels" className="py-24 relative overflow-hidden" style={{ background: "#0E2844" }}>

        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(14,165,233,.09) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true"
          style={{ width: "60%", height: "250px", background: "radial-gradient(ellipse, rgba(200,169,110,.07) 0%, transparent 70%)" }} />

        <div className="relative z-10">

          {/* En-tête centré */}
          <div className="text-center mb-10 px-5 md:px-10" style={{ animation: "fadeUp .7s ease both" }}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12" style={{ background: "rgba(200,169,110,.40)" }} aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
                Hôtels membres
              </span>
              <div className="h-px w-12" style={{ background: "rgba(200,169,110,.40)" }} aria-hidden="true" />
            </div>

            <h2 className="font-display font-black text-white leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em", animation: "fadeUp .7s ease .12s both" }}>
              Nos établissements<br />
              <span style={{ color: "var(--color-gold-l)" }}>de qualité</span>
            </h2>

            <p className="max-w-xl mx-auto leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,.42)", animation: "fadeUp .7s ease .22s both" }}>
              Chaque hôtel membre a été sélectionné pour la qualité de ses services,
              son accueil chaleureux et son ancrage dans la nature malgache.
            </p>

            {hotels.length > 0 && (
              <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-wider"
                style={{ background: "rgba(200,169,110,.10)", border: "1px solid rgba(200,169,110,.28)", color: "var(--color-gold)", animation: "fadeUp .7s ease .32s both" }}>
                {hotels.length} établissement{hotels.length > 1 ? "s" : ""} certifiés AHF
              </span>
            )}
          </div>

          {/* Carousel ou état vide */}
          {sorted.length === 0 ? (
            <div className="text-center py-16 px-5" style={{ animation: "fadeUp .6s ease both" }}>
              <div className="inline-flex flex-col items-center gap-4 px-8 py-10 rounded-3xl"
                style={{ background: "rgba(200,169,110,.06)", border: "1px solid rgba(200,169,110,.12)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(200,169,110,.12)" }}>
                  <MapPin className="w-7 h-7" style={{ color: "var(--color-gold)" }} />
                </div>
                <p className="text-white/60 font-semibold">Aucun hôtel disponible</p>
                <p className="text-white/30 text-sm">Les hôtels membres apparaîtront ici prochainement.</p>
              </div>
            </div>
          ) : (
            <div style={{ animation: "fadeUp .7s ease .4s both" }}>
              <Carousel hotels={sorted} onSelect={setSelectedHotel} />
              <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,.20)" }}>
                Survolez ou utilisez les flèches pour naviguer · Cliquez pour voir les détails
              </p>
            </div>
          )}
        </div>
      </section>

      <MembersSlider hotels={featured} onSelect={setSelectedHotel} />
    </>
  );
}
