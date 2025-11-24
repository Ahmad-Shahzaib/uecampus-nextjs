// src/components/ui/GlobeMap.tsx
"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ---------- Leaflet icon fix ---------- */
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type LocationPoint = { lat: number; lng: number; name: string; color: string };

export default function GlobeMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<ReturnType<typeof L.map> | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const globe = L.map(mapContainer.current, {
      center: [20, 0],
      zoom: 1.5,
      minZoom: 1,
      maxZoom: 5,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
    });

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2VucGFpcmF2c3UiLCJhIjoiY21lZTR3Y2huMGRtbjJrczhvNGg0ZzNyYiJ9.ZchdhqEpNCsznsNVjBVswg",
      {
        tileSize: 512,
        zoomOffset: -1,
        attribution:
          '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }
    ).addTo(globe);

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

    // Updated locations with all countries from your list
    const locations: LocationPoint[] = [
      // Asia
      {
        lat: 30.3753, lng: 69.3451, name: "Pakistan", color: "#A855F7"
      },
      { lat: 31.7683, lng: 35.2137, name: "Israel", color: "#A855F7" },
      { lat: 24.7136, lng: 46.6753, name: "Saudi Arabia", color: "#A855F7" },
      { lat: 13.7563, lng: 100.5018, name: "Thailand", color: "#A855F7" },
      { lat: 3.1390, lng: 101.6869, name: "Malaysia", color: "#A855F7" },
      { lat: 14.5995, lng: 120.9842, name: "Philippines", color: "#A855F7" },
      { lat: 23.8103, lng: 90.4125, name: "Bangladesh", color: "#A855F7" },
      { lat: 41.7151, lng: 44.8271, name: "Georgia", color: "#A855F7" },
      { lat: 39.9334, lng: 32.8597, name: "Turkey", color: "#A855F7" },
      { lat: 28.6139, lng: 77.2090, name: "India", color: "#A855F7" },
      { lat: 25.0330, lng: 121.5654, name: "Taiwan", color: "#A855F7" },
      { lat: 33.8547, lng: 35.8623, name: "Lebanon", color: "#A855F7" },
      { lat: 24.4539, lng: 54.3773, name: "United Arab Emirates", color: "#A855F7" },
      { lat: 25.2854, lng: 51.5310, name: "Qatar", color: "#A855F7" },

      // Europe
      { lat: 52.5200, lng: 13.4050, name: "Germany", color: "#A855F7" },
      { lat: 41.9028, lng: 12.4964, name: "Italy", color: "#A855F7" },
      { lat: 51.5074, lng: -0.1278, name: "United Kingdom", color: "#A855F7" },
      { lat: 48.2082, lng: 16.3738, name: "Austria", color: "#A855F7" },
      { lat: 38.7223, lng: -9.1393, name: "Portugal", color: "#A855F7" },
      { lat: 52.3676, lng: 4.9041, name: "Netherlands", color: "#A855F7" },
      { lat: 46.9480, lng: 7.4474, name: "Switzerland", color: "#A855F7" },

      // Africa
      { lat: -25.9692, lng: 32.5732, name: "Mozambique", color: "#A855F7" },
      { lat: -25.7479, lng: 28.2293, name: "South Africa", color: "#A855F7" },
      { lat: -24.6541, lng: 25.9087, name: "Botswana", color: "#A855F7" },
      { lat: 0.3476, lng: 32.5825, name: "Uganda", color: "#A855F7" },
      { lat: 5.6037, lng: -0.1870, name: "Ghana", color: "#A855F7" },

      // Americas
      { lat: -15.8267, lng: -47.9218, name: "Brazil", color: "#A855F7" },
      { lat: 10.4806, lng: -66.9036, name: "Venezuela", color: "#A855F7" },
      { lat: 45.4215, lng: -75.6972, name: "Canada", color: "#A855F7" },
      { lat: 38.9072, lng: -77.0369, name: "USA", color: "#A855F7" },
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
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-full overflow-hidden px-4 sm:px-0">
      <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[540px] rounded-full overflow-hidden ring-2 ring-slate-600/40 shadow-2xl animate-spin-slow">
        <div ref={mapContainer} className="absolute inset-0" />
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