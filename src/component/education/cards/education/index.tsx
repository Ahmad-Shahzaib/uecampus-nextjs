// src/components/EducationCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/rootReducer";
import { AppDispatch } from "@/redux/store";
import { fetchAboutSectionData } from "@/redux/thunk/aboutSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function EducationCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: about, isLoading, error } = useSelector(
    (state: RootState) => state.aboutSection
  );

  useEffect(() => {
    dispatch(fetchAboutSectionData());
  }, [dispatch]);

  // Loading
  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="lg:px-8 px-4 py-6 lg:py-10 bg-gray-100 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error
  if (error) {
    return (
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="lg:px-8 px-4 py-6 lg:py-10 text-red-600 text-center">
          Failed to load. Retrying...
        </CardContent>
      </Card>
    );
  }

  // No data
  if (!about) {
    return (
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="lg:px-8 px-4 py-6 lg:py-10 text-gray-500 text-center">
          No content available.
        </CardContent>
      </Card>
    );
  }

  // FIX: Use correct camelCase keys from Redux
  const { secondCardTitle, secondCardDescription } = about;

  return (
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-white">
      <CardContent
        className="lg:px-8 px-4 py-6 lg:py-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-3.png')`,
        }}
      >
        <h2 className="text-xl lg:text-2xl font-bold text-[#6A1B9A] leading-tight mb-6">
          {secondCardTitle}
        </h2>

        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
          {secondCardDescription}
        </p>
      </CardContent>
    </Card>
  );
}