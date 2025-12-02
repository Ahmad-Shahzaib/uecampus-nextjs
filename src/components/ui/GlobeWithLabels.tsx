"use client";

import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

export default function NightCityLightsGlobe() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 700, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  // Countries with their approximate coordinates
  const countries = [
    { name: "Pakistan", lat: 30.3753, lng: 69.3451 },
    { name: "Israel", lat: 31.0461, lng: 34.8516 },
    { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
    { name: "Thailand", lat: 15.8700, lng: 100.9925 },
    { name: "Mozambique", lat: -18.6657, lng: 35.5296 },
    { name: "Lebanon", lat: 33.8547, lng: 35.8623 },
    { name: "United Arab Emirates", lat: 23.4241, lng: 53.8478 },
    { name: "Germany", lat: 51.1657, lng: 10.4515 },
    { name: "South Africa", lat: -30.5595, lng: 22.9375 },
    { name: "Italy", lat: 41.8719, lng: 12.5674 },
    { name: "Malaysia", lat: 4.2105, lng: 101.9758 },
    { name: "United Kingdom", lat: 55.3781, lng: -3.4360 },
    { name: "Botswana", lat: -22.3285, lng: 24.6849 },
    { name: "Philippines", lat: 12.8797, lng: 121.7740 },
    { name: "Georgia", lat: 42.3154, lng: 43.3569 },
    { name: "Turkey", lat: 38.9637, lng: 35.2433 },
    { name: "Bangladesh", lat: 23.6850, lng: 90.3563 },
    { name: "Uganda", lat: 1.3733, lng: 32.2903 },
    { name: "Brazil", lat: -14.2350, lng: -51.9253 },
    { name: "Qatar", lat: 25.3548, lng: 51.1839 },
    { name: "Portugal", lat: 39.3999, lng: -8.2245 },
    { name: "India", lat: 20.5937, lng: 78.9629 },
    { name: "Austria", lat: 47.5162, lng: 14.5501 },
    { name: "Taiwan", lat: 23.6978, lng: 120.9605 },
    { name: "Ghana", lat: 7.9465, lng: -1.0232 },
    { name: "Spain", lat: 40.4637, lng: -3.7492 },
    { name: "Netherlands", lat: 52.1326, lng: 5.2913 },
    { name: "Switzerland", lat: 46.8182, lng: 8.2275 },
    { name: "Venezuela", lat: 6.4238, lng: -66.5897 },
    { name: "Canada", lat: 56.1304, lng: -106.3468 },
    { name: "USA", lat: 37.0902, lng: -95.7129 }
  ];

  useEffect(() => {
    // Check if mobile on initial load
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    
    // Setup globe controls once
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.7;
      globeEl.current.pointOfView({ lat: 20, lng: -40, altitude: 2.5 }, 1000);
    }

    // Responsive sizing
    const updateSize = () => {
      if (containerRef.current) {
        if (isMobile) {
          // For mobile, use full width and calculate height
          const width = containerRef.current.clientWidth;
          const height = width * 1.2; // 5:6 aspect ratio for mobile
          setSize({ width, height });
        } else {
          // For web, keep fixed dimensions
          setSize({ width: 700, height: 800 });
        }
      }
    };

    updateSize();

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("orientationchange", updateSize);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", updateSize);
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [isMobile]);

  // Calculate responsive sizes for points and labels
  const getResponsiveSizes = () => {
    if (isMobile) {
      return {
        pointRadius: 0.8,
        labelSize: 2.0,
        labelDotRadius: 0.6
      };
    }
    return {
      pointRadius: 0.5,
      labelSize: 1.5,
      labelDotRadius: 0.4
    };
  };

  const { pointRadius, labelSize, labelDotRadius } = getResponsiveSizes();

  return (
    <div 
      ref={containerRef} 
      className={`${isMobile ? 'w-full h-auto' : 'w-[600px] h-[800px]'} rounded-2xl overflow-hidden bg-white flex items-center justify-center`}
    >
      <Globe
        ref={globeEl}
        width={size.width}
        height={size.height}
        rendererConfig={{ alpha: true }}
        backgroundColor="#ffffff"

        // Night Earth with city lights
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"

        // Glowing golden points
        pointsData={countries}
        pointAltitude={0.01}
        pointRadius={pointRadius}
        pointColor={() => "#ffb400"}
        pointLabel={() => ""}

        // Labels using the built-in label system
        labelsData={countries}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={labelSize}
        labelColor={() => "#ffb400"}
        labelAltitude={0.01}
        labelRotation={0}
        labelIncludeDot={true}
        labelDotRadius={labelDotRadius}
      />
    </div>
  );
}