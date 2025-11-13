// src/component/AdvanceCareer.tsx
"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@/redux/store";
import { fetchOnlineDegreeCards } from "@/redux/thunk/onlineDegreeCards";
import { RootState } from "@/redux/rootReducer";
import { Card } from "@/components/ui/card";
import { BookOpen, Globe, Briefcase, Clock, DollarSign, Users, Award, Users2, type LucideIcon } from "lucide-react";

// Define component props interface
interface AdvanceCareerProps {
  mainClass?: string;
  cardsData?: CardData[];
}

// Define card data interface
interface CardData {
  title: string;
  description: string;
}

// Map icons to card titles with proper typing
const iconMap: Record<string, LucideIcon> = {
  "Learn From Anywhere": BookOpen,
  "Globally Recognized Degrees": Globe,
  "Career Advancement": Briefcase,
  "Flexible Timings": Clock,
  "Affordable Tuition": DollarSign,
  "Expert Faculty": Users,
  "Certifications & Credentials": Award,
  "Global Community": Users2,
} as const;

export default function AdvanceCareer({ mainClass = "min-h-screen", cardsData }: AdvanceCareerProps) {



  return (
    <main className={`${mainClass} bg-white px-6 py-8`}>
      <div className="mx-auto w-full">
        <h1 className="mb-16 text-3xl font-semibold text-[#6A1B9A] sm:text-5xl lg:text-5xl px-4">
          Advance your career with an online degree
        </h1>

        {/* Responsive grid using minmax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {cardsData?.map((card:any, index:any) => {
            // Get the appropriate icon based on the card title
            const Icon = iconMap[card.title] || BookOpen;
            
            return (
              <Card
                key={index}
                className="border bg-white py-4 px-4 shadow-none transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="inline-flex rounded-lg bg-[#6A1B9A] w-11 p-3">
                  <Icon className="h-4 w-4 text-white" />
                </div>

                <div className="text-lg font-semibold text-[#6A1B9A]">
                  {card.title}
                </div>
                <div className="text-base text-gray-600">{card.description}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}