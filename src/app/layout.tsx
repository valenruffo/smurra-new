import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { LangProvider } from "@/lib/i18n-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smurra | Broker de Seguros",
  description:
    "Programas de seguros, reaseguros y asistencia elaborados con estrategia y dominio técnico.",
  keywords: ["seguros", "broker de seguros", "insurance", "reinsurance", "Smurra", "Argentina"],
  authors: [{ name: "Smurra" }],
  openGraph: {
    title: "Smurra | Broker de Seguros",
    description:
      "Programas de seguros, reaseguros y asistencia elaborados con estrategia y dominio técnico.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
