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
  title: "Flavr - Kişiselleştirilmiş Vitamin Paketleri",
  description: "Hedeflerinize ve yaşam tarzınıza uygun, günlük vitamin paketleri.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={outfit.className}>
        <Providers>
          <FloatingIcons />
          {children}
        </Providers>
      </body>
    </html>
  );
}
