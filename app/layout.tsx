import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oficina M3 Motos | Sua moto em boas mãos",
  description:
    "Manutenção, revisão, motor, injeção eletrônica e acessórios para sua moto em Fortaleza.",
  keywords: [
    "Oficina M3 Motos",
    "oficina de motos Fortaleza",
    "manutenção de motos",
    "revisão de moto",
    "Parque Dois Irmãos",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Oficina M3 Motos | Sua moto em boas mãos",
    description:
      "Serviço especializado para sua moto, com atendimento direto pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}