import React from "react";
import { StatCard } from "../about-us/stats/card";

interface StatsDataItem {
  stat: string;
  title: string;
  description: string;
  variant: "dark" | "light";
}

interface StatsCardsProps {
  data: StatsDataItem[];
}

const StatsCards = ({ data }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <StatCard
          key={index}
          stat={item.stat}
          title={item.title}
          description={item.description}
          variant={item.variant}
        />
      ))}
    </div>
  );
};

export default StatsCards;