import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SkipLink } from "@/components/SkipLink";
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

export const metadata: Metadata = {
  title: {
    default: "Nigerian Community Peterborough",
    template: "%s · Nigerian Community Peterborough",
  },
  description:
    "The digital home of the Nigerian Community Peterborough — community, culture, and connection.",
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
    >
      <body>
        <ScrollProgress />
        <SkipLink />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
