"use client";

import { PASS_BOARD_EXAM_CATEGORIES } from "@/constants/pass-board";

interface PassBoardFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  viewMode: "monthly" | "all-time";
  onViewModeChange: (mode: "monthly" | "all-time") => void;
}

export function PassBoardFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
}: PassBoardFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-2">
      <div className="md:col-span-5">
        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">
          Search Database
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="w-full pl-10 pr-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm shadow-sm"
            placeholder="Search by Course or Student Name..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="md:col-span-4">
        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">
          Course Categories
        </label>
        <select
          className="w-full px-4 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm shadow-sm appearance-none"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {PASS_BOARD_EXAM_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-3">
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-[50px]">
          <button
            className={`flex-1 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              viewMode === "monthly"
                ? "bg-primary text-white"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
            onClick={() => onViewModeChange("monthly")}
          >
            Monthly
          </button>
          <button
            className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === "all-time"
                ? "bg-primary text-white"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
            onClick={() => onViewModeChange("all-time")}
          >
            All-Time
          </button>
        </div>
      </div>
    </div>
  );
}
