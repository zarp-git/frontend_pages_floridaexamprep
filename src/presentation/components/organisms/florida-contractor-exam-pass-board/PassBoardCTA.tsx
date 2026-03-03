import Link from "next/link";

export function PassBoardCTA() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-700 p-8 md:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-10 -mb-10"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide uppercase">
            Your Turn to Shine
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight font-red-hat">
            Do you see those names up there? <br />
            <span className="text-primary">
              Next month, yours belongs right alongside them.
            </span>
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            <p>
              Imagine waking up, logging in, and seeing{" "}
              <span className="italic font-bold text-slate-900 dark:text-slate-200">
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

            <p className="text-slate-900 dark:text-slate-100 font-bold">
              Your &quot;Pass Board&quot; moment is waiting. Are you ready to
              claim it?
            </p>
          </div>

          <div className="pt-4 w-full md:w-auto">
            <Link
              href="/courses"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary hover:bg-primary/90 text-white font-black text-xl rounded-2xl transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(19,127,236,0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Secure Your Spot Now</span>
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Instant Access to the Florida Success Blueprint
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
