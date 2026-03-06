"use client";

import { type RankedStudent } from "@/presentation/pages/(public)/florida-contractor-exam-pass-board/pass-board.view";
import { PassBoardTableRow } from "@/presentation/components/molecules/florida-contractor-exam-pass-board/PassBoardTableRow";

interface PassBoardTableProps {
  students: RankedStudent[];
}

export function PassBoardTable({ students }: PassBoardTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-1 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-[8px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-gray-500 w-8 sm:w-12 md:w-16 font-red-hat">
              Rank
            </th>
            <th className="px-1 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-[8px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-gray-500 font-red-hat">
              Student
            </th>
            <th className="px-1 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-[8px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-gray-500 font-red-hat">
              Exam
            </th>
            <th className="px-1 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-[8px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-gray-500 text-right font-red-hat">
              Grade
            </th>
            <th className="px-1 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-[8px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-gray-500 text-right font-red-hat">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student, index) => (
            <PassBoardTableRow
              key={`${student.name}-${student.exam}-${index}`}
              student={student}
              rank={student.rank}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
