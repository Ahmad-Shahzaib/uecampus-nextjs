import HeaderSection from "@/component/Header";
import { LogoCarousel } from "@/component/partners";
import { FeatureCard } from "@/component/testinomials/testinomials-card";
import { FEATURE_CARDS, PARTNER_LOGOS } from "@/constants";


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
       <div className="py-6 px-10">
       <LogoCarousel  logos={PARTNER_LOGOS} />
      </div>
    </div>
  );
}
