"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  MapPin, Phone, Mail, Globe, X, ArrowUpRight,
  ChevronLeft, ChevronRight, Maximize2,
} from "lucide-react";
import type { HotelAHF } from "@/lib/api";

export const FALLBACK =
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&auto=format&fit=crop";

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/* ── Lightbox photos ───────────────────────────────────────────────── */
function PhotoLightbox({
  photos,
  index,
  onClose,
}: {
  photos: string[];
  index: number | null;
  onClose: () => void;
}) {
  const [mounted, setMounted]     = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX               = useRef<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (index !== null) setActiveIdx(index);
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") setActiveIdx(i => (i + 1) % photos.length);
      if (e.key === "ArrowLeft")  setActiveIdx(i => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [index, photos.length, onClose]);

  if (!mounted) return null;

  const open = index !== null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse de photos"
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-5 px-4"
      style={{
        background: "rgba(0,0,0,0.93)",
        backdropFilter: "blur(28px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.22s ease",
      }}
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || photos.length < 2) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50)
          setActiveIdx(i => diff < 0 ? (i + 1) % photos.length : (i - 1 + photos.length) % photos.length);
        touchStartX.current = null;
      }}
    >
      <div
        key={activeIdx}
        className="relative rounded-2xl overflow-hidden"
        style={{
          maxWidth: "min(88vw, 860px)",
          boxShadow: "0 40px 120px rgba(0,0,0,.85), 0 0 0 1px rgba(200,169,110,.15)",
          animation: open ? "photoIn 0.30s cubic-bezier(0.22,1,0.36,1) both" : "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[activeIdx] ?? ""}
          alt={`Photo ${activeIdx + 1} sur ${photos.length}`}
          width={860}
          height={600}
          className="block max-w-full"
          style={{ maxHeight: "72vh", width: "auto", height: "auto", objectFit: "contain" }}
          sizes="(max-width: 900px) 88vw, 860px"
        />
        <button onClick={onClose} aria-label="Fermer la visionneuse"
          className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-150 hover:scale-110"
          style={{ width: 40, height: 40, background: "rgba(0,0,0,.72)", border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.88)", backdropFilter: "blur(8px)" }}>
          <X className="w-4 h-4" />
        </button>
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx(i => (i - 1 + photos.length) % photos.length); }}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-150 hover:scale-110"
              style={{ width: 40, height: 40, background: "rgba(0,0,0,.55)", border: "1px solid rgba(255,255,255,.14)", color: "rgba(255,255,255,.80)", backdropFilter: "blur(8px)" }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveIdx(i => (i + 1) % photos.length); }}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-150 hover:scale-110"
              style={{ width: 40, height: 40, background: "rgba(0,0,0,.55)", border: "1px solid rgba(255,255,255,.14)", color: "rgba(255,255,255,.80)", backdropFilter: "blur(8px)" }}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <p className="text-[11px] font-bold tracking-widest" style={{ color: "rgba(255,255,255,.35)" }}>
            {activeIdx + 1} / {photos.length}
          </p>
          <div className="flex items-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Photo ${i + 1}`}
                className="rounded-full cursor-pointer transition-all duration-200"
                style={{
                  width: i === activeIdx ? 24 : 7,
                  height: 7,
                  background: i === activeIdx ? "var(--color-gold)" : "rgba(255,255,255,.22)",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}

/* ── Drawer détail ─────────────────────────────────────────────────── */
export default function HotelDrawer({
  hotel,
  onClose,
}: {
  hotel: HotelAHF | null;
  onClose: () => void;
}) {
  const open = hotel !== null;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { if (!open) setLightboxIdx(null); }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape" && lightboxIdx === null) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, lightboxIdx]);

  return (
    <>
      <PhotoLightbox
        photos={hotel?.photos ?? []}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
      />

      <div
        className="fixed inset-0 z-[200]"
        style={{
          background: "rgba(0,0,0,.75)",
          backdropFilter: "blur(8px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s ease",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed top-0 right-0 h-full z-[201] flex flex-col overflow-y-auto"
        style={{
          width: "min(500px, 100vw)",
          background: "#091527",
          borderLeft: "1px solid rgba(200,169,110,.22)",
          boxShadow: "-40px 0 100px rgba(0,0,0,.60)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .38s cubic-bezier(0.22,1,0.36,1)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={hotel?.nom ?? "Détails hôtel"}
      >
        {hotel && (
          <>
            <div className="relative h-64 shrink-0">
              <Image
                src={hotel.photoCouverture ?? FALLBACK}
                alt={`Photo de ${hotel.nom}`}
                fill
                className="object-cover"
                sizes="500px"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(9,21,39,.55) 0%, rgba(9,21,39,.18) 42%, rgba(9,21,39,.85) 100%)" }}
              />
              <div
                className="absolute top-4 left-5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase"
                style={{
                  background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
                  color: "#07120A",
                  boxShadow: "0 4px 16px rgba(200,169,110,.40)",
                }}
              >
                Membre AHF
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="absolute top-4 right-4 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  width: 40, height: 40,
                  background: "rgba(9,21,39,.80)",
                  border: "1px solid rgba(200,169,110,.30)",
                  color: "rgba(255,255,255,.80)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-6 p-6 flex-1">
              <div>
                {hotel.numeroAHF && (
                  <div
                    className="text-[10px] font-black tracking-[0.25em] uppercase mb-1.5"
                    style={{ color: "rgba(200,169,110,.60)" }}
                  >
                    Membre {hotel.numeroAHF}
                  </div>
                )}
                <h2
                  className="font-display font-black text-white text-2xl mb-2 leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {hotel.nom}
                </h2>
                {hotel.adresse && (
                  <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,.45)" }}>
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                    {hotel.adresse}
                  </div>
                )}
              </div>

              <div className="h-px" style={{ background: "rgba(200,169,110,.15)" }} />

              <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,.62)", fontFamily: "var(--font-body)" }}>
                {hotel.description}
              </p>

              {hotel.photos.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "var(--color-gold)" }}>
                    Photos
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {hotel.photos.slice(0, 6).map((url, i) => (
                      <div
                        key={i}
                        onClick={() => setLightboxIdx(i)}
                        className="group relative h-20 rounded-xl overflow-hidden cursor-pointer"
                        style={{ transition: "transform .22s ease, box-shadow .22s ease" }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "scale(1.05)";
                          el.style.boxShadow = "0 8px 24px rgba(0,0,0,.50)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "scale(1)";
                          el.style.boxShadow = "none";
                        }}
                      >
                        <Image
                          src={url}
                          alt={`Photo ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="150px"
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: "rgba(0,0,0,0.40)" }}
                        >
                          <Maximize2 className="w-5 h-5 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: "var(--color-gold)" }}>
                  Contact
                </p>
                <div className="flex flex-col gap-2.5">
                  {hotel.telephone && (
                    <a
                      href={`tel:${hotel.telephone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-200"
                      style={{ background: "rgba(14,165,233,.08)", border: "1px solid rgba(14,165,233,.20)" }}
                    >
                      <Phone className="w-4 h-4 shrink-0" style={{ color: "#5EEAD4" }} aria-hidden="true" />
                      <span className="text-sm font-semibold" style={{ color: "#5EEAD4" }}>{hotel.telephone}</span>
                    </a>
                  )}
                  {hotel.email && (
                    <a
                      href={`mailto:${hotel.email}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-200"
                      style={{ background: "rgba(200,169,110,.06)", border: "1px solid rgba(200,169,110,.14)" }}
                    >
                      <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,.65)" }}>{hotel.email}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {hotel.siteWeb && (
                  <a
                    href={hotel.siteWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold cursor-pointer hover:scale-105 transition-all duration-200"
                    style={{ background: "rgba(200,169,110,.10)", border: "1px solid rgba(200,169,110,.25)", color: "var(--color-gold-l)" }}
                  >
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    Site web
                    <ArrowUpRight className="w-3 h-3 opacity-50" aria-hidden="true" />
                  </a>
                )}
                {hotel.facebook && (
                  <a
                    href={hotel.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold cursor-pointer hover:scale-105 transition-all duration-200"
                    style={{ background: "rgba(24,119,242,.15)", border: "1px solid rgba(24,119,242,.25)", color: "#60A5FA" }}
                  >
                    <FacebookIcon className="w-4 h-4" />
                    Facebook
                  </a>
                )}
                {hotel.instagram && (
                  <a
                    href={hotel.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold cursor-pointer hover:scale-105 transition-all duration-200"
                    style={{ background: "rgba(225,48,108,.15)", border: "1px solid rgba(225,48,108,.25)", color: "#F472B6" }}
                  >
                    <InstagramIcon className="w-4 h-4" />
                    Instagram
                  </a>
                )}
                {hotel.latitude && hotel.longitude && (
                  <a
                    href={`https://maps.google.com/?q=${hotel.latitude},${hotel.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold cursor-pointer hover:scale-105 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.55)" }}
                  >
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    Voir sur la carte
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
