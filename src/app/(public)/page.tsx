import Header from "@/presentation/components/organisms/landing-page/Header";
import HeroSection from "@/presentation/components/organisms/landing-page/HeroSection";
import CourseCardsSection from "@/presentation/components/organisms/landing-page/CourseCards";
import WrittenTestimonials from "@/presentation/components/organisms/landing-page/WrittenTestimonials";
import PillarsSection from "@/presentation/components/organisms/landing-page/PillarsSection";
import ScreenshotsTestimonialsSection from "@/presentation/components/organisms/landing-page/ScreenshotsTestimonialsSection";
import BookSection from "@/presentation/components/organisms/landing-page/BookSection";
import PlatformSection from "@/presentation/components/organisms/landing-page/PlatformSection";
import FAQSection from "@/presentation/components/organisms/landing-page/FAQSection";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CourseCardsSection />
        <PillarsSection />
        <ScreenshotsTestimonialsSection />
        <BookSection />
        <WrittenTestimonials />
        <PlatformSection />

        <FAQSection />
      </main>

      <LandingFooter />
    </div>
  );
}
