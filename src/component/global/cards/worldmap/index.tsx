"use client"

import { useState } from "react"

interface LocationMarker {
  id: string
  country: string
  lat: number
  lng: number
  color: string
}

interface WorldMapVisualizationProps {
  locations?: LocationMarker[]
  className?: string
}

export function WorldMapVisualization({ locations = [], className = "" }: WorldMapVisualizationProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  // Default locations if none provided
  const defaultLocations: LocationMarker[] = [
    { id: "1", country: "France", lat: 46.2276, lng: 2.2137, color: "#FBBF24" },
    { id: "2", country: "Turkey", lat: 38.9637, lng: 35.2433, color: "#EC4899" },
    { id: "3", country: "Indonesia", lat: -0.7893, lng: 113.9213, color: "#EC4899" },
    { id: "4", country: "Malaysia", lat: 4.2105, lng: 101.6964, color: "#EC4899" },
    { id: "5", country: "China", lat: 35.8617, lng: 104.1954, color: "#FBBF24" },
  ]

  const displayLocations = locations.length > 0 ? locations : defaultLocations

  // Convert lat/lng to SVG coordinates for globe projection
  const latLngToSvg = (lat: number, lng: number, centerLng = 0) => {
    // Adjust longitude relative to center
    let adjustedLng = lng - centerLng
    if (adjustedLng > 180) adjustedLng -= 360
    if (adjustedLng < -180) adjustedLng += 360

    // Simple equirectangular projection
    const x = ((adjustedLng + 180) / 360) * 100
    const y = ((90 - lat) / 180) * 100
    return { x, y }
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 1000 800" className="w-full h-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globeGradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E5E5E5" />
          </radialGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Globe background circle */}
        <circle cx="500" cy="400" r="380" fill="url(#globeGradient)" filter="url(#shadow)" />

        <g fill="#000000" stroke="none">
          {/* Greenland */}
          <path d="M 750 120 L 780 100 L 800 180 L 760 200 Z" />
          {/* Iceland */}
          <path d="M 680 140 L 700 130 L 710 160 L 690 170 Z" />
          {/* Scandinavia */}
          <path d="M 700 160 L 740 140 L 760 220 L 720 240 Z" />
          {/* UK & Ireland */}
          <path d="M 650 180 L 680 170 L 690 220 L 660 230 Z" />
          {/* France */}
          <path d="M 670 210 L 700 200 L 710 250 L 680 260 Z" />
          {/* Spain */}
          <path d="M 640 220 L 670 210 L 680 260 L 650 270 Z" />
          {/* Italy */}
          <path d="M 710 240 L 740 230 L 750 290 L 720 300 Z" />
          {/* Turkey */}
          <path d="M 750 260 L 800 250 L 820 310 L 770 320 Z" />
          {/* Middle East */}
          <path d="M 800 280 L 860 270 L 880 360 L 820 370 Z" />
          {/* North Africa */}
          <path d="M 650 280 L 750 270 L 780 360 L 680 370 Z" />
          {/* Sub-Saharan Africa */}
          <path d="M 700 360 L 800 350 L 820 550 L 720 560 Z" />
          {/* Southern Africa */}
          <path d="M 720 520 L 800 510 L 810 620 L 730 630 Z" />
          {/* Russia */}
          <path d="M 750 140 L 950 100 L 980 280 L 800 300 Z" />
          {/* Central Asia */}
          <path d="M 820 260 L 920 240 L 950 360 L 850 380 Z" />
          {/* India */}
          <path d="M 880 320 L 920 310 L 930 420 L 890 430 Z" />
          {/* Southeast Asia */}
          <path d="M 920 360 L 980 350 L 1000 450 L 940 460 Z" />
          {/* China */}
          <path d="M 900 240 L 980 220 L 1000 360 L 920 380 Z" />
          {/* Japan */}
          <path d="M 980 280 L 1010 270 L 1020 340 L 990 350 Z" />
          {/* Australia */}
          <path d="M 950 480 L 1000 470 L 1010 580 L 960 590 Z" />
          {/* New Zealand */}
          <path d="M 1020 560 L 1050 550 L 1060 620 L 1030 630 Z" />
          {/* North America */}
          <path d="M 300 160 L 450 140 L 480 360 L 320 380 Z" />
          {/* Central America */}
          <path d="M 420 360 L 480 350 L 500 420 L 440 430 Z" />
          {/* South America */}
          <path d="M 380 380 L 480 360 L 500 600 L 400 620 Z" />
          {/* West Africa */}
          <path d="M 600 320 L 700 310 L 720 450 L 620 460 Z" />
        </g>

        {displayLocations.map((location) => {
          const { x, y } = latLngToSvg(location.lat, location.lng)
          const svgX = (x / 100) * 760 + 120 // Offset to center on globe
          const svgY = (y / 100) * 760 + 20

          // Only show markers that are on the visible side of the globe
          const isVisible = x >= 0 && x <= 100 && y >= 0 && y <= 100
          const isHovered = hoveredLocation === location.id

          if (!isVisible) return null

          return (
            <g key={location.id} className="cursor-pointer">
              {/* Outer glow circle */}
              <circle
                cx={svgX}
                cy={svgY}
                r={isHovered ? 24 : 16}
                fill={location.color}
                opacity={isHovered ? 0.4 : 0.2}
                className="transition-all duration-300"
              />
              {/* Main marker circle */}
              <circle
                cx={svgX}
                cy={svgY}
                r={isHovered ? 14 : 10}
                fill={location.color}
                opacity={1}
                className="transition-all duration-300"
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              />
              {/* Inner white dot */}
              <circle cx={svgX} cy={svgY} r={isHovered ? 8 : 5} fill="white" opacity={0.95} />
              {/* Country label on hover */}
              {isHovered && (
                <text
                  x={svgX}
                  y={svgY - 35}
                  textAnchor="middle"
                  fill="#000000"
                  fontSize="14"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {location.country}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
