import Image from "next/image";
import { PassBoardStudent } from "@/constants/pass-board";

interface PassBoardTableRowProps {
  student: PassBoardStudent;
  rank: number;
}

export function PassBoardTableRow({ student, rank }: PassBoardTableRowProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center size-12 rounded-full bg-yellow-100 text-yellow-600">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center justify-center size-12 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center justify-center size-12 rounded-full bg-orange-100 text-orange-600">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center size-12 text-slate-400 font-black text-2xl font-red-hat">
        {rank}
      </div>
    );
  };

  const getGradeColor = (rank: number) => {
    if (rank === 1) return "text-primary";
    if (rank <= 3) return "text-slate-700 dark:text-slate-300";
    return "text-slate-500";
  };

  const getBorderColor = (rank: number) => {
    if (rank === 1) return "border-primary";
    if (rank === 2) return "border-slate-300";
    if (rank === 3) return "border-orange-300";
    return "border-slate-100";
  };

  return (
    <tr className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
      <td className="px-8 py-6">{getRankBadge(rank)}</td>
      <td className="px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div
            className={`size-14 rounded-full border-2 ${getBorderColor(rank)} overflow-hidden bg-slate-200 shrink-0 relative`}
          >
            {student.hasAvatar && student.avatarPath ? (
              <Image
                src={student.avatarPath}
                alt={student.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-600 font-bold text-xl">
                {student.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <p className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight">
              {student.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20">
          {student.exam}
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <span
          className={`text-3xl font-red-hat font-black ${getGradeColor(rank)}`}
        >
          {student.grade}
        </span>
      </td>
    </tr>
  );
}
