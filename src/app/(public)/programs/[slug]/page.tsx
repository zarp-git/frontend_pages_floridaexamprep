import { notFound } from "next/navigation";
import CoursePageTemplate from "@/presentation/components/templates/CoursePageTemplate";
import { courseData } from "@/data/courses";

interface ProgramPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: "business-finance" },
    { slug: "contract-administration" },
    { slug: "general-contractor" },
    { slug: "building-contractor" },
    { slug: "residential-contractor" },
  ];
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const course = courseData[slug];

  if (!course) {
    notFound();
  }

  return <CoursePageTemplate course={course} />;
}
