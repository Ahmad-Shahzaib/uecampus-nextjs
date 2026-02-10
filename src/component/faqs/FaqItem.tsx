// src/component/faqs/FaqItem.tsx
"use client";

import { memo } from "react";
import { Plus, Minus } from "lucide-react";
import { FaqItem as FaqItemType } from "./types";

interface FaqItemProps {
  item: FaqItemType;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const FaqItem = memo(({ item, index, isOpen, onToggle }: FaqItemProps) => {
  return (
    <div className="border-b border-slate-700/60 transition-all duration-300">
      <button
        onClick={() => onToggle(item._id)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item._id}`}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors rounded-xl px-2 sm:px-4 hover:bg-slate-800/40"
      >
        <div className="flex flex-1 items-center gap-4">
          {/* NUMBER */}
          <span
            className="text-4xl accordion-number text-right font-extrabold text-[#999]"
            style={{ fontVariantNumeric: "tabular-nums" }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* QUESTION */}
          <h1 className="text-base sm:text-lg font-normal leading-snug text-white">
            {item.question}
          </h1>
        </div>

        {/* ICON */}
        <div className="flex-shrink-0">
          {isOpen ? (
            <Minus className="h-6 w-6 text-purple-400 transition-transform duration-300" />
          ) : (
            <Plus className="h-6 w-6 text-slate-400 transition-transform duration-300" />
          )}
        </div>
      </button>

      {/* ANSWER */}
      <div
        id={`faq-answer-${item._id}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 py-3 pl-16 pr-4"
            : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <p className="text-sm sm:text-base leading-relaxed text-slate-300">
          {item.answer}
        </p>
      </div>
    </div>
  );
});

FaqItem.displayName = "FaqItem";

export default FaqItem;