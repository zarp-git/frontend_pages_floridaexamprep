"use client";

import React, { useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-6 text-left"
        onClick={onClick}
      >
        <span className="text-base font-normal text-gray-800 font-rubik break-words pr-4">
          {question}
        </span>
        <span className={cn("transition-transform duration-300", isOpen && "rotate-180")}>
          <RiArrowDownSLine className="h-5 w-5 text-gray-400" />
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
        )}
      >
        <div className="text-gray-600 font-rubik text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
