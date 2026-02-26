import Image from "next/image";
import {
  ArrowUpRight,
  Laptop,
  Video,
  Compass,
  MonitorCheck,
  FileStack,
} from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";

interface Benefit {
  icon: React.ReactNode;
  text: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: <Laptop className="w-5 h-5 text-sky-500" />,
    text: "Exclusive members-only platform available 24/7",
  },
  {
    icon: <Video className="w-5 h-5 text-sky-500" />,
    text: "Professional-quality video lessons",
  },
  {
    icon: <Compass className="w-5 h-5 text-sky-500" />,
    text: "Practice quizzes that prepare you for the real thing",
  },
  {
    icon: <MonitorCheck className="w-5 h-5 text-sky-500" />,
    text: "Support whenever you need it",
  },
  {
    icon: <FileStack className="w-5 h-5 text-sky-500" />,
    text: "Bonus materials no one else has access to",
  },
];

export default function PlatformSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-28 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-sky-400 via-[#00091C] via-50% to-[#00091C]">
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8">
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 w-full py-1.5 flex flex-col justify-start items-start gap-5 sm:gap-7">
            {/* Heading */}
            <div className="w-full flex flex-col justify-start items-start gap-3 sm:gap-5">
              <h2 className="w-full text-white text-xl sm:text-2xl md:text-3xl font-extrabold font-red-hat uppercase leading-tight">
                STOP STUDYING ALONE. ENROLL TODAY & GUARANTEE THESE{" "}
                <span className="text-sky-400">EXCLUSIVE</span> BENEFITS
              </h2>
              <p className="w-full text-white text-base sm:text-lg md:text-xl font-medium font-rubik leading-relaxed">
                When you enroll, you get:
              </p>
            </div>

            {/* Benefits List */}
            <div className="w-full max-w-md flex flex-col justify-start items-start gap-3 sm:gap-4">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-start sm:items-center gap-2 sm:gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    {benefit.icon}
                  </div>
                  <p className="flex-1 text-white text-sm sm:text-base font-medium font-rubik leading-snug">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <PrimaryButton
              variant="orange"
              size="lg"
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              {CTA_TEXT}
            </PrimaryButton>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 max-w-2xl h-64 sm:h-80 md:h-96 lg:h-[512px] relative rounded-lg overflow-hidden">
            <Image
              src="/images/courses/platform-banner.png"
              alt="Platform preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
