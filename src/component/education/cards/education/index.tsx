// src/components/cards/education/index.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";

interface EducationCardProps {
  backgroundImage?: string;
  backgroundClass?: string;
  about?: {
    secondCardTitle?: string;
    secondCardDescription?: string;
  };
  bg?: boolean;
  bgStyles?: string;
  isDarkMode?: boolean;
}

export function EducationCard({
  backgroundImage,
  backgroundClass,
  about,
  bg = true,
  bgStyles = "",
  isDarkMode = false,
}: EducationCardProps) {
  const { secondCardTitle, secondCardDescription } = about || {};

  return (
    <Card
      className={`border-0 shadow-lg rounded-2xl overflow-hidden h-full ${
        isDarkMode ? "bg-black" : ""
      } ${backgroundClass || ""}`}
      style={{
        backgroundImage: isDarkMode
          ? "none"
          : bg
          ? `url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-3.png'), url(${backgroundImage})`
          : `url(${backgroundImage})`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
      }}
    >
      <CardContent
        className="lg:px-8 px-4 py-6 lg:py-10 bg-cover bg-center bg-no-repeat h-full flex flex-col justify-center"
        style={{
          backgroundImage: isDarkMode
            ? "none"
            : bg
            ? "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9))"
            : "linear-gradient(transparent, transparent)",
        }}
      >
        <h2
          className={`text-2xl lg:text-4xl font-medium tex leading-relaxed mb-3 ${
            isDarkMode ? "text-white" : "text-[#6A1B9A]"
          } ${bgStyles}`}
        >
          {secondCardTitle}
        </h2>

        <p
          className={`text-base ${
            isDarkMode ? "text-white" : "text-gray-700"
          } ${bgStyles}`}
        >
          {secondCardDescription}
        </p>
      </CardContent>
    </Card>
  );
}