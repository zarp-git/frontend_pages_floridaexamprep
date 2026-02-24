"use client";

import { useEffect, useState } from "react";
import Header from "@/presentation/components/organisms/landing-page/Header";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    id: "1",
    title: "ARTICLE TITLE",
    description: "Description",
    author: "Cruz Greico",
    date: "January 24, 2026",
    image: "/images/blog/imageblog.png",
  },
  {
    id: "2",
    title: "ARTICLE TITLE",
    description: "Description",
    author: "Cruz Greico",
    date: "January 24, 2026",
    image: "/images/blog/imageblog.png",
  },
  {
    id: "3",
    title: "ARTICLE TITLE",
    description: "Description",
    author: "Cruz Greico",
    date: "January 24, 2026",
    image: "/images/blog/imageblog.png",
  },
];

const PROGRAM_TITLES = [
  "What are the best Schools to get approved in Business and Finance Exam?",
  "How to pass the Contract Administration Exam on your first try?",
  "Complete guide to Florida Contractor License Exam preparation",
  "Top 5 mistakes contractors make when studying for the exam",
];

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`w-96 pb-4 bg-white rounded-lg border border-gray-300 flex flex-col gap-3 overflow-hidden transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {/* Image */}
      <div className="w-full h-60 bg-gray-200 relative overflow-hidden group">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="px-6 py-2 flex flex-col gap-4">
        {/* Meta */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-sm font-normal font-rubik leading-6">
              By
            </span>
            <span className="text-gray-800 text-sm font-normal font-rubik leading-6">
              {article.author}
            </span>
          </div>
          <span className="text-gray-500 text-sm font-normal font-rubik leading-6">
            {article.date}
          </span>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 text-xl font-medium font-rubik leading-7">
            {article.title}
          </h3>
          <p className="text-gray-800 text-base font-normal font-rubik">
            {article.description}
          </p>
        </div>

        {/* CTA Button */}
        <button className="w-full px-4 py-3 bg-[#0866FF] rounded-lg hover:bg-[#00276F] transition-all duration-300 hover:scale-105">
          <span className="text-white text-xs font-medium font-rubik uppercase">
            read more
          </span>
        </button>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % PROGRAM_TITLES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Floating Image Circle - Transforms from featured article image */}
      {/* TODO: Improve this animation effect later */}
      {/* <div
        className={`fixed z-40 transition-all duration-700 ${
          scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          top: `96px`,
          right: `32px`,
        }}
      >
        <div className="relative w-20 h-20 overflow-hidden rounded-full shadow-2xl animate-spin-slow border-4 border-white">
          <Image
            src="/images/blog/imageblog.png"
            alt="Floating blog"
            fill
            className="object-cover"
          />
        </div>
      </div> */}

      <main className="w-full px-4 md:px-28 pt-10 pb-28 bg-neutral-100">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-12">
          {/* Heading */}
          <div className="flex justify-center items-start gap-3 animate-fade-in">
            <h1 className="text-center">
              <span className="text-blue-950 text-3xl font-semibold font-clash-display leading-8">
                EVERYTHING A{" "}
              </span>
              <span className="text-[#FF6200] text-3xl font-semibold font-clash-display leading-8">
                FUTURE CONTRACTOR{" "}
              </span>
              <span className="text-blue-950 text-3xl font-semibold font-clash-display leading-8">
                NEEDS TO KNOW
              </span>
            </h1>
          </div>

          {/* Featured Article */}
          <div className="w-full h-96 p-10 bg-black/70 rounded-xl flex flex-col justify-end items-center gap-2.5 overflow-hidden relative animate-slide-up">
            {/* Background Image with Animation */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/blog/imageblog.png"
                alt="Featured article"
                fill
                className="object-cover animate-ken-burns"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col gap-6">
              {/* Tags */}
              <div className="flex items-start gap-3">
                <div className="px-4 py-2.5 bg-[#FF6200] rounded-[79px] animate-bounce-subtle">
                  <span className="text-white text-xs font-medium font-rubik uppercase">
                    CONTRACTOR
                  </span>
                </div>
                <div className="px-4 py-2.5 bg-[#FF6200] rounded-[79px] animate-bounce-subtle animation-delay-200">
                  <span className="text-white text-xs font-medium font-rubik uppercase">
                    FLÓRIDA
                  </span>
                </div>
              </div>

              {/* Cycling Title */}
              <div className="h-20 overflow-hidden">
                <h2
                  key={currentTitleIndex}
                  className="text-white text-3xl font-bold font-plus-jakarta-sans leading-10 animate-slide-in-up"
                >
                  {PROGRAM_TITLES[currentTitleIndex]}
                </h2>
              </div>

              {/* Description */}
              <p className="w-full max-w-[678px] text-white text-xl font-normal font-rubik leading-8">
                Description...
              </p>

              {/* Meta */}
              <div className="flex justify-between items-center">
                <span className="text-gray-200 text-sm font-normal font-rubik leading-6">
                  February 12, 2026
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-200 text-sm font-normal font-rubik leading-6">
                    By
                  </span>
                  <span className="text-gray-300 text-sm font-normal font-rubik leading-6">
                    Cruz Greico
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid - Row 1 */}
          <div className="flex flex-col lg:flex-row gap-8">
            {ARTICLES.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          {/* Articles Grid - Row 2 */}
          <div className="flex flex-col lg:flex-row gap-8">
            {ARTICLES.map((article, index) => (
              <ArticleCard
                key={`row2-${article.id}`}
                article={article}
                index={index + 3}
              />
            ))}
          </div>

          {/* Articles Grid - Row 3 */}
          <div className="flex flex-col lg:flex-row gap-8">
            {ARTICLES.map((article, index) => (
              <ArticleCard
                key={`row3-${article.id}`}
                article={article}
                index={index + 6}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-2 animate-fade-in">
            {/* Previous */}
            <button
              disabled
              className="px-3 py-2 opacity-50 rounded-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-base font-normal font-inter leading-4">
                Previous
              </span>
            </button>

            {/* Pages */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-[#0866FF] rounded-full transition-all hover:scale-110">
                <span className="text-white text-base font-normal font-inter leading-4">
                  1
                </span>
              </button>
              <button className="px-3 py-2 rounded-full hover:bg-gray-200 transition-all">
                <span className="text-gray-500 text-base font-normal font-inter leading-4">
                  2
                </span>
              </button>
              <button className="px-3 py-2 rounded-full hover:bg-gray-200 transition-all">
                <span className="text-gray-500 text-base font-normal font-inter leading-4">
                  3
                </span>
              </button>
              <div className="px-4 py-2">
                <span className="text-gray-300 text-base font-bold font-inter leading-6">
                  ...
                </span>
              </div>
              <button className="px-3 py-2 rounded-full hover:bg-gray-200 transition-all">
                <span className="text-gray-500 text-base font-normal font-inter leading-4">
                  67
                </span>
              </button>
              <button className="px-3 py-2 rounded-full hover:bg-gray-200 transition-all">
                <span className="text-gray-500 text-base font-normal font-inter leading-4">
                  68
                </span>
              </button>
            </div>

            {/* Next */}
            <button className="px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-all">
              <span className="text-gray-400 text-base font-normal font-inter underline leading-4">
                Next
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </main>

      <LandingFooter />

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ken-burns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }

        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
