"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/constants"
import { ImageCard } from "@/components/ui/ImageCard"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your subscription logic here
    setTimeout(() => {
      setEmail("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <footer className="bg-slate-950 text-slate-100">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <ImageCard src="https://newwebsite.uecampus.com/wp-content/themes/uecampus-theme-2025/assets/images/uecampus-logo.png" alt="Logo" />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              At UeCampus, we understand the importance of continuous learning in today's fast-paced professional world.
              We have a wide range of courses designed to help you expand your knowledge, acquire new skills, and stay
              ahead of the curve in your industry.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Programs</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
              >
                {isLoading ? "Subscribing..." : "SUBSCRIBE"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-400">© 2025 UeCampus. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-slate-400 transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-slate-400 transition-colors hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
