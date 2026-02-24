import Image from "next/image";
import { ArrowUpRight, Laptop, Video, Compass, MonitorCheck, FileStack } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";

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
    <section className="w-full px-4 md:px-28 py-20 bg-gradient-to-b from-sky-400 via-[#00091C] via-50% to-[#00091C]">
      <div className="max-w-[1440px] mx-auto flex flex-col justify-center items-center gap-8">
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Left Content */}
          <div className="flex-1 py-1.5 flex flex-col justify-start items-start gap-7">
            {/* Heading */}
            <div className="w-full flex flex-col justify-start items-start gap-5">
              <h2 className="w-full text-white text-3xl font-extrabold font-red-hat-display uppercase leading-10">
                STOP STUDYING ALONE. ENROLL TODAY & GUARANTEE THESE{" "}
                <span className="text-sky-400">EXCLUSIVE</span> BENEFITS
              </h2>
              <p className="w-full text-white text-xl font-medium font-rubik leading-8">
                When you enroll, you get:
              </p>
            </div>

            {/* Benefits List */}
            <div className="w-80 flex flex-col justify-start items-start gap-4">
              {BENEFITS.map((benefit, index) => (
                <div key={index} className="w-80 flex justify-start items-center gap-2">
                  {benefit.icon}
                  <p className="text-white text-base font-medium font-rubik leading-5">
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
            >
              get THAT +90 GRADE now
            </PrimaryButton>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[632px] h-[512px] relative">
            <Image
              src="/images/platform-banner.png"
              alt="Platform preview"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
