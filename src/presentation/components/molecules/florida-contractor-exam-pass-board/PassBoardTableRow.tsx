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
        <div className="flex items-center justify-center size-8 sm:size-12 rounded-full bg-yellow-100 text-yellow-600">
          <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center justify-center size-8 sm:size-12 rounded-full bg-gray-200 text-gray-600">
          <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center justify-center size-8 sm:size-12 rounded-full bg-orange-100 text-orange-600">
          <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center size-8 sm:size-12 text-gray-400 font-black text-base sm:text-2xl font-red-hat">
        {rank}
      </div>
    );
  };

  const getGradeColor = (rank: number) => {
    if (rank === 1) return "text-primary";
    if (rank <= 3) return "text-gray-700";
    return "text-gray-500";
  };

  const getBorderColor = (rank: number) => {
    if (rank === 1) return "border-primary";
    if (rank === 2) return "border-gray-300";
    if (rank === 3) return "border-orange-300";
    return "border-gray-200";
  };

  return (
    <tr className="hover:bg-primary/5 transition-colors">
      <td className="px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">{getRankBadge(rank)}</td>
      <td className="px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`size-8 sm:size-10 md:size-14 rounded-full border-2 ${getBorderColor(rank)} overflow-hidden bg-gray-200 shrink-0 relative`}
          >
            {student.hasAvatar && student.avatarPath ? (
              <Image
                src={student.avatarPath}
                alt={student.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold text-xs sm:text-base md:text-xl font-rubik">
                {student.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-xs sm:text-sm md:text-lg text-gray-900 leading-tight font-rubik">
              {student.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5">
        <span className="inline-flex items-center px-1.5 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold bg-primary/10 text-primary border border-primary/20 font-rubik">
          {student.exam}
        </span>
      </td>
      <td className="px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 text-right">
        <span
          className={`text-sm sm:text-xl md:text-3xl font-red-hat font-black ${getGradeColor(rank)}`}
        >
          {student.grade}
        </span>
      </td>
      <td className="px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 text-right">
        <span className="text-xs sm:text-sm md:text-base font-rubik text-gray-600">
          {student.examDate}
        </span>
      </td>
    </tr>
  );
}
