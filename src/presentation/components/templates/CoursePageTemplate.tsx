import Header from "@/presentation/components/organisms/landing-page/Header";
import CourseHeroSection from "@/presentation/components/organisms/course-page/CourseHeroSection";
import MultiplePricingSections from "@/presentation/components/organisms/course-page/MultiplePricingSections";
import AfterBeforeSection from "@/presentation/components/organisms/course-page/AfterBeforeSection";
import WrittenTestimonials from "@/presentation/components/organisms/landing-page/WrittenTestimonials";
import ScreenshotsTestimonialsSection from "@/presentation/components/organisms/landing-page/ScreenshotsTestimonialsSection";
import FAQSection from "@/presentation/components/organisms/landing-page/FAQSection";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";
import { CourseData } from "@/data/courses";

interface CoursePageTemplateProps {
  course: CourseData;
}

export default function CoursePageTemplate({ course }: CoursePageTemplateProps) {
  return (
    <div className="w-full bg-white inline-flex flex-col justify-start items-start overflow-x-hidden">
      <Header />
      
      <CourseHeroSection course={course} />
      
      <MultiplePricingSections course={course} />
      
      <AfterBeforeSection />
      
      <WrittenTestimonials />
      
      <ScreenshotsTestimonialsSection />
      
      <FAQSection />
      
      <LandingFooter />
    </div>
  );
}
