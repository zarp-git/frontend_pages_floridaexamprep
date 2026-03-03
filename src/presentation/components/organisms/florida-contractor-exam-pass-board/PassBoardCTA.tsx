import { ArrowUpRight } from "lucide-react";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { CTA_TEXT } from "@/constants";

export function PassBoardCTA() {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-6 sm:p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-10 -mb-10"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide uppercase font-rubik">
            Your Turn to Shine
          </div>

          <h2 className="text-[#002770] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight font-red-hat">
            Do you see those names up there? <br />
            <span className="text-primary">
              Next month, yours belongs right alongside them.
            </span>
          </h2>

          <div className="space-y-6 text-base sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed font-rubik">
            <p>
              Imagine waking up, logging in, and seeing{" "}
              <span className="italic font-bold text-gray-900">
                your
              </span>{" "}
              name etched onto the Florida Exam Prep Pass Board. It&apos;s more
              than just a list—it&apos;s the definitive proof that you&apos;ve
              mastered the material and are ready to take your career to the
              stratosphere.
            </p>

            <p>
              But here&apos;s the cold, hard truth: That spot won&apos;t just
              &quot;happen.&quot; The students you see above didn&apos;t rely on
              luck. They relied on a proven system. They chose the exact same
              curriculum that has been minting Florida&apos;s top professionals
              since 1995.
            </p>

            <p className="text-gray-900 font-bold">
              Your &quot;Pass Board&quot; moment is waiting. Are you ready to
              claim it?
            </p>
          </div>

          <div className="pt-4 w-full sm:w-auto">
            <PrimaryButton
              variant="blue"
              size="lg"
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
              href="/courses"
              className="w-full sm:w-auto px-10 py-5 text-base sm:text-lg font-black"
            >
              {CTA_TEXT}
            </PrimaryButton>
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest font-rubik">
              Instant Access to the Florida Success Blueprint
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
