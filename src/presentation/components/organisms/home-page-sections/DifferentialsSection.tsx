"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RiCloseLine, RiCheckLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Feature {
  title: string;
  description: string;
}

interface TabData {
  label: string;
  subtitle: string;
  others: {
    title: string;
    image: string;
    features: Feature[];
  };
  ours: {
    title: string;
    image: string;
    features: Feature[];
  };
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const TABS: TabData[] = [
  {
    label: "Driveways",
    subtitle:
      "Maximize curb appeal with a stunning paving stone driveway that adds lasting value and sophisticated beauty.",
    others: {
      title: "Other Driveways",
      image:
        "/images/sections-images/difference-section-driveway-paver-others.jpg",
      features: [
        {
          title: "Cracks Easily",
          description: "Crumbles and cracks over time",
        },
        {
          title: "No Variety",
          description: "Few options in customizing besides shape",
        },
        {
          title: "Looks Dated",
          description: "Discolors over time and can hurt property value",
        },
        {
          title: "No/Limited Warranties",
          description:
            "Improperly installed jobs typically last 05 years or less and are unable to be warranted",
        },
      ],
    },
    ours: {
      title: "AllBrick Pavers Driveways",
      image:
        "/images/sections-images/difference-section-driveway-paver-ours.webp",
      features: [
        {
          title: "No Cracking or Crumbling",
          description:
            "Evenly distributes weight to handle 2x more than concrete",
        },
        {
          title: "Unlimited Customization",
          description: "Wide variety of stone colors, shapes & designs",
        },
        {
          title: "Curb Appeal",
          description: "Beauty that won't discolor over time",
        },
        {
          title: "Built to Last",
          description: "Covered by industry-leading warranties",
        },
      ],
    },
  },
  {
    label: "Patio Pavers",
    subtitle:
      "Transform your backyard into a luxurious outdoor living space with custom-designed patio pavers.",
    others: {
      title: "Other Patios",
      image: "/images/sections-images/difference-section-pavers-floor.png",
      features: [
        {
          title: "Uneven Surfaces",
          description: "Settling and shifting leads to trip hazards",
        },
        {
          title: "Plain Appearance",
          description: "Limited design options that look generic",
        },
        {
          title: "Weather Damage",
          description: "Cracks and deteriorates with temperature changes",
        },
        {
          title: "Costly Repairs",
          description:
            "Full slab replacement needed even for small damage areas",
        },
      ],
    },
    ours: {
      title: "AllBrick Pavers Patios",
      image: "/images/sections-images/patio-pavers-1-after-1.webp",
      features: [
        {
          title: "Perfect Leveling",
          description:
            "Precision-installed for a smooth, even finish every time",
        },
        {
          title: "Custom Designs",
          description: "Endless patterns, colors, and layout possibilities",
        },
        {
          title: "Weather Resistant",
          description: "Built to withstand Florida heat, rain, and humidity",
        },
        {
          title: "Easy Repairs",
          description: "Individual pavers can be replaced without full rework",
        },
      ],
    },
  },
  {
    label: "Pool Decks",
    subtitle:
      "Create a safe, stylish pool area with slip-resistant pavers designed for Florida weather.",
    others: {
      title: "Other Pool Decks",
      image: "/images/sections-images/pool-deck-before.jpeg",
      features: [
        {
          title: "Slippery When Wet",
          description:
            "Smooth surfaces create dangerous conditions around pools",
        },
        {
          title: "Heat Absorption",
          description: "Gets painfully hot under direct sunlight",
        },
        {
          title: "Staining Issues",
          description: "Pool chemicals cause permanent discoloration",
        },
        {
          title: "Short Lifespan",
          description: "Constant water exposure breaks down materials quickly",
        },
      ],
    },
    ours: {
      title: "AllBrick Pavers Pool Decks",
      image: "/images/sections-images/pool-deck-after.jpg",
      features: [
        {
          title: "Slip-Resistant",
          description: "Textured surfaces designed for wet-area safety",
        },
        {
          title: "Cool Underfoot",
          description: "Specially selected materials that stay comfortable",
        },
        {
          title: "Chemical Resistant",
          description: "Won't stain or degrade from pool chemicals",
        },
        {
          title: "Lifetime Durability",
          description: "Engineered for constant water and sun exposure",
        },
      ],
    },
  },
  {
    label: "Fire Pits",
    subtitle:
      "Add warmth and elegance to your outdoor space with a custom-built fire pit area.",
    others: {
      title: "Other Fire Pits",
      image: "/images/sections-images/difference-section-concrete-floor.png",
      features: [
        {
          title: "Heat Damage",
          description:
            "Surrounding materials crack from repeated heat exposure",
        },
        {
          title: "Poor Integration",
          description: "Looks disconnected from the rest of the yard",
        },
        {
          title: "Safety Concerns",
          description: "Improper construction creates fire hazards",
        },
        {
          title: "Limited Design",
          description: "Basic shapes with no customization options",
        },
      ],
    },
    ours: {
      title: "AllBrick Pavers Fire Pits",
      image: "/images/sections-images/firepit-pavers-1-after-1.webp",
      features: [
        {
          title: "Heat-Rated Materials",
          description: "Purpose-built pavers that withstand high temperatures",
        },
        {
          title: "Seamless Design",
          description: "Integrated with your patio for a cohesive look",
        },
        {
          title: "Professional Build",
          description: "Code-compliant construction for total peace of mind",
        },
        {
          title: "Custom Shapes",
          description: "Round, square, or any design you envision",
        },
      ],
    },
  },
  {
    label: "Walkways",
    subtitle:
      "Guide your guests to the front door with a beautifully crafted walkway that makes a lasting impression.",
    others: {
      title: "Other Walkways",
      image: "/images/sections-images/cracked-pavers.jpg",
      features: [
        {
          title: "Cracking & Settling",
          description: "Uneven surfaces that become trip hazards over time",
        },
        {
          title: "Weed Growth",
          description: "Poor installation allows weeds to push through",
        },
        {
          title: "Boring Layouts",
          description: "Straight paths with no design character",
        },
        {
          title: "Quick Deterioration",
          description: "Materials break down within a few years",
        },
      ],
    },
    ours: {
      title: "AllBrick Pavers Walkways",
      image: "/images/sections-images/walkway-pavers.webp",
      features: [
        {
          title: "Precision Installed",
          description: "Proper base preparation prevents settling and shifting",
        },
        {
          title: "Weed Prevention",
          description: "Polymeric sand joints block weed growth permanently",
        },
        {
          title: "Creative Designs",
          description: "Curved paths, borders, and patterns that stand out",
        },
        {
          title: "Decades of Beauty",
          description: "Materials built to last 25+ years with minimal upkeep",
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function DifferentialsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = TABS[activeTab];

  return (
    <section
      id="differentials"
      className="py-10 lg:py-16 bg-white overflow-hidden"
    >
      {/* ── Tabs ── */}
      <div className="section-container flex justify-center mb-6">
        <div className="flex gap-1 p-1 rounded-xl border border-primary overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-normal font-rubik leading-tight whitespace-nowrap transition-all",
                activeTab === index
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Heading ── */}
      <div className="section-container text-center mb-6 lg:mb-8">
        <h2 className="text-gray-800 text-2xl md:text-3xl font-black font-red-hat uppercase leading-tight tracking-wide mb-4">
          The AllBrick Pavers Difference
        </h2>
        <p className="text-gray-600 text-base font-normal font-rubik leading-6 max-w-2xl mx-auto">
          {currentTab.subtitle}
        </p>
      </div>

      {/* ── Comparison Cards ── */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Others Card */}
          <ComparisonCard
            title={currentTab.others.title}
            image={currentTab.others.image}
            features={currentTab.others.features}
            variant="negative"
          />

          {/* AllBrick Card */}
          <ComparisonCard
            title={currentTab.ours.title}
            image={currentTab.ours.image}
            features={currentTab.ours.features}
            variant="positive"
          />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ComparisonCard
// ---------------------------------------------------------------------------
interface ComparisonCardProps {
  title: string;
  image: string;
  features: Feature[];
  variant: "positive" | "negative";
}

function ComparisonCard({
  title,
  image,
  features,
  variant,
}: ComparisonCardProps) {
  const isPositive = variant === "positive";

  return (
    <div className="flex-1 rounded-[10px] flex flex-col gap-5 overflow-hidden">
      {/* -- Hero Image -- */}
      <div className="relative h-48 md:h-52 lg:h-56 w-full rounded-[10px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
        <h3 className="absolute top-5 left-5 text-white text-base lg:text-lg font-bold font-red-hat leading-6 tracking-wide uppercase">
          {title}
        </h3>
      </div>

      {/* -- Features Grid (2x2) -- */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center gap-2 p-2 sm:p-3 rounded-lg"
          >
            <div
              className={cn(
                "size-10 rounded-full flex items-center justify-center shrink-0",
                isPositive ? "bg-green-50" : "bg-red-50",
              )}
            >
              {isPositive ? (
                <RiCheckLine className="size-5 text-green-600" />
              ) : (
                <RiCloseLine className="size-5 text-red-500" />
              )}
            </div>
            <h4 className="text-gray-900 text-xs sm:text-sm lg:text-base font-medium font-red-hat leading-5 tracking-tight text-center">
              {feature.title}
            </h4>
            <p className="text-gray-600 text-[11px] sm:text-xs lg:text-sm font-normal font-rubik leading-4 sm:leading-5 text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
