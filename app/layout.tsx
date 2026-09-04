import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { CookieNotice } from "@/components/CookieNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SkipLink } from "@/components/SkipLink";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();
const siteName = "Nigerian Community Peterborough";
const defaultDescription =
  "The digital home of the Nigerian Community Peterborough — community, culture, and connection.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName,
    title: siteName,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${openSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ScrollProgress />
        <SkipLink />
        <Header />
        {children}
        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}
