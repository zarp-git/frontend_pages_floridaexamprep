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
            <th className="px-6 sm:px-8 py-4 sm:py-5 text-xs font-black uppercase tracking-widest text-gray-500 w-24 font-red-hat">
              Rank
            </th>
            <th className="px-6 sm:px-8 py-4 sm:py-5 text-xs font-black uppercase tracking-widest text-gray-500 font-red-hat text-center sm:text-left">
              Student
            </th>
            <th className="px-6 sm:px-8 py-4 sm:py-5 text-xs font-black uppercase tracking-widest text-gray-500 font-red-hat">
              Certification Exam
            </th>
            <th className="px-6 sm:px-8 py-4 sm:py-5 text-xs font-black uppercase tracking-widest text-gray-500 text-right font-red-hat">
              Grade
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
