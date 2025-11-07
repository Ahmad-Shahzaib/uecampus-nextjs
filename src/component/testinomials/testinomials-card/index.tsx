// src/components/FeatureCard.tsx
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useDispatch } from "@/redux/store";
import { fetchFeatureCardsData } from "@/redux/thunk/featureCards";

export interface FeatureCardProps {
  section: {
    title: string;
    description?: string;
  };
  /** index can be a variant name or a numeric index (1,2,3) */
  index?: number | "primary" | "secondary" | "tertiary";
}

type VariantType = "primary" | "secondary" | "tertiary";

export function FeatureCard({ section, index }: FeatureCardProps) {

  const variantStyles: Record<VariantType, { container: string; title: string; description: string }> = {
    primary: {
      container: "bg-gradient-to-br from-purple-600 to-purple-700 text-white",
      title: "text-white",
      description: "text-purple-100",
    },
    secondary: {
      container: "bg-slate-900 text-white",
      title: "text-white",
      description: "text-slate-300",
    },
    tertiary: {
      container: "bg-slate-100",
      title: "text-purple-600",
      description: "text-slate-700",
    },
  };

  // Normalize index: accept 1/2/3 or variant strings. Fallback to 'tertiary'.
  const normalizeIndex = (idx?: number | string): VariantType => {
    if (typeof idx === "number") {
      if (idx === 1) return "primary";
      if (idx === 2) return "secondary";
      return "tertiary";
    }
    if (typeof idx === "string") {
      const lower = idx.toLowerCase();
      if (lower === "primary" || lower === "secondary" || lower === "tertiary") {
        return lower as VariantType;
      }
    }
    return "tertiary";
  };

  const validIndex = normalizeIndex(index);
  const styles = variantStyles[validIndex];

  return (
    <Card
      className={`${styles.container} border-0 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="space-y-4">
        <h2 className={`${styles.title} text-2xl md:text-3xl font-semibold leading-tight text-balance`}>
          {section.title}
        </h2>
        <p className={`${styles.description} text-sm md:text-base leading-relaxed`}>
          {section.description}
        </p>
      </div>
    </Card>
  );
}