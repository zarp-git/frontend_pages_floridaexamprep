"use client";

import { useState, useEffect } from "react";

const contractorTypes = [
  "General Contractor",
  "Building Contractor",
  "Residential Contractor",
];

export default function RotatingContractorTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % contractorTypes.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block transition-all duration-500 ${
        isAnimating ? "opacity-0 transform -translate-y-2" : "opacity-100 transform translate-y-0"
      }`}
    >
      {contractorTypes[currentIndex]}
    </span>
  );
}
