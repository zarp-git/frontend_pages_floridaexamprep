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
  rating: number;
  text?: string;
}

const TESTIMONIALS: Testimonial[][] = [
  [
    {
      id: "1",
      type: "video",
      studentName: "Student",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/student-1.jpg",
      rating: 5,
    },
    {
      id: "2",
      type: "written",
      studentName: "Student",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/student-2.jpg",
      image: "/images/testimonials/screenshots/screenshot-1.jpg",
      rating: 5,
      text: "Look At This! LOOK AT THIS!!! Is This Not Gorgeous! I Passed My Contractor Exam And Got My License Thanks To Florida Exam Prep! Their Team Meticulously Planned, Communicated Every Detail, And Got Me Back On The Right Track In Excellent Time.",
    },
    {
      id: "3",
      type: "written",
      studentName: "Student",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/student-3.jpg",
      image: "/images/testimonials/screenshots/screenshot-2.jpg",
      rating: 5,
      text: "Look At This! LOOK AT THIS!!! Is This Not Gorgeous! I Passed My Contractor Exam And Got My License Thanks To Florida Exam Prep! Their Team Meticulously Planned, Communicated Every Detail, And Got Me Back On The Right Track In Excellent Time.",
    },
  ],
  [
    {
      id: "4",
      type: "written",
      studentName: "Student",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/student-4.jpg",
      image: "/images/testimonials/screenshots/screenshot-3.jpg",
      rating: 5,
      text: "Passed In A Timely Manner And Now I'm A Licensed Contractor. From Start To Finish, I Highly Recommend Florida Exam Prep To Anyone Looking To Get Their Contractor License And Start Their Career.",
    },
    {
      id: "5",
      type: "written",
      studentName: "Student",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/student-5.jpg",
      image: "/images/testimonials/screenshots/screenshot-4.jpg",
      rating: 5,
      text: "Passed In A Timely Manner And Now I'm A Licensed Contractor. From Start To Finish, I Highly Recommend Florida Exam Prep To Anyone Looking To Get Their Contractor License And Start Their Career.",
    },
    {
      id: "6",
      type: "video",
      studentName: "Student",
      examType: "Business & Finance Exam",
      avatar: "/images/testimonials/avatars/student-6.jpg",
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
        <div className="relative flex-1 bg-gradient-to-br from-neutral-500 via-zinc-600 to-zinc-800">
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </button>
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
