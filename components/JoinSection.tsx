import { CheckCircle, ArrowRight } from "lucide-react";

const BENEFITS = [
  "Référencement sur le site officiel AHF",
  "Badge « Membre AHF » — label de qualité",
  "Réseau d'entraide entre professionnels",
  "Promotion collective sur les réseaux sociaux",
  "Accès aux formations hôtelières",
  "Visibilité auprès des agences de voyage",
];

export default function JoinSection() {
  return (
    <section
      id="rejoindre"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #112C42 0%, #0D2038 100%)" }}
    >
      {/* Lueur bleu océan */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(14,165,233,.16) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Lueur or en bas */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "50%", height: "200px",
          background: "radial-gradient(ellipse, rgba(200,169,110,.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-10 text-center">

        <div className="flex items-center justify-center gap-3 mb-6 reveal">
          <div className="h-px w-12" style={{ background: "rgba(200,169,110,.40)" }} aria-hidden="true" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
            Rejoindre l'AHF
          </span>
          <div className="h-px w-12" style={{ background: "rgba(200,169,110,.40)" }} aria-hidden="true" />
        </div>

        <h2
          className="font-display font-black text-white leading-tight mb-5 reveal"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          Votre hôtel mérite<br />
          d'être <span style={{ color: "var(--color-gold-l)" }}>reconnu</span>
        </h2>

        <p
          className="leading-relaxed mb-12 max-w-2xl mx-auto reveal"
          style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,.48)" }}
        >
          Vous gérez un hôtel à Foulpointe ou ses environs ? Rejoignez l'AHF et bénéficiez
          d'une visibilité accrue et d'un réseau de professionnels engagés.
        </p>

        {/* Avantages */}
        <div className="grid sm:grid-cols-2 gap-3 mb-12 text-left max-w-2xl mx-auto reveal">
          {BENEFITS.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
              <span className="text-sm" style={{ color: "rgba(255,255,255,.65)" }}>{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div
          className="inline-flex flex-col items-center gap-5 px-10 py-10 rounded-3xl reveal"
          style={{
            background: "rgba(13,29,42,.85)",
            border: "1px solid rgba(200,169,110,.22)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 80px rgba(0,0,0,.40), inset 0 1px 0 rgba(200,169,110,.15)",
          }}
        >
          <p className="text-sm" style={{ color: "rgba(255,255,255,.55)" }}>
            Contactez-nous pour déposer votre candidature
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:contact@ahf-foulpointe.mg"
              className="flex items-center gap-2 font-bold rounded-full px-7 transition-all duration-200 cursor-pointer hover:scale-105 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-d), var(--color-gold))",
                color: "#07120A",
                minHeight: "50px",
                fontSize: "0.9rem",
                boxShadow: "0 8px 28px rgba(200,169,110,.38)",
              }}
            >
              Soumettre ma candidature
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="tel:+261346808466"
              className="flex items-center gap-2 font-semibold rounded-full px-7 transition-all duration-200 cursor-pointer hover:scale-105"
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(200,169,110,.30)",
                color: "var(--color-gold-l)",
                minHeight: "50px",
                fontSize: "0.9rem",
              }}
            >
              Appeler l'AHF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
