import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AHF — Association des Hôtels de Foulpointe",
  description:
    "Découvrez les hôtels membres de l'Association des Hôtels de Foulpointe (AHF). Hébergements de qualité sur la côte Est de Madagascar.",
  openGraph: {
    title: "AHF — Association des Hôtels de Foulpointe",
    description: "Les meilleurs hôtels de Foulpointe, côte Est Madagascar.",
    siteName: "AHF Foulpointe",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
