import { getHotelsAHF, getGalerieAHF, getAHFConfig } from "@/lib/api";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GalerieSection from "@/components/GalerieSection";
import HotelsGrid from "@/components/HotelsGrid";
import AboutSection from "@/components/AboutSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic"; // toujours fraîches

export default async function HomePage() {
  const [hotels, galerie, config] = await Promise.all([getHotelsAHF(), getGalerieAHF(), getAHFConfig()]);

  return (
    <>
      <ScrollReveal />
      <Navbar />
      <HeroSection coverImage={config.image_ahf_cover} />
      <GalerieSection photos={galerie} />
      <HotelsGrid hotels={hotels} />
      <AboutSection />
      <JoinSection />
      <Footer />
    </>
  );
}
