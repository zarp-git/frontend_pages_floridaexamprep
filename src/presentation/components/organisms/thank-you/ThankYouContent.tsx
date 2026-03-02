"use client";

import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PrimaryButton } from "@/presentation/components/atoms/PrimaryButton";
import { motion } from "framer-motion";

export default function ThankYouContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-600 relative" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-red-hat text-gray-900 mb-4"
          >
            Thank You for Your Purchase!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 font-rubik mb-8"
          >
            Welcome to Florida Exam Prep! Your journey to passing the exam starts now.
          </motion.p>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-lg font-bold font-rubik text-gray-900 mb-3">
              What happens next?
            </h2>
            <ul className="text-left space-y-3 text-gray-700 font-rubik">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>You will receive a confirmation email with your order details</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Access to your course materials will be sent to your email</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Join our community and start learning immediately</span>
              </li>
            </ul>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/" className="w-full sm:w-auto">
              <PrimaryButton
                variant="blue"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full"
              >
                Back to Home
              </PrimaryButton>
            </Link>
          </motion.div>

          {/* Support Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm text-gray-500 font-rubik"
          >
            Need help? Contact us at{" "}
            <a
              href="mailto:cruzvinci@floridaexamprep.com"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              cruzvinci@floridaexamprep.com
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
