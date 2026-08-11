import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./ux-upgrades.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  applicationName: "Egreso LCD",
  title: { default: "Egreso LCD", template: "%s | Egreso LCD" },
  description:
    "Guía práctica para orientarte en el egreso de la Licenciatura en Ciencias de Datos de Exactas UBA.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/*
        Browser extensions can add attributes/styles to <body> before React hydrates.
        Suppress only this root-level mismatch; application content still hydrates normally.
      */}
      <body suppressHydrationWarning>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <footer>
          <div className="container">
            <strong>Egreso LCD</strong>
            <p>
              Guía basada en fuentes oficiales. Ante discrepancias, prevalece la{" "}
              <Link href="/fuentes">información oficial enlazada</Link>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
