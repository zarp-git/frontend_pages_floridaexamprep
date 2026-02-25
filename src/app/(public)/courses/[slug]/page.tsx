import { notFound } from "next/navigation";
import CoursePageTemplate from "@/presentation/components/templates/CoursePageTemplate";
import { courseData } from "@/data/courses";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: "business-finance" },
    { slug: "contract-administration" },
    { slug: "complete-exam-prep" },
  ];
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courseData[slug];

  if (!course) {
    notFound();
  }

  return <CoursePageTemplate course={course} />;
}
