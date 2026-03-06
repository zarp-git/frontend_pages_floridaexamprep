import Header from "@/presentation/components/organisms/landing-page/Header";
import FAQSection from "@/presentation/components/organisms/landing-page/FAQSection";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";

export const metadata = {
  title: "FAQ - Frequently Asked Questions | Florida Exam Prep",
  description: "Find answers to common questions about our Florida contractor exam preparation courses, study materials, and exam registration process.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}
