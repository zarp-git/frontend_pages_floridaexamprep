"use client";

export default function CheckoutHero() {
  return (
    <section className="w-full px-4 md:px-28 py-16 md:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-6">
        <h1 className="text-gray-800 text-5xl md:text-6xl lg:text-7xl font-bold font-red-hat uppercase text-center leading-tight">
          CHECKOUT
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-normal font-rubik text-center max-w-2xl leading-relaxed">
          Complete your purchase and start your journey to passing the Florida State Exam
        </p>
      </div>
    </section>
  );
}
