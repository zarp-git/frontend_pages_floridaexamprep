"use client";

import { useState, useMemo } from "react";
import { PassBoardFilters } from "@/presentation/components/molecules/florida-contractor-exam-pass-board/PassBoardFilters";
import { PassBoardTable } from "@/presentation/components/organisms/florida-contractor-exam-pass-board/PassBoardTable";
import { PassBoardPagination } from "@/presentation/components/molecules/florida-contractor-exam-pass-board/PassBoardPagination";
import { PassBoardCTA } from "@/presentation/components/organisms/florida-contractor-exam-pass-board/PassBoardCTA";
import { PASS_BOARD_STUDENTS, PASS_BOARD_CONFIG } from "@/constants/pass-board";

export function PassBoardView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "All Course Categories",
  );
  const [viewMode, setViewMode] = useState<"monthly" | "all-time">("monthly");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudents = useMemo(() => {
    let filtered = [...PASS_BOARD_STUDENTS];

    if (selectedCategory !== "All Course Categories") {
      filtered = filtered.filter(
        (student) => student.exam === selectedCategory,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.exam.toLowerCase().includes(query),
      );
    }

    filtered.sort((a, b) => {
      const gradeA = parseFloat(a.grade.replace("%", ""));
      const gradeB = parseFloat(b.grade.replace("%", ""));
      return gradeB - gradeA;
    });

    return filtered;
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(
    filteredStudents.length / PASS_BOARD_CONFIG.itemsPerPage,
  );
  const startIndex = (currentPage - 1) * PASS_BOARD_CONFIG.itemsPerPage;
  const endIndex = startIndex + PASS_BOARD_CONFIG.itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex-1 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-[80%] mb-12 text-center">
        <h1 className="text-5xl uppercase tracking-tighter mb-4 font-red-hat font-black">
          {PASS_BOARD_CONFIG.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          {PASS_BOARD_CONFIG.subtitle}
        </p>
      </div>

      <div className="w-full max-w-[80%] flex flex-col gap-6">
        <PassBoardFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <div className="flex items-center justify-end mb-1">
          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Last updated: {PASS_BOARD_CONFIG.lastUpdated}
          </div>
        </div>

        <PassBoardTable students={currentStudents} startRank={startIndex + 1} />

        {totalPages > 1 && (
          <PassBoardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <PassBoardCTA />
      </div>
    </main>
  );
}
