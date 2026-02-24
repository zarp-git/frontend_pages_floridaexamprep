import Header from "@/presentation/components/organisms/landing-page/Header";
import HeroSection from "@/presentation/components/organisms/landing-page/HeroSection";
import CourseCards from "@/presentation/components/organisms/landing-page/CourseCards";
import WrittenTestimonials from "@/presentation/components/organisms/landing-page/WrittenTestimonials";
import FAQSection from "@/presentation/components/organisms/landing-page/FAQSection";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";

export const metadata = {
  title: "Florida Exam Prep - Pass Your Contractor Exam First Try",
  description:
    "Get approved in your Florida State Contractor Exam on the first try. Expert-guided courses, practice tests, and personal coaching guarantee.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CourseCards />
        <WrittenTestimonials />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}
