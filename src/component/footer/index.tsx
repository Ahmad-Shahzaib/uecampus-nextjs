"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/constants";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <footer className="bg-[#101820] text-[#E0E0E0] m-6 rounded-2xl min-h-[500px] overflow-hidden relative">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 rounded-2xl">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-12">
          {/* Brand Section (takes 2 columns) */}
          <div className="flex-1 lg:flex-[3] min-w-[300px] max-w-[600px]">
            <div className="mb-6">
              <img
                alt="Logo"
                className="h-20 w-auto"
                src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/uecampus-logo.png"
              />
            </div>
            <p className="mb-6 text-[15px] leading-relaxed text-[#C0C0C0]">
              At UeCampus, we understand the importance of continuous learning
              in today’s fast-paced professional world. We have a wide range of
              courses designed to help you expand your knowledge, acquire new
              skills, and stay ahead of the curve in your industry.
            </p>
            {/* Social Links */}
            <div className="flex gap-6 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-[#C0C0C0] hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[150px]">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#C0C0C0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="flex-1 min-w-[150px]">
            <h3 className="mb-6 text-lg font-semibold text-white">Programs</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#C0C0C0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="mb-6 text-lg font-semibold text-white">
              Stay Updated
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-52 py-5 border-none bg-[#2D2F33] text-white placeholder:text-[#A0A0A0] focus-visible:ring-1 focus-visible:ring-purple-600"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-52 py-5 rounded-md border-0 shadow-[0_0_15px_3px_rgba(106,27,154,0.6)]  bg-[#6A1B9A] text-white 
             hover:bg-[#5A1480] hover:shadow-[0_0_15px_3px_rgba(106,27,154,0.6)] 
             transition-all duration-300"
              >
                {isLoading ? "Subscribing..." : "SUBSCRIBE"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#2E2E2E]">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] text-[#C0C0C0]">
          <p>© 2025 UeCampus. All rights reserved.</p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
