"use client";

import GHLIframeContainer from "./GHLIframeContainer";
import type { CourseSlug } from "@/types/courses";

interface CheckoutContentProps {
  courseSlug: CourseSlug;
}

const testimonialScreenshots = [
  "/images/testimonials/screenshots/floridaexamprep_testimonial_danielpryor.jpg",
  "/images/testimonials/screenshots/floridaexamprep_testimonial_javierrodriguez.jpg",
  "/images/testimonials/screenshots/floridaexamprep_testimonial_joelkennedy.jpg",
  "/images/testimonials/screenshots/floridaexamprep_testimonial_kevinlopez.jpg",
  "/images/testimonials/screenshots/floridaexamprep_testimonial_oryangrey.jpg",
  "/images/testimonials/screenshots/floridaexamprep_testimonial_tylercook.jpg",
];

export default function CheckoutContent({ courseSlug }: CheckoutContentProps) {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm">
              <GHLIframeContainer courseSlug={courseSlug} />
            </div>
          </div>

          {/* Right Column - Social Proof */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                Students Pass Board
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Join thousands who passed their Florida State Exam
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {testimonialScreenshots.map((screenshot, index) => (
                  <div 
                    key={index}
                    className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={screenshot}
                      alt={`Student testimonial ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Real students, real results</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
