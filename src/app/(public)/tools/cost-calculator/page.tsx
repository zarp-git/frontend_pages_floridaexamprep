"use client";

import React, { useState, useMemo } from "react";
import {
  RiHome4Line,
  RiRoadsterLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiPercentLine,
  RiTruckLine,
  RiGroupLine,
  RiGasStationLine,
  RiStackLine,
} from "@remixicon/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ProjectType = "patio" | "driveway";

interface CalcResults {
  quote: number;
  pricePerSf: number;
  internalCost: number;
  materials: number;
  labor: number;
  driver: number;
  fuel: number;
  delivery: number;
  profit: number;
  netMarginPercent: number;
  installDays: number;
  totalDays: number;
  profitPerDay: number;
  netProfitPerDay: number;
}

// ---------------------------------------------------------------------------
// Pricing Constants (from AllBrick Pricing Sheet v18)
// ---------------------------------------------------------------------------
const MATERIAL_COST_PER_SF = 2.925; // Pavers $2.5145 + Sand $0.05 + Base $0.30 + Cement $0.03 ≈ $2.925
const PROFIT_FLOOR_PER_DAY = 1714.29; // Nets $1,200/day after 30% tax
const TAX_RATE = 0.30;

const LABOR_CONFIG = {
  patio: { minimums: { 300: 570, 500: 770 }, perSf: 1.80, perSfThreshold: 600 },
  driveway: { minimums: { 500: 770 }, perSf: 1.40, perSfThreshold: 600 },
};

const DRIVER_RATE = { patio: 220, driveway: 270 };

// ---------------------------------------------------------------------------
// Calculation Engine
// ---------------------------------------------------------------------------
function getInstallDays(sqft: number, type: ProjectType): number {
  if (type === "patio") {
    if (sqft < 1000) return 1;
    if (sqft < 1600) return 2;
    return 3;
  }
  // Driveway: only install days (demo days excluded from profit calc)
  if (sqft < 1400) return 1;
  return 2;
}

function getTotalDays(sqft: number, type: ProjectType): number {
  if (type === "patio") return getInstallDays(sqft, type);
  // Driveway: demo days = install days
  return getInstallDays(sqft, type) * 2;
}

