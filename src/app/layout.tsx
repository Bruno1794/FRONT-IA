import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CODE | SITEMAS",
  description: "Sistema para controle de cliente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
