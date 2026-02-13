import HeroSection from "@/component/HeroSection";
import HomeClient from "./HomeClient";

export default async function Home() {
  let heroData = null;

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || '';
    const res = await fetch(`${base}/api/home/hero`, { cache: 'force-cache' });
    if (res.ok) {
      const json = await res.json();
      heroData = json?.data ?? null;
    }
  } catch (e) {
    heroData = null;
  }

  return (
    <div className="mt-3">
      {heroData?.thumbnail && (
        <link
          rel="preload"
          href={heroData.thumbnail}
          as="image"
          fetchPriority="high"
          crossOrigin="anonymous"
        />
      )}

      <HeroSection heroProp={heroData} />

      <HomeClient />
    </div>
  );
}
