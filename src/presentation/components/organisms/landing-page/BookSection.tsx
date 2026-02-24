import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Book {
  title: string;
  subtitle: string;
}

const BOOKS: Book[] = [
  {
    title: "Florida Contractors Manual 2025 Edition",
    subtitle: "Division 1 and Division 2 Contractors",
  },
  {
    title: "Builders Guide to Accounting",
    subtitle: "Division 1 and Division 2 Contractors",
  },
  {
    title: "AIA 201, 401, 701",
    subtitle: "Division 1 and Division 2 Contractors",
  },
];

export default function BookSection() {
  return (
    <section className="w-full px-4 md:px-28 py-20 bg-gradient-to-br from-sky-500 to-blue-700/0 backdrop-blur-sm overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-start gap-5">
          {/* Chip */}
          <div className="px-4 py-1.5 bg-white/20 rounded-full border border-gray-700 backdrop-blur-sm">
            <span className="text-white text-base font-medium font-rubik leading-8">
              NEED THE REQUIRED BOOKS?
            </span>
          </div>

          {/* Heading */}
          <h2 className="w-full max-w-[657px] text-white text-3xl font-bold font-red-hat-display uppercase leading-8">
            We&apos;ve got you covered.
            <br />
            Here are the essential books you&apos;ll need to pass the exam
          </h2>

          {/* Subtitle */}
          <p className="text-center text-white text-xl font-normal font-rubik leading-8">
            You will need these books
          </p>

          {/* Book Cards */}
          <div className="flex flex-col md:flex-row justify-start items-start gap-4">
            {BOOKS.map((book, index) => (
              <div
                key={index}
                className="w-64 p-[0.83px] bg-zinc-100 rounded-md border border-gray-300 flex flex-col justify-start items-start overflow-hidden"
              >
                <div className="w-full h-36 px-3.5 pt-3 pb-3.5 flex flex-col justify-between items-center">
                  {/* Book Title */}
                  <div className="w-full flex flex-col justify-start items-start gap-2.5">
                    <h3 className="w-full text-gray-800 text-base font-extrabold font-red-hat-display leading-5">
                      {book.title}
                    </h3>
                  </div>

                  {/* Book Subtitle */}
                  <p className="text-gray-600 text-xs font-medium font-rubik leading-4">
                    {book.subtitle}
                  </p>

                  {/* CTA Button */}
                  <button className="w-full h-11 px-7 py-3.5 bg-sky-500 rounded-md flex justify-center items-center gap-3.5 hover:bg-sky-600 transition-colors">
                    <span className="text-center text-white text-sm font-medium font-rubik uppercase">
                      get access now
                    </span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image - Ebook */}
        <div className="relative w-80 h-96 flex-shrink-0">
          <Image
            src="/images/svg/ebook.svg"
            alt="Ebook"
            width={333}
            height={406}
            className="w-full h-full rotate-[7.52deg] origin-top-left"
          />
        </div>
      </div>
    </section>
  );
}
