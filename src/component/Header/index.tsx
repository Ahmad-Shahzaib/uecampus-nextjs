// HeaderSection.tsx
"use client";
import { useState, useEffect } from "react";
import LogoSection from "./Logo/index";
import NavigationSection from "./Navbar/index";
import ButtonSection from "./HeaderButton/index";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
   const router = useRouter();
  
    const enqureNavigation = () => {
      router.push("/enquire-now"); // navigate to /about page
    };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 bg-white transition-all duration-300 py-7 
        ${isScrolled ? "left-4 right-4 top-2 rounded-2xl shadow-md py-3" : "w-full shadow-sm py-4"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <LogoSection />
          </div>

          {/* Center: Navigation (only visible on desktop) */}
          <div className="hidden lg:block">
            <NavigationSection />
          </div>

          {/* Right: Buttons (desktop) */}
          <div className="hidden lg:flex flex-shrink-0">
            <ButtonSection />
          </div>

          {/* Mobile: Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slideDown">
            <NavigationSection mobile />
            <div className="flex flex-col gap-3 mt-6">
              <button 
                onClick={() => {
                  router.push("https://app.uecampus.com/login");
                  setMenuOpen(false);
                }}
                className="w-full border border-purple-600 text-purple-700 font-semibold py-2.5 rounded-full"
              >
                Student Portal
              </button>
              <button 
               onClick={enqureNavigation}
                className="w-full bg-[#4C136F] text-white font-semibold py-2.5 rounded-full"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSection;