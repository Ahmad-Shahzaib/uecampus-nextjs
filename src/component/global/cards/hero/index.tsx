// src/components/HeroCard.tsx
"use client"
import { Card } from "@/components/ui/card"
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchHeroSectionData } from "@/redux/thunk/heroSectionThunk";
import { RootState } from "@/redux/rootReducer";

export function HeroCard() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.heroSection
  );

  useEffect(() => {
    // Always fetch data when component mounts
    dispatch(fetchHeroSectionData());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchHeroSectionData());
  };

  if (isLoading) {
    return (
      <Card className="p-8 md:p-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 md:p-12">
        <div className="text-center">
          <div className="text-red-500 font-medium mb-2">Failed to load data</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Card>
    );
  }

  // Only render content if we have valid data
  if (!data || !data.section_title || !data.section_description) {
    return (
      <Card className="p-8 md:p-12">
        <div className="text-center text-gray-500">No hero content available</div>
      </Card>
    );
  }

  return (
    <Card
      className="relative overflow-hidden bg-[#6A1B9A] border-0 p-8 md:p-12 text-white shadow-2xl rounded-3xl"
    >
      

      <div className="relative z-10 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">{data.section_title}</h1>
        <p className="text-base md:text-lg leading-relaxed text-purple-100 max-w-2xl text-pretty">{data.section_description}</p>
      </div>
    </Card>
  )
}