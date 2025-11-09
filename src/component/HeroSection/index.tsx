// src/components/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchHeroData } from "@/redux/thunk/hero";
import { useEffect } from "react";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { data: hero, isLoading, error } = useSelector((state) => state.hero);

  // Fetch on mount if not already loaded
  useEffect(() => {
    if (!hero && !isLoading) {
      dispatch(fetchHeroData());
    }
  }, [dispatch, hero, isLoading]);

  // Loading
  if (isLoading) {
    return (
      <div className="bg-black h-[500px] flex items-center justify-center rounded-lg">
        <p className="text-white animate-pulse">Loading hero section...</p>
      </div>
    );
  }

  // Error
  if (error || !hero) {
    return (
      <div className="bg-black h-[500px] flex items-center justify-center rounded-lg">
        <p className="text-red-400">{error || "No hero data available"}</p>
      </div>
    );
  }

  return (
    <div className="bg-black w-full flex justify-center rounded-lg">
      <div className="relative w-[calc(100%-24px)] h-[500px] flex items-center justify-center mx-auto overflow-hidden rounded-lg">
        {/* Dynamic Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={hero.video}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-2 sm:px-8 sm:max-w-4xl w-full mx-auto">
          <div className="sm:w-1/2 w-full mx-auto">
            <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-white whitespace-pre-line">
              {hero.title}
            </h1>
          </div>

          <p className="mt-6 text-lg whitespace-pre-line max-w-2xl mx-auto text-white/90">
            {hero.description}
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
            <Input
              className="w-full py-6 sm:w-[600px] rounded-[0px] bg-white/90 backdrop-blur-sm border-white/20"
              placeholder="Search courses..."
            />
            <Button
              variant="destructive"
              className="px-8 py-6 w-full rounded-md sm:w-auto"
            >
              Search
            </Button>
          </div>

          {/* CTA Button from API */}
          <div className="mt-6">
            <Button asChild variant="destructive" className="px-8 py-6 rounded-md">
              <a href={hero.button_link} target="_blank" rel="noopener noreferrer">
                {hero.button_name}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;