function getLabor(sqft: number, type: ProjectType): number {
  const config = LABOR_CONFIG[type];
  // Check minimums (sorted ascending by sqft threshold)
  const thresholds = Object.entries(config.minimums)
    .map(([k, v]) => [Number(k), v] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  for (const [threshold, minLabor] of thresholds) {
    if (sqft <= threshold) return minLabor;
  }

  if (sqft < config.perSfThreshold) {
    // Between last minimum threshold and per-sf threshold
    return thresholds[thresholds.length - 1][1];
  }

  return Math.round(sqft * config.perSf);
}

function getDriver(sqft: number, type: ProjectType): number {
  return DRIVER_RATE[type] * getTotalDays(sqft, type);
}

function getFuel(sqft: number, type: ProjectType): number {
  if (type === "patio") {
    return 50 * getInstallDays(sqft, type);
  }
  return sqft < 1400 ? 100 : 200;
}

function getDelivery(sqft: number, type: ProjectType): number {
  if (type === "patio") {
    if (sqft <= 500) return 0;
    if (sqft <= 1300) return 350;
    return 700;
  }
  // Driveway
  if (sqft <= 1300) return 350;
  return 700;
}

function getTierPricePerSf(sqft: number, type: ProjectType): number | null {
  if (type === "patio") {
    if (sqft < 400) return null;
    if (sqft < 500) return 10.0;
    if (sqft < 1000) return 9.5;
    if (sqft < 1600) return 9.0;
    return 8.75;
  }
  // Driveway — implicit $9.00/sf tier for <800, explicit tiers above
  if (sqft < 800) return 9.0;
  if (sqft < 1100) return 10.0;
  if (sqft < 1400) return 9.0;
  return 8.75;
}

function calculate(sqft: number, type: ProjectType): CalcResults {
  const clampedSqft = Math.max(sqft, type === "driveway" ? 500 : 100);

  const materials = Math.round(clampedSqft * MATERIAL_COST_PER_SF);
  const labor = getLabor(clampedSqft, type);
  const driver = getDriver(clampedSqft, type);
  const fuel = getFuel(clampedSqft, type);
  const delivery = getDelivery(clampedSqft, type);
  const installDays = getInstallDays(clampedSqft, type);
  const totalDays = getTotalDays(clampedSqft, type);

  const internalCost = materials + labor + driver + fuel + delivery;

  // Tier pricing
  const tierPerSf = getTierPricePerSf(clampedSqft, type);
  const tierPrice = tierPerSf ? clampedSqft * tierPerSf : 0;

  // Minimum pricing (profit floor)
  let minPrice = internalCost + PROFIT_FLOOR_PER_DAY * installDays;
  if (type === "driveway") {
    const minPerSf = Math.max(minPrice / clampedSqft, 7.0);
    minPrice = clampedSqft * minPerSf;
  }

  // Quote = max of tier and minimum
  let quote: number;
  if (tierPerSf === null) {
    quote = minPrice;
  } else {
    quote = Math.max(tierPrice, minPrice);
  }

  const profit = quote - internalCost;
  const netMarginPercent = ((profit / quote) * (1 - TAX_RATE)) * 100;
  const profitPerDay = profit / installDays;
  const netProfitPerDay = profitPerDay * (1 - TAX_RATE);
  const pricePerSf = quote / clampedSqft;

  return {
    quote: Math.round(quote),
    pricePerSf: Math.round(pricePerSf * 100) / 100,
    internalCost,
    materials,
    labor,
    driver,
    fuel,
    delivery,
    profit: Math.round(profit),
    netMarginPercent: Math.round(netMarginPercent * 10) / 10,
    installDays,
    totalDays,
    profitPerDay: Math.round(profitPerDay),
    netProfitPerDay: Math.round(netProfitPerDay),
  };
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------
function fmt(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function fmtDec(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function CostCalculatorPage() {
  const [sqft, setSqft] = useState(1000);
  const [type, setType] = useState<ProjectType>("driveway");

  const results = useMemo(() => calculate(sqft, type), [sqft, type]);

  const minSqft = type === "driveway" ? 500 : 100;
  const maxSqft = 2000;
  const displaySqft = Math.max(sqft, minSqft);

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-rubik uppercase tracking-[3px] text-primary font-medium mb-2">
            Professional Estimation Tool
          </p>
          <h1 className="text-3xl md:text-4xl font-bold font-hanken text-gray-900 uppercase">
            Paver Cost Calculator
          </h1>
          <p className="text-gray-500 font-rubik mt-2 max-w-xl mx-auto">
            Get an instant estimate for your paver installation project based on area and type.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left: Inputs ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Type */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-rubik block mb-4">
                Installation Type
              </label>
              <div className="flex gap-3">
                {(["patio", "driveway"] as const).map((t) => {
                  const Icon = t === "patio" ? RiHome4Line : RiRoadsterLine;
                  const isActive = type === t;
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        setType(t);
                        if (t === "driveway" && sqft < 500) setSqft(500);
                      }}
                      className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl font-rubik font-semibold capitalize transition-all cursor-pointer ${
                        isActive
                          ? "bg-secondary text-white shadow-md"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <Icon className="size-5" />
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Area Input */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-rubik block mb-4">
                Project Area
              </label>
              <div className="flex items-baseline gap-2 mb-4">
                <input
                  type="number"
                  min={minSqft}
                  max={maxSqft}
                  step={50}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value) || minSqft)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-2xl font-bold font-hanken text-gray-900 focus:border-primary focus:ring-0 outline-none transition-all"
                />
                <span className="text-gray-400 font-rubik font-medium text-sm shrink-0">
                  sq ft
                </span>
              </div>
              <input
                type="range"
                min={minSqft}
                max={maxSqft}
                step={50}
                value={displaySqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 font-rubik mt-1">
                <span>{minSqft} sf</span>
                <span>{maxSqft} sf</span>
              </div>
            </div>

            {/* Quick reference */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-rubik block mb-3">
                Price per sq ft
              </label>
              <p className="text-3xl font-bold font-hanken text-secondary">
                {fmtDec(results.pricePerSf)}
                <span className="text-base font-normal text-gray-400"> /sf</span>
              </p>
            </div>
          </div>

          {/* ── Right: Results Bento ── */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total Estimate (hero card) */}
            <div className="sm:col-span-2 bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-5%] w-56 h-56 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <RiMoneyDollarCircleLine className="size-5 text-white/70" />
                  <span className="text-white/70 font-rubik text-sm font-semibold uppercase tracking-wider">
                    Total Estimate
                  </span>
                </div>
                <p className="text-5xl md:text-6xl font-black font-hanken tracking-tight mt-2 mb-6">
                  {fmt(results.quote)}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-sm font-rubik">
                    <span className="opacity-70">Net Margin: </span>
                    <span className="font-bold text-emerald-300">
                      {results.netMarginPercent}%
                    </span>
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-sm font-rubik">
                    <span className="opacity-70">Profit: </span>
                    <span className="font-bold text-emerald-300">{fmt(results.profit)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Cost Breakdown Cards */}
            <ResultCard
              icon={RiStackLine}
              label="Materials"
              value={fmt(results.materials)}
              sub={`${fmtDec(MATERIAL_COST_PER_SF)}/sf`}
            />
            <ResultCard
              icon={RiGroupLine}
              label="Labor"
              value={fmt(results.labor)}
              sub={
                type === "patio"
                  ? sqft >= 600
                    ? "$1.80/sf"
                    : "Minimum rate"
                  : sqft >= 600
                    ? "$1.40/sf"
                    : "Minimum rate"
              }
            />
            <ResultCard
              icon={RiTruckLine}
              label="Driver"
              value={fmt(results.driver)}
              sub={`${DRIVER_RATE[type]}/day × ${results.totalDays} days`}
            />
            <ResultCard
              icon={RiGasStationLine}
              label="Fuel + Delivery"
              value={fmt(results.fuel + results.delivery)}
              sub={`Fuel ${fmt(results.fuel)} · Delivery ${fmt(results.delivery)}`}
            />

            {/* Schedule */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <RiTimeLine className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary/70 font-rubik">
                  Work Schedule
                </p>
                <p className="text-xl font-bold font-hanken text-gray-900">
                  {results.installDays} Install Day{results.installDays > 1 ? "s" : ""}
                  {type === "driveway" && (
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      + {results.totalDays - results.installDays} demo
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Daily Profit */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4">
              <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <RiPercentLine className="size-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600/70 font-rubik">
                  Net Profit / Day
                </p>
                <p className="text-xl font-bold font-hanken text-emerald-700">
                  {fmt(results.netProfitPerDay)}
                </p>
                <p className="text-[11px] text-gray-400 font-rubik uppercase">
                  After 30% tax · Floor {fmt(1200)}
                </p>
              </div>
            </div>

            {/* Internal Cost Summary */}
            <div className="sm:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 font-rubik mb-4">
                Internal Cost Breakdown
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <BreakdownItem label="Materials" value={fmt(results.materials)} />
                <BreakdownItem label="Labor" value={fmt(results.labor)} />
                <BreakdownItem label="Driver" value={fmt(results.driver)} />
                <BreakdownItem label="Fuel" value={fmt(results.fuel)} />
                <BreakdownItem label="Delivery" value={fmt(results.delivery)} />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold font-rubik text-gray-600 uppercase">Total Internal Cost</span>
                <span className="text-lg font-bold font-hanken text-gray-900">{fmt(results.internalCost)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function ResultCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-secondary/20 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="size-4 text-gray-400" />
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 font-rubik">
          {label}
        </p>
      </div>
      <p className="text-2xl font-bold font-hanken text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 font-rubik mt-1">{sub}</p>
    </div>
  );
}

function BreakdownItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xs text-gray-400 font-rubik mb-1">{label}</p>
      <p className="text-sm font-bold font-hanken text-gray-700">{value}</p>
    </div>
  );
}
