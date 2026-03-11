"use client";

import { CourseData } from "@/data/courses";
import CoursePricingCard from "./CoursePricingCard";

interface MultiplePricingSectionsProps {
  course: CourseData;
}

export default function MultiplePricingSections({ course }: MultiplePricingSectionsProps) {
  if (!course.pricingSections || course.pricingSections.length === 0) {
    return <CoursePricingCard course={course} />;
  }

  // Para a página Complete Exam Prep, mostrar apenas a segunda seção
  const isCompleteExamPrep = course.slug === "complete-exam-prep";
  const sectionsToShow = isCompleteExamPrep 
    ? [course.pricingSections[1]] // Apenas a seção "Complete Exam Prep Package"
    : course.pricingSections;

  return (
    <div className="w-full flex flex-col">
      {sectionsToShow.map((section, index) => {
        const sectionCourse = {
          ...course,
          features: section.features,
        };

        return (
          <div key={index} className="w-full">
            <CoursePricingCard 
              course={sectionCourse}
              sectionTitle={section.title}
              sectionSubtitle={section.subtitle}
              customTiers={section.tiers}
              hideDefaultText={!isCompleteExamPrep && index === 1 && section.title.includes("Complete Exam Prep Package")}
            />
            
            {index < sectionsToShow.length - 1 && (
              <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
