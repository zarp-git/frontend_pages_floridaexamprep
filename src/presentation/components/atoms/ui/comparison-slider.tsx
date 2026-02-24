"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RiDraggable } from "@remixicon/react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initialPosition?: number;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  initialPosition = 50,
}: ComparisonSliderProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);

  // No JS animation loop - using CSS for optimization

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsResizing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsResizing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isResizing || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;

      setPosition(percentage);
    },
    [isResizing],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden select-none touch-none bg-gray-100 cursor-ew-resize group",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-valuenow={position}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
    >
      {/* After Image (Background) */}
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        className="object-cover object-center pointer-events-none select-none"
        priority
      />

      {/* After Label */}
      <div
        className={cn(
          "absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-md text-sm font-medium transition-opacity duration-300",
          position > 90 ? "opacity-0" : "opacity-100",
        )}
      >
        {afterLabel}
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover object-center"
          priority
        />

        {/* Before Label */}
        <div
          className={cn(
            "absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-md text-sm font-medium transition-opacity duration-300",
            position < 10 ? "opacity-0" : "opacity-100",
          )}
        >
          {beforeLabel}
        </div>
      </div>

      {/* Divider Line */}
      <div
        className="absolute inset-y-0 w-1 bg-white pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <button
        ref={handleRef}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-6 h-10 bg-white rounded-md flex items-center justify-center text-gray-800 z-20 focus:outline-none focus:ring-4 focus:ring-primary/40 transition-[transform] duration-200 hover:scale-110 active:scale-95",
          isResizing && "scale-110 ring-4 ring-primary/40",
        )}
        style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
        aria-label="Drag to compare images"
      >
        <RiDraggable className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}
