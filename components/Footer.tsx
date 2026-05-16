"use client";

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
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))" }}
          >
            <span className="font-display font-black text-white text-[10px] leading-none">AHF</span>
          </div>
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
