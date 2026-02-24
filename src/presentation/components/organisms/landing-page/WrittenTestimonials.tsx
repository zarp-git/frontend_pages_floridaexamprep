"use client";

import Image from "next/image";
import { Play, ArrowUpRight, MoreHorizontal } from "lucide-react";

interface Testimonial {
  id: string;
  type: "video" | "written";
  studentName: string;
  examType: string;
  avatar: string;
  image?: string;
  video?: string;
  rating: number;
  text?: string;
}

const TESTIMONIALS: Testimonial[][] = [
  // Row 1
  [
    {
      id: "video-1",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/default-avatar.jpg",
      video: "/images/videostudant/videostudant.mp4",
      rating: 5,
    },
    {
      id: "2",
      type: "written",
      studentName: "Fred Ludena",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/fred-ludena.jpg",
      image: "/images/testimonials/screenshots/floridaexamprep_testimonial_danielpryor.jpg",
      rating: 5,
      text: "Today I passed my business and finance exam. Best wishes to everyone else! I watched all the videos, took practice exams multiple times until I was consistently scoring 100%. The course helped me get familiar with navigating each book.",
    },
    {
      id: "3",
      type: "written",
      studentName: "David Martin",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/david-martin.jpg",
      image: "/images/testimonials/screenshots/floridaexamprep_testimonial_danielpryor.jpg",
      rating: 5,
      text: "1 test checked off! I passed my business and finance today!!!",
    },
  ],
  // Row 2
  [
    {
      id: "4",
      type: "written",
      studentName: "Oryan Grey",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/oryan-grey.jpg",
      image: "/images/testimonials/screenshots/floridaexamprep_testimonial_oryangrey.jpg",
      rating: 5,
      text: "Passed Business & Finance Exam! I can't thank Cruz enough for his guidance and this amazing course he created! Ended the year right! Happy New Year to you all!",
    },
    {
      id: "5",
      type: "written",
      studentName: "Tyler Cook",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/tyler-cook.jpg",
      image: "/images/testimonials/screenshots/floridaexamprep_testimonial_tylercook.jpg",
      rating: 5,
      text: "Winnnnn! Thanks to Cruz and thanks to this community I have accomplished something I really wanted to leave in 2025 and I did it thanks to everyone! You guys got this!",
    },
    {
      id: "6",
      type: "written",
      studentName: "Camila Lujan",
      examType: "General Contractor License",
      avatar: "/images/testimonials/avatars/camila-lujan.jpg",
      image: "/images/testimonials/screenshots/floridaexamprep_testimonial_camilalujan1.jpg",
      rating: 5,
      text: "Passed all 3! Just finished all 3 of my exams for the GC license. Seriously couldn't have done it without Cruz's course & the community behind it. Would recommend his course to everyone!",
    },
  ],
  // Row 3
  [
    {
      id: "7",
      type: "written",
      studentName: "Javier Rodriguez",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/javier-rodriguez.jpg",
      image: "/images/testimonials/screenshots/floridaexamprep_testimonial_javierrodriguez.jpg",
      rating: 5,
      text: "Passed!! If you're struggling with studying or feel like quitting... don't. I stepped away for almost two months because of personal issues. Came back, finished the remaining chapters, and passed. Grateful for Cruz's help and his CRAM course!",
    },
    {
      id: "1",
      type: "written",
      studentName: "Kevin Lopez",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/kevin-lopez.jpg",
      image: "/images/testimonials/screenshots/floridaexamprep_testimonial_kevinlopez.jpg",
      rating: 5,
      text: "PASSED THE BUSINESS AND FINANCE EXAM! Thank you Cruz for this course because it has helped me tremendously!",
    },
    {
      id: "video-2",
      type: "video",
      studentName: "Student Video",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/default-avatar.jpg",
      video: "/images/videostudant/videostudanttwo.mp4",
      rating: 5,
    },
  ],
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill={index < rating ? "#EAB308" : "#D1D5DB"}
        >
          <path d="M8 0L10.3511 5.52786L16 6.32295L12 10.2721L12.9443 16L8 13.5279L3.05573 16L4 10.2721L0 6.32295L5.64886 5.52786L8 0Z" />
        </svg>
      ))}
    </div>
  );
}

function BlueCheckmark() {
  return (
    <div className="relative w-5 h-5 flex-shrink-0">
      <div className="absolute inset-0 bg-blue-400 rounded-full" />
      <div className="absolute inset-[3.75px] bg-blue-600 rounded-full" />
      <svg className="absolute inset-0 w-5 h-5" viewBox="0 0 20 20" fill="none">
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.type === "video") {
    return (
      <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
        <div className="relative flex-1">
          <video
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          >
            <source src={testimonial.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-3 pt-3 pb-6 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col gap-4">
      {/* Image */}
      {testimonial.image && (
        <div className="relative h-48 w-full rounded-lg border border-gray-200 overflow-hidden">
          <Image
            src={testimonial.image}
            alt={`Testimonial from ${testimonial.studentName}`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Profile */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-4">
          <Image
            src={testimonial.avatar}
            alt={testimonial.studentName}
            width={64}
            height={64}
            className="rounded-full"
          />
          <BlueCheckmark />
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-black text-base font-normal font-rubik capitalize">
              {testimonial.studentName}
            </p>
            <p className="text-gray-400 text-sm font-normal font-rubik capitalize">
              {testimonial.examType}
            </p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Text */}
      {testimonial.text && (
        <p className="text-neutral-600 text-base font-normal font-rubik capitalize leading-6">
          {testimonial.text}
        </p>
      )}
    </div>
  );
}

export default function WrittenTestimonials() {
  return (
    <section className="w-full px-4 md:px-28 py-20 bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8">
        {/* Heading */}
        <div className="flex flex-col items-center gap-3">
          <div className="px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
            <span className="text-white text-xl font-medium font-rubik leading-8">
              DON'T TRY IT ALONE
            </span>
          </div>
          <h2 className="text-gray-800 text-3xl font-semibold font-clash-display uppercase leading-10">
            What Our Students Are Talking About Us
          </h2>
          <p className="text-center text-gray-500 text-xl font-normal font-rubik capitalize leading-8">
            Real Student Feedback From Our Community
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="w-full flex flex-col gap-6">
          {TESTIMONIALS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row gap-8">
              {row.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="h-12 px-8 py-4 bg-blue-950 rounded-lg flex items-center gap-4 hover:opacity-90 transition-opacity">
            <span className="text-white text-base font-medium font-rubik uppercase">
              Get That +90 Grade Now
            </span>
            <ArrowUpRight className="w-5 h-5 text-white" />
          </button>
          <button className="h-12 px-8 py-4 rounded-lg border-2 border-blue-950 flex items-center gap-4 hover:bg-blue-50 transition-colors">
            <span className="text-blue-950 text-base font-medium font-rubik uppercase">
              Load More
            </span>
            <MoreHorizontal className="w-5 h-5 text-blue-950" />
          </button>
        </div>
      </div>
    </section>
  );
}
