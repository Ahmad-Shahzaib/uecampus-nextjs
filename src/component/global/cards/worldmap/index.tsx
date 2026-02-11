"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Location {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

const HIGHLIGHTED_LOCATIONS: Location[] = [
  { name: "United Kingdom", lat: 55.3781, lng: -3.436, color: "#a855f7" },
  { name: "Italy", lat: 41.8719, lng: 12.5674, color: "#a855f7" },
  { name: "Greece", lat: 39.0742, lng: 21.8243, color: "#a855f7" },
  { name: "Turkey", lat: 38.9637, lng: 35.2433, color: "#a855f7" },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792, color: "#a855f7" },
  { name: "UAE", lat: 23.4241, lng: 53.8478, color: "#a855f7" },
  { name: "Iran", lat: 32.4279, lng: 53.688, color: "#a855f7" },
];

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Cache initial container measurements to avoid repeated layout reads
    const initialWidth = container.clientWidth;
    const initialHeight = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(
      75,
      initialWidth / initialHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setClearColor(0x0f172a, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Globe geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x0f172a,
      emissive: 0x222222,
      shininess: 5,
      wireframe: false,
    });
    const globe = new THREE.Mesh(geometry, material);
    globeGroup.add(globe);

    // Add highlight markers
    HIGHLIGHTED_LOCATIONS.forEach((loc) => {
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lng + 180) * (Math.PI / 180);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      const markerGeo = new THREE.SphereGeometry(0.03, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: loc.color });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(x, y, z);
      globeGroup.add(marker);
    });

    // Animate rotation
    const animate = () => {
      requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler: read layout once, then perform writes inside rAF
    let resizeRaf: number | null = null;
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    };

    // Use ResizeObserver on the container for more precise updates, fallback to window resize
    const ro = new ResizeObserver(() => handleResize());
    ro.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      try {
        ro.disconnect();
      } catch (e) {}
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="col-md-6 pt-sm-3 position-relative">
      <div
        id="map"
        ref={containerRef}
        className="relative w-full h-[500px] rounded-2xl overflow-hidden"
      />
      {/* Half-globe mask */}
      <div className="globe-mask absolute  bg-gradient-to-r from-slate-900/90 to-transparent pointer-events-none" />
    </div>
  );
}
