// src/component/AdvanceCareer.tsx
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnlineDegreeCards } from "@/redux/thunk/onlineDegreeCards";
import { RootState } from "@/redux/rootReducer";
import { Card } from "@/components/ui/card";
import { BookOpen, Globe, Briefcase, Clock, DollarSign, Users, Award, Users2 } from "lucide-react";

// Map icons to card titles
const iconMap: Record<string, React.ComponentType<any>> = {
  "Learn From Anywhere": BookOpen,
  "Globally Recognized Degrees": Globe,
  "Career Advancement": Briefcase,
  "Flexible Timings": Clock,
  "Affordable Tuition": DollarSign,
  "Expert Faculty": Users,
  "Certifications & Credentials": Award,
  "Global Community": Users2,
};

export default function AdvanceCareer({ mainClass = "min-h-screen" }) {
  const dispatch = useDispatch();
  
  // Get online degree cards data from Redux store
  const cardsData = useSelector((state: RootState) => state.onlineDegreeCards?.data);
  const isLoading = useSelector((state: RootState) => state.onlineDegreeCards?.isLoading);
  const error = useSelector((state: RootState) => state.onlineDegreeCards?.error);

  // Fetch data on component mount
  useEffect(() => {
    console.log("Component mounted, fetching data...");
    dispatch(fetchOnlineDegreeCards());
  }, [dispatch]); // Only run on mount

  // Show loading state
  if (isLoading) {
    return (
      <main className={`${mainClass} bg-white px-6 py-8`}>
        <div className="mx-auto w-full">
          <h1 className="mb-16 text-3xl font-semibold text-[#6A1B9A] sm:text-5xl lg:text-5xl px-4">
            Advance your career with an online degree
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading online degree cards...</div>
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main className={`${mainClass} bg-white px-6 py-8`}>
        <div className="mx-auto w-full">
          <h1 className="mb-16 text-3xl font-semibold text-[#6A1B9A] sm:text-5xl lg:text-5xl px-4">
            Advance your career with an online degree
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-red-500">Error: {error}</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${mainClass} bg-white px-6 py-8`}>
      <div className="mx-auto w-full">
        <h1 className="mb-16 text-3xl font-semibold text-[#6A1B9A] sm:text-5xl lg:text-5xl px-4">
          Advance your career with an online degree
        </h1>

        {/* Responsive grid using minmax */}
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {cardsData?.map((card, index) => {
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