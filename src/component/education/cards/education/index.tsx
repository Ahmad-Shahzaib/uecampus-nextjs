// src/components/EducationCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
export function EducationCard({ about, bg = true, bgStyles = "" }: any) {

  const { secondCardTitle, secondCardDescription } = about;

  return (
    <Card className={`border-0 shadow-lg rounded-2xl overflow-hidden  ${bgStyles}`}>
      <CardContent
        className="lg:px-8 px-4 py-6 lg:py-10 bg-cover bg-center bg-no-repeat"
        
      >
        <h2 className={`text-xl lg:text-2xl font-bold text-[#6A1B9A] leading-tight mb-6 ${bgStyles}`}>
          {secondCardTitle}
        </h2>

        <p className={`text-base lg:text-lg text-gray-700 leading-relaxed ${bgStyles}`}>
          {secondCardDescription}
        </p>
      </CardContent>
    </Card>
  );
}