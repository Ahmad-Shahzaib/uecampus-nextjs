// src/components/HeroSection.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/common/Loader";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchHeroData } from "@/redux/thunk/hero";
import { fetchSearchResults, CourseSearchItem } from "@/redux/thunk/searchCourses";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const dispatch = useDispatch();
  const { data: hero, isLoading, error } = useSelector((state) => state.hero);
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // Track if user has performed a search
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const search = useSelector((state) => state.search);

  const handleSearch = () => {
    const q = (keyword || "").trim();
    if (!q) {
      setShowDropdown(false);
      return;
    }
    setHasSearched(true); // Mark that user has performed a search
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
      // schedule open to avoid synchronous setState inside effect
      setTimeout(() => setShowDropdown(true), 0);
    }
  }, [search?.data, hasSearched]);

  // Fetch on mount if not already loaded
  useEffect(() => {
    if (!hero && !isLoading) {
      dispatch(fetchHeroData());
    }
  }, [dispatch, hero, isLoading]);

  // Defer loading the large hero video to avoid initial transfer on slow
  // networks. Only load after a short idle timeout on reasonable connections.
  useEffect(() => {
    if (!hero || !hero.video || typeof window === "undefined") return;

    const conn = (navigator as any).connection;
    const saveData = conn && conn.saveData;
    const effectiveType = conn && conn.effectiveType;
    const slowConnection = saveData || effectiveType === "2g" || effectiveType === "slow-2g";

    if (slowConnection) return; // avoid loading heavy video on slow connections

    // Prefer requestIdleCallback to defer loading until after first paint
    const idleCallback = (cb: () => void, timeout = 1500) => {
      if ((window as any).requestIdleCallback) {
        return (window as any).requestIdleCallback(cb, { timeout });
      }
      return window.setTimeout(cb, timeout);
    };

    const id = idleCallback(() => {
      // set source token so <source> is rendered and browser starts fetching
      setVideoSrc(hero.video);
      // try to play once source is set
      setTimeout(() => {
        const el = videoRef.current;
        if (el) {
          try {
            el.load();
            el.play().catch(() => {});
          } catch (e) {}
        }
      }, 200);
    }, 1500);

    return () => {
      if ((window as any).cancelIdleCallback) (window as any).cancelIdleCallback(id);
      else window.clearTimeout(id as number);
    };
  }, [hero]);

  // Loading
  if (isLoading) {
    return (
      <div className="bg-black h-[500px] flex items-center justify-center rounded-lg">
        <Loader size={120} text={"Loading hero section..."} />
      </div>
    );
  }

  // Error
  // Error or missing hero data — show loader image instead of plain text
  if (error || !hero) {
    return (
      <div className="bg-black h-[500px] flex items-center justify-center rounded-lg">
        <Loader size={120} text={error ? String(error) : ""} />
      </div>
    );
  }

  return (
    <div className="bg-black w-full flex justify-center rounded-lg">
      <div className="relative w-[calc(100%-24px)] h-[550px] flex items-center justify-center mx-auto rounded-lg">
        {/* Dynamic Video */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <video
            ref={(el) => { videoRef.current = el; }}
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            loop
            muted
            playsInline
            aria-hidden
          >
            {videoSrc && <source src={videoSrc} type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-2 sm:px-8 sm:max-w-4xl w-full mx-auto">
          <div className="sm:w-2xl w-full mx-auto">
            <h1 className="text-2xl font-medium sm:text-3xl lg:text-6xl text-white whitespace-pre-line">
              {hero.title}
            </h1>
          </div>
          <p className="mt-6 text-lg whitespace-pre-line max-w-2xl mx-auto text-white/90">
            {hero.description}
          </p>
          {/* Search Bar */}
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
              />
              {/* Results dropdown */}
              {showDropdown && hasSearched && search?.data && search.data.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg z-50 max-h-64 overflow-auto"
                >
                  {search.data.map((item: CourseSearchItem) => (
                    <a
                      key={item.id}
                      href={`/course/${item.slug}`}
                      className="block px-4 py-3 hover:bg-slate-50 border-b last:border-b-0"
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
            >
              Search
            </Button>
          </div>
          {/* CTA Button from API */}
          {/* <div className="mt-6">
            <Button asChild variant="destructive" className="px-8 py-6 rounded-md">
              <a href={hero.button_link} target="_blank" rel="noopener noreferrer">
                {hero.button_name}
              </a>
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
