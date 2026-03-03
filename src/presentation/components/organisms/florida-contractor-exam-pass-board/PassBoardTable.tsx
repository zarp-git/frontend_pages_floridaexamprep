"use client";

import { PassBoardStudent } from "@/constants/pass-board";
import { PassBoardTableRow } from "@/presentation/components/molecules/florida-contractor-exam-pass-board/PassBoardTableRow";

interface PassBoardTableProps {
  students: PassBoardStudent[];
  startRank: number;
}

export function PassBoardTable({ students, startRank }: PassBoardTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 w-24 font-red-hat">
              Rank
            </th>
            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 font-red-hat text-center sm:text-left">
              Student
            </th>
            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 font-red-hat">
              Certification Exam
            </th>
            <th className="px-8 py-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right font-red-hat">
              Grade
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {students.map((student, index) => (
            <PassBoardTableRow
              key={`${student.name}-${student.exam}-${index}`}
              student={student}
              rank={startRank + index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
