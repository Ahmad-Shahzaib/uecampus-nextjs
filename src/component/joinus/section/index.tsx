import { CTACard } from "../card";
import { HeroContent } from "../content";

export function HeroSection() {
  return (
    <section className="hero-pattern min-h-screen flex items-center justify-center px-4 py-12 md:py-0" 
     style={{
        backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
           linear-gradient(135deg, #6A1B9A 0%, #8E24AA 50%, #AB47BC 100%))
        `,
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundBlendMode: 'overlay, normal',
      }}>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <HeroContent />

          {/* Right CTA Card */}
          <div className="flex justify-center md:justify-end">
            <CTACard />
          </div>
        </div>
      </div>
    </section>
  )
}
