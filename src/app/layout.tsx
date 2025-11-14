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
  title: "Modem Website",
  description: "Modem Portfolio Website | My Journey as a Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lineSeed.variable}`}>
      <body
        className={`min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
