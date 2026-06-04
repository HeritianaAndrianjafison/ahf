export interface HotelAHF {
  id:              string;
  slug:            string;
  nom:             string;
  numeroAHF:       string | null;
  description:     string;
  adresse:         string | null;
  telephone:       string | null;
  email:           string | null;
  siteWeb:         string | null;
  facebook:        string | null;
  instagram:       string | null;
  latitude:        number | null;
  longitude:       number | null;
  photoCouverture: string | null;
  photos:          string[];
  estActif:        boolean;
  ordre:           number;
}

const RIHANALA_API = process.env.RIHANALA_API_URL ?? "https://rihanala.vercel.app";

export async function getHotelsAHF(): Promise<HotelAHF[]> {
  try {
    const res = await fetch(`${RIHANALA_API}/api/ahf`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export interface GaleriePhotoAHF {
  id:    string;
  url:   string;
  alt:   string;
  label: string;
  ordre: number;
}

export async function getGalerieAHF(): Promise<GaleriePhotoAHF[]> {
  try {
    const res = await fetch(`${RIHANALA_API}/api/ahf-galerie`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getAHFConfig(): Promise<{ image_ahf_cover?: string }> {
  try {
    const res = await fetch(`${RIHANALA_API}/api/ahf-config`, { next: { revalidate: 60 } });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}
