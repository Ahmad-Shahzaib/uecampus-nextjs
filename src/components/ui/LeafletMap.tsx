// components/LeafletMap.tsx
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type LocationPoint = { lat: number; lng: number; name: string; color: string };

export default function LeafletMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<ReturnType<typeof L.map> | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Create map (standard Web Mercator) - we will mask it into a circle to emulate a globe
    const globe = L.map(mapContainer.current, {
      center: [45, 10],
      zoom: 2,
      minZoom: 1,
      maxZoom: 5,
      worldCopyJump: true,
      zoomControl: false,
      attributionControl: false,
    });

    // Dark basemap without API keys
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      tileSize: 256,
      maxZoom: 5,
      className: "globe-tiles",
    }).addTo(globe);

    // Custom background color to match screenshot tone
    const style = document.createElement("style");
    style.innerHTML = `.leaflet-container{background:#A5B4FC !important;}`;
    document.head.appendChild(style);

    // Markers
    const locations: LocationPoint[] = [
      // Yellow – Germany (Berlin area)
      { lat: 52.52, lng: 13.405, name: "Germany", color: "#FBBF24" },

      // Purple chain (Spain → India)
      { lat: 40.42, lng: -3.70, name: "Spain", color: "#6D28D9" },
      { lat: 41.89, lng: 12.49, name: "Italy", color: "#6D28D9" },
      { lat: 39.93, lng: 32.86, name: "Turkey", color: "#6D28D9" },
      { lat: 35.68, lng: 51.39, name: "Iran", color: "#6D28D9" },
      { lat: 33.68, lng: 73.05, name: "Pakistan", color: "#6D28D9" },
      { lat: 28.61, lng: 77.20, name: "India", color: "#6D28D9" },
    ];

    locations.forEach((loc) => {
      L.circleMarker([loc.lat, loc.lng], {
        radius: 10,
        fillColor: loc.color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .addTo(globe)
        .bindPopup(`<b>${loc.name}</b>`);
    });

    // Keep reference for cleanup
    map.current = globe;

    return () => {
      if (map.current) map.current.remove();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Circular masked map container to emulate globe */}
      <div className="relative mx-auto aspect-square w-full max-w-[540px] rounded-full overflow-hidden ring-2 ring-slate-600/40 shadow-2xl">
        <div ref={mapContainer} className="absolute inset-0" />
        {/* Diagonal pattern overlay */}
        <svg className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply">
          <defs>
            <pattern id="diag" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="14" fill="#6366F1" />
            </pattern>
          </defs>
          <rect width="90%" height="90%" fill="url(#diag)" />
        </svg>
      </div>
    </div>
  );
}