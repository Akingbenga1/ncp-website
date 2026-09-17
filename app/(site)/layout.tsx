import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

/**
 * Public site chrome — header + footer for browsable pages.
 * Auth flows use `(auth)/layout.tsx` instead (no site nav).
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
