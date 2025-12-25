import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { SnackbarProviderWrapper } from "./providers/SnackbarProviderWrapper";

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

const hero = localFont({
  src: [
    {
      path: "./fonts/Audiowide-Regular.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--audiowide",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Modem – Software Developer Portfolio",
    template: "%s | Modem",
  },
  description:
    "Full-Stack Developer Portfolio. Projects built with NextJS, NodeJS+ Express, TypeScript, and modern web technologies.",

  verification: {
    google: "konrk-_mGKTnX1WxWL4n5gcXRABtxBKbQZ0F7qkdvjI",
  },

  openGraph: {
    title: "Modem – Software Developer",
    description:
      "Portfolio website of Modem, a Software Developer specializing in modern web technologies.",
    url: "https://modem-website-fe.vercel.app/",
    siteName: "Modem Portfolio",
    type: "website",
    images: [
      {
        url: "https://modem-website-fe.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Modem Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Modem – Software Developer",
    description:
      "Portfolio website of Modem, a Software Developer specializing in modern web technologies.",
    images: ["https://modem-website-fe.vercel.app/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lineSeed.variable} ${hero.variable}`}>
      <body className={`min-h-screen antialiased`}>
        <SnackbarProviderWrapper>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SnackbarProviderWrapper>
      </body>
    </html>
  );
}
