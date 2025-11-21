import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

const lineSeed = localFont({
  src: [
    {
      path: "./fonts/LINESeedSansTH_W_Th.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/LINESeedSansTH_W_Rg.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LINESeedSansTH_W_Bd.woff",
      weight: "700",
      style: "normal",
    },
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
      <body className={`min-h-screen antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
