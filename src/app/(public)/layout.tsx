import { Rubik, Red_Hat_Display } from "next/font/google";
import "@/app/globals.css";
import "lenis/dist/lenis.css";
import { LeadCollectModal } from "@/presentation/components/organisms/common/lead-collect-modal/LeadCollectModal";
import { ContactModal } from "@/presentation/components/organisms/common/contact-modal/ContactModal";
import { MaintenanceModal } from "@/presentation/components/organisms/common/MaintenanceModal";
import { SmoothScrollProvider } from "@/presentation/components/providers/SmoothScrollProvider";

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
    <html lang="en-US">
      <body
        className={`${rubik.variable} ${redHatDisplay.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
          <LeadCollectModal />
          <ContactModal />
          <MaintenanceModal />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
