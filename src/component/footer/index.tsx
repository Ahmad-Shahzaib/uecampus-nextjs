"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/constants";
import { useDispatch, useSelector } from "@/redux/store";
import { fetchSettingsData } from "@/redux/thunk/settingsThunk";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Globe } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const settings = useSelector((state: any) => state?.settings?.data);

  useEffect(() => {
    if (!settings) {
      dispatch(fetchSettingsData());
    }
  }, [dispatch, settings]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <footer className="bg-[#101820] text-[#E0E0E0] m-4 py-16 sm:m-6 rounded-2xl min-h-[500px] overflow-hidden relative">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-8xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8 rounded-2xl">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-10 sm:gap-12">
          {/* Brand Section */}
          <div className="flex-1 lg:flex-[3] min-w-[250px] max-w-[600px] text-center sm:text-left">
            <div className="mb-6 flex justify-center sm:justify-start">
              <img
                alt="Logo"
                className="h-16 sm:h-32 w-auto"
                src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/uecampus-logo.png"
              />
            </div>
            <p className="mb-6 text-[14px] sm:text-[15px] leading-relaxed text-[#C0C0C0]">
              At UeCampus, we understand the importance of continuous learning
              in today’s fast-paced professional world. We have a wide range of
              courses designed to help you expand your knowledge, acquire new
              skills, and stay ahead of the curve in your industry.
            </p>
            {/* Social Links */}
            <div className="flex justify-center sm:justify-start gap-5 mt-6">
              {(settings
                ? [
                  settings.facebook_link && {
                    name: "Facebook",
                    href: settings.facebook_link,
                    icon: Facebook,
                  },
                  settings.twitter_link && {
                    name: "Twitter",
                    href: settings.twitter_link,
                    icon: Twitter,
                  },
                  settings.linkedin_link && {
                    name: "LinkedIn",
                    href: settings.linkedin_link,
                    icon: Linkedin,
                  },
                  settings.instagram_link && {
                    name: "Instagram",
                    href: settings.instagram_link,
                    icon: Instagram,
                  },
                  settings.youtube_link && {
                    name: "YouTube",
                    href: settings.youtube_link,
                    icon: Youtube,
                  },
                  settings.tiktok_link && {
                    name: "TikTok",
                    href: settings.tiktok_link,
                    icon: Globe,
                  },
                ].filter(Boolean)
                : SOCIAL_LINKS
              ).map((social: any) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  className="text-[#C0C0C0] hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[180px] text-center sm:text-left">
            <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] sm:text-[15px] text-[#C0C0C0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="flex-1 min-w-[180px] text-center sm:text-left">
            <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-white">
              Programs
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] sm:text-[15px] text-[#C0C0C0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1 min-w-[230px] w-full sm:w-auto text-center sm:text-left">
            <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-white">
              Stay Updated
            </h3>
            <form
              onSubmit={handleSubscribe}
              className="space-y-4 flex flex-col items-center sm:items-start w-full"
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full max-w-[300px] sm:max-w-none sm:w-52 py-4 border-none bg-[#2D2F33] text-white placeholder:text-[#A0A0A0] focus-visible:ring-1 focus-visible:ring-purple-600"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full max-w-[300px] sm:max-w-none sm:w-52 py-4 rounded-md border-0 shadow-[0_0_15px_3px_rgba(106,27,154,0.6)] bg-[#6A1B9A] text-white 
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] sm:text-[14px] text-[#C0C0C0] text-center sm:text-left">
          <p>© 2025 UeCampus. All rights reserved.</p>
          {/* <div className="flex flex-wrap justify-center md:justify-end gap-6 sm:gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
