import React from "react";
import Image from "next/image";
import { CtaButton } from "@/presentation/components/molecules/common/CtaButton";

export const InstallationTrustSection = () => {
  return (
    <section id="installation-trust" className="py-10 sm:py-14 md:py-20 bg-white">
      <div className="section-container flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
        <h2 className="text-foreground text-2xl sm:text-3xl font-black font-red-hat uppercase leading-tight tracking-wide text-center">
          installation you can trust
        </h2>

        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-12">
          {/* Image */}
          <div className="relative w-full md:w-1/2 lg:w-[600px] h-48 sm:h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden">
            <Image
              src="/images/sections-images/installation-trust-section-pavers-layers.png"
              alt="Professional installation layers"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-start items-start gap-7">
            <div className="flex flex-col justify-start items-start gap-4">
              <h3 className="text-foreground text-xl font-bold font-red-hat uppercase leading-tight tracking-tight">
                Built to Handle the Pressure
              </h3>
              <div className="text-muted-foreground text-base font-normal font-rubik leading-6">
                <p>
                  Unlike crackable concrete, interlocking paving stones are
                  designed to last for decades.
                </p>
                <br />
                <p>
                  Pavers can handle up to 8,000 PSI (compared to 4,000 PSI for
                  concrete) to ensure cars, trucks, and RVs won&apos;t ruin your
                  investment.
                </p>
              </div>
            </div>

            <CtaButton />
          </div>
        </div>
      </div>
    </section>
  );
};
