"use client";
import { useState, useEffect } from "react";
import LogoSection from "./Logo";
import NavigationSection from "./Navbar";
import ButtonSection from "./HeaderButton";
import { Menu, X } from "lucide-react";


const HeaderSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 bg-white shadow-md transition-all duration-300 
        ${isScrolled ? "left-4 right-4 top-2 rounded-2xl px-6" : "w-full px-8"}
      `}
    >
      <div className="flex items-center justify-between py-4 relative">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <LogoSection />
        </div>

        {/* Center: Navigation (only visible on desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <NavigationSection />
        </div>

        {/* Right: Buttons (desktop) */}
        <div className="hidden md:flex flex-shrink-0">
          <ButtonSection />
        </div>

        {/* Mobile: Hamburger */}
        <div className="md:hidden">
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
        <div className="md:hidden flex flex-col items-start gap-4 pb-6 px-4 animate-slideDown">
          <NavigationSection mobile />
          <div className="flex flex-col w-full gap-3 mt-2">
            <button className="w-full border border-purple-600 text-purple-700 font-semibold py-2 rounded-full">
              Student Portal
            </button>
            <button className="w-full bg-purple-700 text-white font-semibold py-2 rounded-full">
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderSection;
