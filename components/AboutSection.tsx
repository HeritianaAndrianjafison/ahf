import { Shield, Star, Users, Waves } from "lucide-react";

const VALUES = [
  {
    Icon: Shield,
    title: "Qualité certifiée",
    desc: "Chaque membre répond à des critères stricts d'accueil, de confort et de service avant d'intégrer l'association.",
  },
  {
    Icon: Star,
    title: "Expérience authentique",
    desc: "Nos hôtels valorisent la culture malgache et le patrimoine naturel de Foulpointe et de la côte Est.",
  },
  {
    Icon: Users,
    title: "Entraide & solidarité",
    desc: "Les membres partagent bonnes pratiques, formations et ressources pour élever collectivement le niveau de l'hôtellerie locale.",
  },
  {
    Icon: Waves,
    title: "Mer & environnement",
    desc: "L'AHF encourage des pratiques respectueuses de l'environnement et valorise la biodiversité unique de la côte Est.",
  },
];

export default function AboutSection() {
  return (
    <section id="apropos" className="py-24 overflow-hidden" style={{ background: "#091B2F" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Gauche — texte */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ background: "rgba(200,169,110,.50)" }} aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "var(--color-gold)" }}>
                À propos de l'AHF
              </span>
            </div>

            <h2
              className="font-display font-black text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              L'excellence<br />
              <span style={{ color: "var(--color-gold-l)" }}>côtière</span> à<br />
              Foulpointe
            </h2>

            <p
              className="leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,.58)" }}
            >
              L'Association Hôtelière de Foulpointe (AHF) regroupe les établissements
              hôteliers de Mahavelona et ses environs, engagés à offrir une expérience
              de séjour mémorable au cœur de la nature de la côte Est de Madagascar.
            </p>
            <p className="leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,.38)" }}>
              Fondée par des professionnels locaux, l'AHF est un label de confiance
              pour les voyageurs en quête d'hébergements de qualité, d'un accueil
              chaleureux et d'une immersion authentique dans la beauté de Foulpointe.
            </p>

          </div>

          {/* Droite — valeurs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal">
            {VALUES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="glass-card p-6 rounded-2xl transition-all duration-300 cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(200,169,110,.14)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--color-gold)" }} aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.42)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
