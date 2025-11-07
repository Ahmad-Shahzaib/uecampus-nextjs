// src/component/faqs/LoadingSkeleton.tsx
"use client";

const LoadingSkeleton = () => {
  return (
    <section 
      className="relative min-h-screen overflow-hidden text-white font-sans"
      style={{
        backgroundImage: `
          url('https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/grid-line-2.png'),
          linear-gradient(to bottom, rgb(27 35 42), rgb(27 35 42))
        `,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT – Headline Skeleton */}
          <div className="flex flex-col justify-center text-center lg:text-left lg:items-start min-h-[500px] lg:min-h-screen">
            <div className="animate-pulse">
              <div className="h-16 bg-slate-700/50 rounded-lg mb-4"></div>
              <div className="h-16 bg-slate-700/50 rounded-lg mb-4"></div>
              <div className="h-8 bg-slate-700/50 rounded-lg w-3/4 mb-6"></div>
              <div className="h-6 bg-slate-700/50 rounded-lg w-2/3 mb-2"></div>
              <div className="h-6 bg-slate-700/50 rounded-lg w-1/2"></div>
            </div>
          </div>

          {/* RIGHT – FAQ Skeleton */}
          <div className="w-full space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="flex items-center gap-4 py-5 px-2 sm:px-4">
                  <div className="w-12 h-12 bg-slate-700/50 rounded"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-slate-700/50 rounded mb-2"></div>
                    <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                  </div>
                  <div className="w-6 h-6 bg-slate-700/50 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;