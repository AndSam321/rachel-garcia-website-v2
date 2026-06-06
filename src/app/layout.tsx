import type { Metadata } from "next";
import { Caveat, Archivo_Black, Patrick_Hand } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  weight: "400",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rachel Garcia",
  description:
    "Rachel Garcia — senior mathematics student with a passion for public health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${archivoBlack.variable} ${patrickHand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
