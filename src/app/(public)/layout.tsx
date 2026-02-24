import type { Metadata } from "next";
import { Rubik, Hanken_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Header from "@/presentation/components/organisms/common/header/Header";
import Footer from "@/presentation/components/organisms/common/footer/Footer";
import { LeadCollectModal } from "@/presentation/components/organisms/common/lead-collect-modal/LeadCollectModal";
import { ContactModal } from "@/presentation/components/organisms/common/contact-modal/ContactModal";
import { MaintenanceModal } from "@/presentation/components/organisms/common/MaintenanceModal";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allbrick Pavers - Central Florida Pavers Installation",
  description: "Explore expert paver installation, sealing, and maintenance services in Lakeland, Davenport, and Central Florida. Trusted, local, and competitively priced.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${hankenGrotesk.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <LeadCollectModal />
        <ContactModal />
        <MaintenanceModal />
      </body>
    </html>
  );
}
