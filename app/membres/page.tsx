import type { Metadata } from "next";
import { getHotelsAHF } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MembresGrid from "@/components/MembresGrid";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Membres AHF — Association Hôtelière de Foulpointe",
  description:
    "Annuaire complet des hôtels membres certifiés de l'Association Hôtelière de Foulpointe. Qualité, accueil chaleureux et authenticité malgache sur la côte Est.",
  openGraph: {
    title: "Membres AHF — Association Hôtelière de Foulpointe",
    description: "Découvrez tous les hôtels certifiés de l'AHF à Foulpointe, Madagascar.",
    siteName: "AHF Foulpointe",
    locale: "fr_FR",
    type: "website",
  },
};

export default async function MembresPageRoute() {
  const hotels = await getHotelsAHF();
  const actifs = hotels.filter((h) => h.estActif);

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <MembresGrid hotels={actifs} />
      <Footer />
    </>
  );
}
