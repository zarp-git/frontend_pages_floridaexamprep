import Header from "@/presentation/components/organisms/landing-page/Header";
import HeroSection from "@/presentation/components/organisms/landing-page/HeroSection";
import CourseCards from "@/presentation/components/organisms/landing-page/CourseCards";
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
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Course Section */}
        <CourseCards />

        {/* 3. 5 Pillars */}
        <PillarsSection />

        {/* 4. Screenshots WhatsApp dos Profissionais */}
        <ScreenshotsTestimonialsSection />

        {/* 5. Book Section */}
        <BookSection />

        {/* 6. Feedback dos Estudantes (vídeos e agradecimentos) */}
        <WrittenTestimonials />

        {/* 7. Stop Studying Alone */}
        <PlatformSection />

        {/* 8. Perguntas Frequentes */}
        <FAQSection />
      </main>

      {/* 9. Footer */}
      <LandingFooter />
    </div>
  );
}
