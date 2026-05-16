import Image from "next/image";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85&auto=format&fit=crop",
    alt: "Coucher de soleil sur la plage de Foulpointe",
    label: "Couchers de soleil",
    size: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80&auto=format&fit=crop",
    alt: "Plage tropicale aux eaux turquoise, côte Est Madagascar",
    label: "Plages & mer",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
    alt: "Piscine d'un hôtel tropical à Madagascar",
    label: "Hôtels & piscines",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800&q=80&auto=format&fit=crop",
    alt: "Palmiers sur la plage tropicale",
    label: "Nature tropicale",
    size: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80&auto=format&fit=crop",
    alt: "Bungalow tropical vue sur mer",
    label: "Bungalows",
    size: "small",
  },
];

const STRIP_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=75&auto=format&fit=crop",
    alt: "Plage de sable blanc Madagascar",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=75&auto=format&fit=crop",
    alt: "Forêt tropicale luxuriante",
  },
  {
    src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=75&auto=format&fit=crop",
    alt: "Resort tropical en bord de mer",
  },
  {
    src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=75&auto=format&fit=crop",
    alt: "Bungalow sur pilotis au bord de l'eau",
  },
  {
    src: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=75&auto=format&fit=crop",
    alt: "Plongée et snorkeling dans les eaux cristallines",
  },
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=75&auto=format&fit=crop",
    alt: "Voyageurs profitant du soleil à Foulpointe",
  },
];

export default function GalerieSection() {
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

          {/* Large image — left, spans 2 rows */}
          <div className="relative row-span-2 rounded-3xl overflow-hidden group cursor-pointer">
            <Image
              src={IMAGES[0].src}
              alt={IMAGES[0].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
              style={{ background: "linear-gradient(to top, rgba(7,18,9,.70) 0%, transparent 52%)" }}
            />
            <div className="absolute bottom-5 left-5">
              <span
                className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ background: "rgba(200,169,110,.88)", color: "#071209" }}
              >
                {IMAGES[0].label}
              </span>
            </div>
          </div>

          {/* 4 small images */}
          {[IMAGES[1], IMAGES[2], IMAGES[3], IMAGES[4]].map((img) => (
            <div key={img.src} className="relative rounded-3xl overflow-hidden group cursor-pointer">
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
            </div>
          ))}
        </div>

        {/* Horizontal strip */}
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 reveal">
          {STRIP_IMAGES.map((img) => (
            <div key={img.src} className="relative h-28 rounded-2xl overflow-hidden group cursor-pointer">
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

        {/* Caption */}
        <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,.25)" }}>
          Foulpointe · Mahavelona · Côte Est de Madagascar
        </p>
      </div>
    </section>
  );
}
