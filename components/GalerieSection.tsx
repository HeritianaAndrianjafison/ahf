import Image from "next/image";
import type { GaleriePhotoAHF } from "@/lib/api";

interface GalerieSectionProps {
  photos: GaleriePhotoAHF[];
}

const PLACEHOLDER_MAIN = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85&auto=format&fit=crop",
    alt: "Coucher de soleil sur la plage de Foulpointe",
    label: "Couchers de soleil",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop",
    alt: "Plage tropicale aux eaux turquoise, côte Est Madagascar",
    label: "Plages & Mer",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
    alt: "Piscine d'un hôtel tropical à Madagascar",
    label: "Hôtels & Piscines",
  },
  {
    src: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800&q=80&auto=format&fit=crop",
    alt: "Palmiers sur la plage tropicale",
    label: "Nature Tropicale",
  },
  {
    src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80&auto=format&fit=crop",
    alt: "Bungalow tropical vue sur mer",
    label: "Bungalows",
  },
];

const PLACEHOLDER_STRIP = [
  { src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=75&auto=format&fit=crop", alt: "Plage de sable blanc Madagascar" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=75&auto=format&fit=crop", alt: "Forêt tropicale luxuriante" },
  { src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=75&auto=format&fit=crop", alt: "Resort tropical en bord de mer" },
  { src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=75&auto=format&fit=crop", alt: "Bungalow sur pilotis au bord de l'eau" },
  { src: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=75&auto=format&fit=crop", alt: "Plongée dans les eaux cristallines" },
  { src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=75&auto=format&fit=crop", alt: "Voyageurs profitant du soleil à Foulpointe" },
];

export default function GalerieSection({ photos }: GalerieSectionProps) {
  const sorted = [...photos].sort((a, b) => a.ordre - b.ordre);

  function getPhoto(index: number): { src: string; alt: string; label: string } {
    const real = sorted.find((p) => p.ordre === index) ?? sorted[index];
    if (real) return { src: real.url, alt: real.alt, label: real.label };
    const placeholders = [...PLACEHOLDER_MAIN, ...PLACEHOLDER_STRIP];
    const fb = placeholders[index % placeholders.length];
    return { src: fb.src, alt: fb.alt, label: (fb as { label?: string }).label ?? "" };
  }

  const mainImages = Array.from({ length: 5 }, (_, i) => getPhoto(i));
  const stripImages = Array.from({ length: 6 }, (_, i) => getPhoto(i + 5));

  return (
    <section className="py-24 overflow-hidden" style={{ background: "#0B2133" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: "rgba(200,169,110,.45)" }} aria-hidden="true" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
              Foulpointe en images
            </span>
            <div className="h-px w-12" style={{ background: "rgba(200,169,110,.45)" }} aria-hidden="true" />
          </div>
          <h2
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.02em" }}
          >
            La mer, le soleil<br />
            <span style={{ color: "var(--color-gold-l)" }}>& la nature</span>
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,.50)" }}>
            Plages de sable, eaux turquoise, forêts tropicales et bungalows de charme —
            Foulpointe vous attend pour un séjour inoubliable.
          </p>
        </div>

        {/* Main mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 reveal" style={{ gridTemplateRows: "260px 260px" }}>

          {/* Position 0 — large image, spans 2 rows */}
          <div className="relative row-span-2 rounded-3xl overflow-hidden group cursor-pointer">
            <Image
              src={mainImages[0].src}
              alt={mainImages[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
              style={{ background: "linear-gradient(to top, rgba(7,18,9,.70) 0%, transparent 52%)" }}
            />
            {mainImages[0].label && (
              <div className="absolute bottom-5 left-5">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(200,169,110,.88)", color: "#071209" }}
                >
                  {mainImages[0].label}
                </span>
              </div>
            )}
          </div>

          {/* Positions 1–4 — small grid images */}
          {mainImages.slice(1).map((img, i) => (
            <div key={i} className="relative rounded-3xl overflow-hidden group cursor-pointer">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(200,169,110,.18)" }}
              />
              {img.label && (
                <div className="absolute bottom-4 left-4">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(7,15,24,.80)",
                      color: "var(--color-gold-l)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {img.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Positions 5–10 — horizontal strip */}
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 reveal">
          {stripImages.map((img, i) => (
            <div key={i} className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(200,169,110,.18)" }}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,.25)" }}>
          Foulpointe · Mahavelona · Côte Est de Madagascar
        </p>
      </div>
    </section>
  );
}
