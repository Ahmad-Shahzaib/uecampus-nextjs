// components/LeafletMap.tsx
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ----------  Leaflet icon fix (unchanged) ---------- */
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
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    /* ----------  Map init (centered for globe view) ---------- */
    const globe = L.map(mapContainer.current, {
      center: [20, 0],
      zoom: 1.5,
      minZoom: 1,
      maxZoom: 5,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
    });

    /* ----------  COLORFUL GLOBE TILE LAYER (Black oceans, white land) ---------- */
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2VucGFpcmF2c3UiLCJhIjoiY21lZTR3Y2huMGRtbjJrczhvNGg0ZzNyYiJ9.ZchdhqEpNCsznsNVjBVswg",
      {
        tileSize: 512,
        zoomOffset: -1,
        attribution:
          '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }
    ).addTo(globe);

    /* ----------  Force black oceans & white land (override any gray) ---------- */
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-container { 
        background: #000 !important; 
      }
      .leaflet-tile-pane img {
        filter: brightness(1.8) contrast(1.4) !important;
      }
    `;
    document.head.appendChild(style);

    /* ----------  MARKERS (exact colors from your image) ---------- */
    const locations: LocationPoint[] = [
      { lat: 51.5074, lng: -0.1278, name: "London", color: "#FBBF24" }, // Yellow
      { lat: 48.8566, lng: 2.3522, name: "Paris", color: "#A855F7" },
      { lat: 41.9028, lng: 12.4964, name: "Rome", color: "#A855F7" },
      { lat: 40.4168, lng: -3.7038, name: "Madrid", color: "#A855F7" },
      { lat: 37.9838, lng: 23.7275, name: "Athens", color: "#A855F7" },
      { lat: 30.0444, lng: 31.2357, name: "Cairo", color: "#A855F7" },
      { lat: -25.7461, lng: 28.1881, name: "Pretoria", color: "#A855F7" },
    ];

    locations.forEach((loc) => {
      L.circleMarker([loc.lat, loc.lng], {
        radius: 10,
        fillColor: loc.color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 1,
      })
        .addTo(globe)
        .bindPopup(`<b>${loc.name}</b>`);
    });

    map.current = globe;

    return () => {
      if (map.current) map.current.remove();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* -----------  SPINNING COLORFUL GLOBE ----------- */}
      <div className="relative mx-auto aspect-square w-full max-w-[540px] rounded-full overflow-hidden ring-2 ring-slate-600/40 shadow-2xl animate-spin-slow">
        <div ref={mapContainer} className="absolute inset-0" />
        {/* Optional: remove overlay if you want pure map */}
        <svg className="pointer-events-none absolute inset-0 opacity-10 mix-blend-multiply">
          <defs>
            <pattern
              id="diag"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="14" fill="#6366F1" />
            </pattern>
          </defs>
          <rect width="90%" height="90%" fill="url(#diag)" />
        </svg>
      </div>
    </div>
  );
}