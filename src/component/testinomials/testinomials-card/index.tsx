// src/components/FeatureCard.tsx
"use client";

import { Card } from "@/components/ui/card";

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
    secondary: {
      container: "bg-white text-black",
      title: "text-[#6a1b9a]",
      description: "text-black",
    },
    primary: {
      container: "bg-[#2C2C54] text-white",
      title: "text-white",
      description: "text-white",
    },
    tertiary: {
      container: "bg-[#6a1b9a]",
      title: "text-white",
      description: "text-white",
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
      className={`${styles.container} border-0 rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full`}
    >
      <div className="space-y-3 sm:space-y-4">
        <h1 className={`${styles.title} text-xl sm:text-2xl md:text-3xl font-medium leading-tight text-balance`}>
          {section.title}
        </h1>
        <p className={`${styles.description} text-sm sm:text-base md:text-base leading-relaxed`}>
          {section.description}
        </p>
      </div>
    </Card>
  );
}