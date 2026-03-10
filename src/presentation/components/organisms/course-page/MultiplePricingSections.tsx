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

  return (
    <div className="w-full flex flex-col">
      {course.pricingSections.map((section, index) => {
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
              hideDefaultText={index === 1 && section.title.includes("Complete Exam Prep Package")}
            />
            
            {index < course.pricingSections!.length - 1 && (
              <div className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
