// src/components/HeroSection.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/common/Loader";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchHeroData } from "@/redux/thunk/hero";
import { fetchSearchResults, CourseSearchItem } from "@/redux/thunk/searchCourses";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const HeroSection = ({ heroProp }: { heroProp?: any } ) => {
  const dispatch = useDispatch();
  const reduxHeroState = useSelector((state) => state.hero);
  const hero = heroProp ?? reduxHeroState.data;
  const isLoading = heroProp ? false : reduxHeroState.isLoading;
  const error = reduxHeroState.error;
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const search = useSelector((state) => state.search);

  const handleSearch = () => {
    const q = (keyword || "").trim();
    if (!q) {
      setShowDropdown(false);
      return;
    }
    setHasSearched(true);
    dispatch(fetchSearchResults(q));
    setShowDropdown(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      const target = e.target as Node;
      if (!dropdownRef.current.contains(target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Open dropdown when results arrive AND user has performed a search
  useEffect(() => {
    if (hasSearched && search?.data && search.data.length > 0) {
      setTimeout(() => setShowDropdown(true), 0);
    }
  }, [search?.data, hasSearched]);

  // OPTIMIZATION 1: Fetch on mount only when server didn't provide hero data
  useEffect(() => {
    if (heroProp) return; // server already hydrated the hero
    dispatch(fetchHeroData());
  }, [dispatch, heroProp]);

  // OPTIMIZATION 2: Improved video loading strategy
  useEffect(() => {
    if (!hero || !hero.video || typeof window === "undefined") return;

    const conn = (navigator as any).connection;
    const saveData = conn && conn.saveData;
    const effectiveType = conn && conn.effectiveType;
    const slowConnection = saveData || effectiveType === "2g" || effectiveType === "slow-2g";

    if (slowConnection) return;

    // Load video immediately after hero data is available
    const loadVideo = () => {
      setVideoSrc(hero.video);
      
      // Use IntersectionObserver for better performance
      if ('IntersectionObserver' in window && videoRef.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = videoRef.current;
                if (el && videoSrc) {
                  try {
                    el.load();
                    el.play().catch(() => {});
                  } catch (e) {}
                  observer.disconnect();
                }
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(videoRef.current);
        return () => observer.disconnect();
      } else {
        // Fallback for browsers without IntersectionObserver
        setTimeout(() => {
          const el = videoRef.current;
          if (el) {
            try {
              el.load();
              el.play().catch(() => {});
            } catch (e) {}
          }
        }, 100);
      }
    };

    // Use requestIdleCallback for non-critical video load, but don't delay initial render
    if ((window as any).requestIdleCallback) {
      const id = (window as any).requestIdleCallback(loadVideo, { timeout: 500 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const id = setTimeout(loadVideo, 200);
      return () => clearTimeout(id);
    }
  }, [hero, videoSrc]);

  // OPTIMIZATION 3: Show video only after it starts loading
  useEffect(() => {
    if (videoSrc) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setShowVideo(true), 100);
      return () => clearTimeout(timer);
    }
  }, [videoSrc]);

  // OPTIMIZATION 4: Render placeholder immediately, don't block LCP
  // This ensures the hero section renders instantly with skeleton content
  const renderContent = () => {
    // Show skeleton with gradient background immediately
    if (isLoading || !hero) {
      return (
        <div className="bg-black w-full flex justify-center rounded-lg">
          <div className="relative w-[calc(100%-24px)] h-[550px] flex items-center justify-center mx-auto rounded-lg overflow-hidden">
            {/* Gradient placeholder for instant render */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-pulse rounded-lg" />
            
            {/* Skeleton content for LCP optimization */}
            <div className="relative z-10 text-center px-2 sm:px-8 sm:max-w-4xl w-full mx-auto">
              <div className="sm:w-2xl w-full mx-auto">
                <div className="h-16 bg-white/10 rounded-lg mx-auto max-w-2xl animate-pulse" />
              </div>
              <div className="mt-6 h-6 bg-white/10 rounded-lg max-w-xl mx-auto animate-pulse" />
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
                <div className="w-full sm:w-[600px] h-14 bg-white/10 rounded-lg animate-pulse" />
                <div className="w-full sm:w-32 h-14 bg-white/10 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Main hero content
    return (
      <div className="bg-black w-full flex justify-center rounded-lg">
        <div className="relative w-[calc(100%-24px)] h-[550px] flex items-center justify-center mx-auto rounded-lg">
          {/* Video Background with optimized loading */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            {/* OPTIMIZATION 5: Render a preloaded `Image` as the LCP candidate (priority). */}
            {hero?.thumbnail ? (
              <Image
                src={hero.thumbnail}
                alt={hero.title || "Hero background"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className={`absolute inset-0 object-cover transition-opacity duration-150 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                // keep image accessible but decorative for screen readers
                aria-hidden={videoLoaded}
              />
            ) : (
              // Fallback gradient when no thumbnail is available (still fast to paint)
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}

            {/* OPTIMIZATION 6: Keep the <video> off the LCP path by not providing sources until we want to load it.
                - `videoSrc` is set only after idle/observer checks (so it won't be chosen as LCP)
                - video remains visually hidden (opacity) until it has loaded */}
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
                showVideo ? 'opacity-100' : 'opacity-0'
              }`}
              preload="none"
              loop
              muted
              playsInline
              aria-hidden="true"
              onLoadedData={() => setVideoLoaded(true)}
              // keep poster on the video as a safety-net for browsers that use it
              poster={hero?.thumbnail || undefined}
            >
              {/* Source is injected only when `videoSrc` is set (keeps video out of LCP) */}
              {videoSrc && (
                <>
                  {/* prefer small/webm first if available (add on server-side if possible) */}
                  <source src={videoSrc.replace(/\.mp4$/i, '.webm')} type="video/webm" />
                  <source src={videoSrc} type="video/mp4" />
                </>
              )}
            </video>

            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content - renders immediately */}
          <div className="relative z-10 text-center px-2 sm:px-8 sm:max-w-4xl w-full mx-auto">
            <div className="sm:w-2xl w-full mx-auto">
              <h1 className="text-2xl font-medium sm:text-3xl lg:text-6xl text-white whitespace-pre-line">
                {hero.title}
              </h1>
            </div>
            <p className="mt-6 text-lg whitespace-pre-line max-w-2xl mx-auto text-white/90">
              {hero.description}
            </p>
            
            {/* OPTIMIZATION 7: Search bar optimized */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center w-full relative">
              <div className="w-full sm:w-auto relative">
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="w-full py-6 sm:w-[600px] bg-white/90 backdrop-blur-sm border-white/20"
                  placeholder="Search courses..."
                  aria-label="Search courses"
                />
                
                {/* Results dropdown with optimized rendering */}
                {showDropdown && hasSearched && search?.data && search.data.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg z-50 max-h-64 overflow-auto"
                    role="listbox"
                  >
                      {search.data.map((item: CourseSearchItem) => (
                        <a
                          key={item.id}
                          href={`/course/${item.slug}`}
                          className="block px-4 py-3 hover:bg-slate-50 border-b last:border-b-0"
                          role="option"
                        >
                          <div className="text-sm font-medium text-slate-800">{item.name}</div>
                          {item.small_description && (
                            <div className="text-xs text-slate-600">{item.small_description}</div>
                          )}
                        </a>
                      ))}
                  </div>
                )}
              </div>
              <Button
                onClick={handleSearch}
                variant="destructive"
                className="px-8 py-6 w-full rounded-md sm:w-auto"
                aria-label="Search"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default HeroSection;