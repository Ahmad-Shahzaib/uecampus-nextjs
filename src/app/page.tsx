import HeaderSection from "@/component/Header";
import { FeatureCard } from "@/component/testinomials/testinomials-card";
import { FEATURE_CARDS } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="py-6 px-10">
        <HeaderSection />
      </div>
      <div className="py-6 px-10">
       <div className="grid gap-4 md:gap-6 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {FEATURE_CARDS.map((card, index) => (
            <FeatureCard key={index} title={card.title} description={card.description} variant={card.variant} />
          ))}
        </div>
      </div>
    </div>
  );
}
