export interface HotelAHF {
  id: string;
  slug: string;
  nom: string;
  description: string;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  siteWeb: string | null;
  facebook: string | null;
  instagram: string | null;
  latitude: number | null;
  longitude: number | null;
  photoCouverture: string | null;
  photos: string[];
  estActif: boolean;
  ordre: number;
}

const RIHANALA_API = process.env.RIHANALA_API_URL ?? "http://localhost:3000";

export async function getHotelsAHF(): Promise<HotelAHF[]> {
  try {
    const res = await fetch(`${RIHANALA_API}/api/ahf`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
