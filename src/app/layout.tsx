import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const lineSeed = localFont({
  src: [
    { path: "./fonts/LINESeedSansTH_Rg.ttf", weight: "400", style: "normal" },
    { path: "./fonts/LINESeedSansTH_Bd.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-lineseed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Modem",
  description: "Modem Website Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lineSeed.variable}`}>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
