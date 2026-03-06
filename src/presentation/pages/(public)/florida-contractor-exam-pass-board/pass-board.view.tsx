"use client";

import { useState, useMemo } from "react";
import { PassBoardFilters } from "@/presentation/components/molecules/florida-contractor-exam-pass-board/PassBoardFilters";
import { PassBoardTable } from "@/presentation/components/organisms/florida-contractor-exam-pass-board/PassBoardTable";
import { PassBoardPagination } from "@/presentation/components/molecules/florida-contractor-exam-pass-board/PassBoardPagination";
import { PassBoardCTA } from "@/presentation/components/organisms/florida-contractor-exam-pass-board/PassBoardCTA";
import { PASS_BOARD_STUDENTS, PASS_BOARD_CONFIG, type PassBoardStudent } from "@/constants/pass-board";

export interface RankedStudent extends PassBoardStudent {
  rank: number;
}

export function PassBoardView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "All Course Categories",
  );
  const [viewMode, setViewMode] = useState<"monthly" | "all-time">("all-time");
  const [dateSort, setDateSort] = useState<"newest" | "oldest" | "none">("none");
  const [currentPage, setCurrentPage] = useState(1);

  // Step 1: Filter by category, view mode (monthly/all-time), and sort
  const rankedStudents = useMemo(() => {
    let filtered = [...PASS_BOARD_STUDENTS];

    // Filter by category
    if (selectedCategory !== "All Course Categories") {
      filtered = filtered.filter(
        (student) => student.exam === selectedCategory,
      );
    }

    // Filter by view mode (monthly/all-time)
    if (viewMode === "monthly") {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      filtered = filtered.filter((student) => {
        const examDate = new Date(student.examDate);
        return (
          examDate.getMonth() === currentMonth &&
          examDate.getFullYear() === currentYear
        );
      });
    }

    // Apply date sorting if selected
    if (dateSort !== "none") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.examDate);
        const dateB = new Date(b.examDate);
        return dateSort === "newest" 
          ? dateB.getTime() - dateA.getTime() 
          : dateA.getTime() - dateB.getTime();
      });
    } else {
      // Default sort by grade
      filtered.sort((a, b) => {
        const gradeA = parseFloat(a.grade.replace("%", ""));
        const gradeB = parseFloat(b.grade.replace("%", ""));
        return gradeB - gradeA;
      });
    }

    return filtered.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
  }, [selectedCategory, viewMode, dateSort]);

  // Step 2: Apply search filter while preserving original ranks
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return rankedStudents;

    const query = searchQuery.toLowerCase();
    return rankedStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.exam.toLowerCase().includes(query),
    );
  }, [searchQuery, rankedStudents]);

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
    <main className="flex-1 flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-28 py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center">
        <h1 className="text-[#002770] text-[24px] sm:text-[28px] md:text-4xl lg:text-5xl uppercase tracking-tighter mb-4 font-red-hat font-black">
          {PASS_BOARD_CONFIG.title}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-rubik">
          {PASS_BOARD_CONFIG.subtitle}
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        <PassBoardFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
          viewMode={viewMode}
          onViewModeChange={(mode) => {
            setViewMode(mode);
            setCurrentPage(1);
          }}
          dateSort={dateSort}
          onDateSortChange={(sort) => {
            setDateSort(sort);
            setCurrentPage(1);
          }}
        />

        <div className="flex items-center justify-end mb-1">
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 font-rubik">
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

        <PassBoardTable students={currentStudents} />

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
