import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";

interface Pillar {
  number: string;
  icon: string;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    number: "1",
    icon: "/images/svg/BulletIcon1.svg",
    title: "GUIDED METHOD",
    description:
      "A clear study plan that eliminates wasted time on wrong material. You know exactly what to study, in the right order, covering only what actually appears on the exam.",
  },
  {
    number: "2",
    icon: "/images/svg/bulleticon2.svg",
    title: "BOOK MASTERY",
    description:
      "Learn to navigate the books during the open-book exam, finding answers with speed and precision. While others waste 5 minutes searching, you've already marked your answer and moved on.",
  },
  {
    number: "3",
    icon: "/images/svg/BulletIcon3.svg",
    title: "REAL PRACTICE",
    description:
      "20+ timed practice exams at the same level as the official test. You'll feel the time pressure, recognize the tricks, and know exactly where you need to improve before exam day.",
  },
  {
    number: "4",
    icon: "/images/svg/BulletIcon4.svg",
    title: "ACTIVE COMMUNITY",
    description:
      "A network of students on the same path. Ask questions, stay motivated, and celebrate wins with people who actually understand what you're achieving.",
  },
  {
    number: "5",
    icon: "/images/svg/BulletIcon5.svg",
    title: "MULTILINGUAL ACCESS",
    description:
      "Full content available in English, Spanish, and Portuguese. Your language should never be the obstacle between you and your license.",
  },
];

function PillarIcon({ icon }: { icon: string }) {
  return (
    <div className="w-24 h-20 relative flex-shrink-0">
      <Image
        src={icon}
        alt="Pillar icon"
        width={96}
        height={80}
        className="w-full h-full"
      />
    </div>
  );
}

function DiplomaIcon() {
  return (
    <div className="w-24 h-20 relative flex-shrink-0">
      <Image
        src="/images/svg/VectorIcon.svg"
        alt="Diploma icon"
        width={96}
        height={80}
        className="w-full h-full"
      />
    </div>
  );
}

export default function PillarsSection() {
  return (
    <section className="w-full px-4 md:px-56 py-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col justify-center items-center gap-6">
        {/* Heading */}
        <div className="flex flex-col justify-start items-center gap-3">
          <h2 className="text-center text-sky-950 text-3xl font-bold font-red-hat-display uppercase leading-[52.80px]">
            THE 5 PILLARS THAT TURN CANDIDATES INTO LICENSED CONTRACTORS:
          </h2>
          <p className="text-center text-neutral-800 text-xl font-normal font-rubik leading-6">
            Most contractors fail not because they lack skill — but because they had no plan. They
            studied hard. They showed up on exam day. And still walked out without a passing score.
            <br />
            You won't.
          </p>
        </div>

        {/* Pillars List */}
        <div className="w-full flex flex-col justify-start items-center gap-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.number} className="w-full pt-4 flex justify-start items-start gap-8">
              <PillarIcon icon={pillar.icon} />
              <div className="flex-1 flex flex-col justify-start items-start">
                <h3 className="text-neutral-800 text-base font-bold font-rubik leading-6">
                  {pillar.title}
                </h3>
                <p className="text-neutral-800 text-2xl font-normal font-rubik leading-8">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}

          {/* Final Item - Your Approval */}
          <div className="w-full pt-4 flex justify-start items-start gap-8">
            <DiplomaIcon />
            <div className="flex-1 flex flex-col justify-start items-start">
              <h3 className="text-neutral-800 text-base font-bold font-rubik leading-6">
                YOUR APPROVAL
              </h3>
              <p className="text-neutral-800 text-2xl font-normal font-rubik leading-8">
                You've seen what holds most people back. You know what it takes to pass. Now it's
                time to decide: keep guessing, or follow the proven path.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <PrimaryButton 
          variant="blue-solid" 
          size="lg"
          icon={<ArrowUpRight className="w-5 h-5" />}
          iconPosition="right"
        >
          get THAT +90 GRADE now
        </PrimaryButton>
      </div>
    </section>
  );
}
