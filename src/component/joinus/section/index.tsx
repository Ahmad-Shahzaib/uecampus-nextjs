import { CTACard } from "../card";
import { HeroContent } from "../content";

export function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center px-4 py-12  overflow-hidden"
      style={
        {
          // Optional fallback colour – you can delete if you don’t need it
          // backgroundColor: '#6A1B9A',
        }
      }
    >
      {/* Pseudo‑element background (grid line) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          zIndex: 1,
        }}
      />

      <div className="relative w-full mx-auto rounded z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <HeroContent />
          </div>

          {/* Right CTA Card */}
          <div className="lg:col-span-1 flex justify-center md:justify-end">
            <CTACard />
          </div>
        </div>
      </div>
    </section>
  );
}
