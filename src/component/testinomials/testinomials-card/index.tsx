// src/components/FeatureCard.tsx
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import { fetchFeatureCardsData } from "@/redux/thunk/featureCards";
import { AppDispatch } from "@/redux/store";

export interface FeatureCardProps {
  cardId: number; // Add cardId prop to identify which card to display
}

export function FeatureCard({ cardId }: FeatureCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: cards, isLoading, error } = useSelector((state: RootState) => state.featureCards);
  const [cardData, setCardData] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchFeatureCardsData());
  }, [dispatch]);

  useEffect(() => {
    if (cards.length > 0) {
      const card = cards.find((c) => c.id === cardId);
      setCardData(card);
    }
  }, [cards, cardId]);

  if (isLoading) {
    return (
      <Card className="border-0 rounded-2xl p-4 md:p-6 shadow-lg animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </Card>
    );
  }

  if (error || !cardData) {
    return (
      <Card className="border-0 rounded-2xl p-4 md:p-6 shadow-lg bg-red-900 text-white">
        <div className="text-center">
          <p>Failed to load card data</p>
        </div>
      </Card>
    );
  }

  const variantStyles = {
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

  const styles = variantStyles[cardData.variant];

  return (
    <Card
      className={`${styles.container} border-0 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="space-y-4">
        <h2 className={`${styles.title} text-2xl md:text-3xl font-semibold leading-tight text-balance`}>
          {cardData.title}
        </h2>
        <p className={`${styles.description} text-sm md:text-base leading-relaxed`}>
          {cardData.description}
        </p>
      </div>
    </Card>
  );
}