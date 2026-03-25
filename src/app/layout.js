import { Outfit } from "next/font/google";
import "./globals.css";
import FloatingIcons from "@/components/FloatingIcons";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://flavr.com.tr"),
  title: {
    default: "FLAVR — Kişiselleştirilmiş Vitamin Paketleri",
    template: "%s | FLAVR",
  },
  description: "Bilimsel verilerle hazırlanan, kişiye özel günlük vitamin ve supplement paketleri. Ücretsiz sağlık testi ile başlayın.",
  keywords: ["vitamin", "supplement", "kişiselleştirilmiş vitamin", "günlük vitamin", "sağlık", "FLAVR", "vitamin paketi", "takviye gıda"],
  authors: [{ name: "FLAVR" }],
  creator: "FLAVR",
  publisher: "FLAVR",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://flavr.com.tr",
    siteName: "FLAVR",
    title: "FLAVR — Kişiselleştirilmiş Vitamin Paketleri",
    description: "Bilimsel verilerle hazırlanan, kişiye özel günlük vitamin ve supplement paketleri.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FLAVR Vitamin Paketleri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLAVR — Kişiselleştirilmiş Vitamin Paketleri",
    description: "Bilimsel verilerle hazırlanan, kişiye özel günlük vitamin paketleri.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://flavr.com.tr",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={outfit.className}>
        <Providers>
          <FloatingIcons />
          {children}
        </Providers>
      </body>
    </html>
  );
}
