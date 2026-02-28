"use client";

import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";

interface CourseFeature {
  text: string;
}

interface Course {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  image: string;
  features: CourseFeature[];
}

const COURSES: Course[] = [
  {
    id: "business-finance",
    badge: "Course",
    badgeColor: "bg-white/20",
    title: "Business and Finance Course",
    subtitle: "For All Division 1 and Division 2 Contractors",
    image: "/images/courses/business-finance.png",
    features: [
      {
        text: "Full breakdown of every chapter in the Florida Contractor's Manual",
      },
      {
        text: "The Most important content in the Builder's Guide to Accounting",
      },
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
    badgeColor: "bg-white/20",
    title: "CONTRACT ADMINISTRATION & PROJECT MANAGEMENT COURSE",
    subtitle: "For Residencial, Building and General Contractors",
    image: "/images/courses/contract-administration.png",
    features: [
      {
        text: "Full breakdown of every chapter in the Florida Contractor's Manual",
      },
      {
        text: "The Most important content in the Builder's Guide to Accounting",
      },
      { text: "Step-by-Step guidance on the AIA documents" },
      { text: "A clear study plan" },
      { text: "20+ practice quizzes and a timed exam simulator" },
      { text: "Math you need to know explained simply" },
      { text: "24/7 Access for 12 Months" },
    ],
  },
  {
    id: "complete-prep",
    badge: "Full Course",
    badgeColor: "bg-amber-500/20",
    title: "Complete Exam Prep Package",
    subtitle: "For Residencial, Building and General Contractors",
    image: "/images/courses/complete-exam-prep.png",
    features: [
      {
        text: "Full breakdown of every chapter in the Florida Contractor's Manual",
      },
      {
        text: "The Most important content in the Builder's Guide to Accounting",
      },
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
    <Image
      src="/images/svg/green-check.svg"
      alt="Included"
      width={20}
      height={20}
      className="w-5 h-5 flex-shrink-0"
    />
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex-1 min-w-full sm:min-w-[320px] lg:min-w-0 p-px bg-zinc-100 rounded-lg border border-gray-300 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className={`absolute top-3 sm:top-[18px] left-3 sm:left-4 px-2 py-[3px] ${course.badgeColor} rounded-full backdrop-blur-sm`}
        >
          <span className="text-white text-xs font-medium font-rubik leading-4">
            {course.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-3 sm:px-4 pt-3 sm:pt-3.5 pb-3 sm:pb-4 flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Title */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <h3 className="text-gray-800 text-base sm:text-lg font-extrabold font-red-hat uppercase leading-tight">
              {course.title}
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-3 h-3 text-gray-600 flex-shrink-0" />
              <p className="text-gray-600 text-xs sm:text-sm font-medium font-rubik leading-tight">
                {course.subtitle}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-0.5">
            {course.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-1.5 pt-[0.80px] pb-[2.40px]"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </div>
                <span className="flex-1 text-emerald-900 text-xs sm:text-sm font-medium font-rubik leading-snug">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <PrimaryButton
          variant="blue"
          size="lg"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
          className="w-full mt-2 sm:mt-4"
        >
          {CTA_TEXT}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default function CourseCardsSection() {
  return (
    <div
      className="bg-black"
      style={{
        background:
          "radial-gradient(122.59% 134.96% at 149.27% -34.05%, #0BF 0%, rgba(0, 60, 255, 0.00) 89.06%), radial-gradient(47.75% 46.47% at -26.25% 94.45%, #0BF 0%, rgba(0, 60, 255, 0.00) 100%), #000A1C",
      }}
    >
      <section className="w-full py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="px-4 md:px-28 max-w-[1440px] mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8">
          {/* Heading */}
          <div className="flex flex-col justify-center items-center gap-3 sm:gap-5 px-2">
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm">
              <span className="text-white text-sm sm:text-base font-medium font-rubik leading-relaxed">
                DON&apos;T TRY IT ALONE
              </span>
            </div>
            <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl font-extrabold font-red-hat uppercase leading-tight">
              WE WALKED THROUGH ALL STEPS AND WE COMPILED
              <br className="hidden sm:block" />
              EVERYTHING RIGHT HAND TO YOU GET THAT +90 GRADE
            </h2>
            <p className="text-center text-white text-base sm:text-lg md:text-xl font-normal font-rubik leading-relaxed">
              We WILL HELP You Get APPROVED IN THE Exam TODAY
            </p>
          </div>

          {/* Course Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
