import type { Metadata } from "next";
import { Rubik, Red_Hat_Display } from "next/font/google";
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

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Florida Exam Prep - Pass Your Contractor Exam First Try",
  description:
    "Get approved in your Florida State Contractor Exam on the first try. Expert-guided courses, practice tests, and personal coaching guarantee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${redHatDisplay.variable} antialiased`}
      >
        {/* Header e Footer removidos - agora cada página controla seus próprios */}
        {children}
        <LeadCollectModal />
        <ContactModal />
        <MaintenanceModal />
      </body>
    </html>
  );
}
