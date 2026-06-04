"use client";

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="py-10 border-t"
      style={{ background: "#060F1A", borderColor: "rgba(200,169,110,.15)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <Image
            src="/logo-ahf.jpeg"
            alt="Logo AHF Foulpointe"
            width={40}
            height={40}
            className="rounded-lg shrink-0 object-contain"
            style={{ background: "rgba(255,255,255,.06)" }}
          />
          <div>
            <div className="font-display font-bold text-sm" style={{ color: "rgba(255,255,255,.65)" }}>AHF Foulpointe</div>
            <div className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,.22)" }}>Association des Hôtels</div>
          </div>
        </div>

        <p className="text-xs text-center" style={{ color: "rgba(255,255,255,.22)" }}>
          © {year} Association des Hôtels de Foulpointe · Mahavelona, Côte Est Madagascar
        </p>

        <a
          href="https://www.rihanala-village.mg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs transition-colors duration-200 cursor-pointer"
          style={{ color: "rgba(255,255,255,.22)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold-l)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.22)")}
        >
          Propulsé par Rihanala Village →
        </a>
      </div>
    </footer>
  );
}
