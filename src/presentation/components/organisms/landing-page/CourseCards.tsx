"use client";

import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

interface CourseFeature {
  text: string;
}

interface Course {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  features: CourseFeature[];
}

const COURSES: Course[] = [
  {
    id: "business-finance",
    badge: "Course",
    title: "Business & Finance",
    subtitle: "For All Division 1 and Division 2 Contractors",
    image: "/images/courses/business-finance.jpg",
    features: [
      { text: "Full breakdown of every chapter in the Florida Contractor's Manual" },
      { text: "The Most important content in the Builder's Guide to Accounting" },
      { text: "Step-by-Step guidance on the AIA documents" },
      { text: "A clear study plan" },
      { text: "20+ practice quizzes and a timed exam simulator" },
      { text: "Math you need to know explained simply" },
      { text: "24/7 Access for 12 Months" },
    ],
  },
  {
    id: "contract-admin",
    badge: "Course",
    title: "Contract Administration",
    subtitle: "For Residential, Building and General Contractors",
    image: "/images/courses/contract-administration.jpg",
    features: [
      { text: "Full breakdown of every chapter in the Florida Contractor's Manual" },
      { text: "The Most important content in the Builder's Guide to Accounting" },
      { text: "Step-by-Step guidance on the AIA documents" },
      { text: "A clear study plan" },
      { text: "20+ practice quizzes and a timed exam simulator" },
      { text: "Math you need to know explained simply" },
      { text: "24/7 Access for 12 Months" },
    ],
  },
  {
    id: "complete-prep",
    badge: "FULL COURSE",
    title: "Complete Exam Prep",
    subtitle: "For Residential, Building and General Contractors",
    image: "/images/courses/complete-exam-prep.jpg",
    features: [
      { text: "Full breakdown of every chapter in the Florida Contractor's Manual" },
      { text: "The Most important content in the Builder's Guide to Accounting" },
      { text: "Step-by-Step guidance on the AIA documents" },
      { text: "A clear study plan" },
      { text: "20+ practice quizzes and a timed exam simulator" },
      { text: "Math you need to know explained simply" },
      { text: "24/7 Access for 12 Months" },
    ],
  },
];

function CheckIcon() {
  return (
    <div className="relative w-5 h-5 flex-shrink-0">
      <div className="absolute inset-0 bg-emerald-300 rounded-full" />
      <div className="absolute inset-[3.75px] bg-emerald-500 rounded-full" />
      <svg
        className="absolute inset-0 w-5 h-5"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M7.5 10.5L9.5 12.5L12.5 8.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex-1 bg-zinc-100 rounded-lg border border-gray-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="text-white text-xs font-medium font-rubik">
            {course.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3.5 pb-4 flex flex-col gap-3 flex-1">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 text-lg font-semibold font-clash-display leading-6">
            {course.title}
          </h3>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-gray-600" />
            <p className="text-gray-600 text-sm font-medium font-rubik leading-5">
              {course.subtitle}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-0.5 flex-1">
          {course.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-1.5 py-1"
            >
              <CheckIcon />
              <span className="text-emerald-900 text-sm font-medium font-rubik leading-4">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full h-12 px-8 py-4 bg-blue-600 rounded-lg flex items-center justify-center gap-4 hover:bg-blue-700 transition-colors">
          <span className="text-white text-base font-medium font-rubik uppercase">
            Get Approved Now
          </span>
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

export default function CourseCards() {
  return (
    <section className="w-full px-4 md:px-28 py-20 bg-gradient-to-br from-sky-500 to-blue-700/0 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8">
        {/* Heading */}
        <div className="flex flex-col items-center gap-5">
          <div className="px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
            <span className="text-white text-xl font-medium font-rubik leading-8">
              DON'T TRY IT ALONE
            </span>
          </div>
          <h2 className="text-center text-white text-3xl font-bold font-rubik uppercase leading-8 max-w-4xl">
            We Walked Through All Steps And We Compiled
            <br />
            Everything Right Hand To You Get That +90 Grade
          </h2>
          <p className="text-center text-white text-xl font-normal font-rubik leading-8">
            We WILL HELP You Get APPROVED IN THE Exam TODAY
          </p>
        </div>

        {/* Course Cards */}
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
