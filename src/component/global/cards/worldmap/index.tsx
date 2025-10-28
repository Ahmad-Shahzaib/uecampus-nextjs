"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface WorldMapVisualization {
  name: string
  lat: number
  lng: number
  color: string
}

const HIGHLIGHTED_LOCATIONS: WorldMapVisualization[] = [
  { name: "United Kingdom", lat: 55.3781, lng: -3.436, color: "#FFFF00" },
  { name: "Italy", lat: 41.8719, lng: 12.5674, color: "#D946EF" },
  { name: "Greece", lat: 39.0742, lng: 21.8243, color: "#D946EF" },
  { name: "Turkey", lat: 38.9637, lng: 35.2433, color: "#D946EF" },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792, color: "#D946EF" },
  { name: "UAE", lat: 23.4241, lng: 53.8478, color: "#D946EF" },
  { name: "Iran", lat: 32.4279, lng: 53.688, color: "#D946EF" },
]

const COUNTRY_LABELS = [
  { name: "Russia", lat: 61.524, lng: 105.3188 },
  { name: "Greenland", lat: 71.7069, lng: -42.6043 },
  { name: "Iceland", lat: 64.9631, lng: -19.0208 },
  { name: "Svalbard", lat: 78.2232, lng: 15.6267 },
  { name: "Sweden", lat: 60.1282, lng: 18.6435 },
  { name: "Norway", lat: 60.472, lng: 8.4689 },
  { name: "United Kingdom", lat: 55.3781, lng: -3.436 },
  { name: "France", lat: 46.2276, lng: 2.2137 },
  { name: "Spain", lat: 40.4637, lng: -3.7492 },
  { name: "Italy", lat: 41.8719, lng: 12.5674 },
  { name: "Greece", lat: 39.0742, lng: 21.8243 },
  { name: "Turkey", lat: 38.9637, lng: 35.2433 },
  { name: "United States", lat: 37.0902, lng: -95.7129 },
  { name: "Brazil", lat: -14.235, lng: -51.9253 },
  { name: "North America", lat: 54.526, lng: -105.2551 },
  { name: "Europe", lat: 54.526, lng: 15.2551 },
  { name: "Africa", lat: -8.7832, lng: 34.5085 },
  { name: "Asia", lat: 34.0479, lng: 100.6197 },
  { name: "North Atlantic Ocean", lat: 32.0, lng: -30.0 },
  { name: "Bangladesh", lat: 23.685, lng: 90.3563 },
  { name: "Uzbekistan", lat: 41.3775, lng: 64.5853 },
  { name: "Turkmenistan", lat: 38.9697, lng: 59.5563 },
  { name: "Pakistan", lat: 30.3753, lng: 69.3451 },
  { name: "Iran", lat: 32.4279, lng: 53.688 },
  { name: "Iraq", lat: 33.2232, lng: 43.6793 },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
  { name: "Yemen", lat: 15.3694, lng: 48.515 },
  { name: "Egypt", lat: 26.8206, lng: 30.8025 },
  { name: "Ethiopia", lat: 9.145, lng: 40.4897 },
  { name: "Morocco", lat: 31.7917, lng: -7.0926 },
  { name: "Algeria", lat: 28.0339, lng: 1.6596 },
  { name: "Tunisia", lat: 33.8869, lng: 9.5375 },
  { name: "Libya", lat: 26.3351, lng: 17.2283 },
  { name: "Mali", lat: 17.5707, lng: -3.9962 },
  { name: "Niger", lat: 17.6078, lng: 8.6753 },
  { name: "Mauritania", lat: 21.0079, lng: -10.9408 },
  { name: "Cameroon", lat: 3.848, lng: 11.5021 },
  { name: "Zambia", lat: -13.1339, lng: 27.8493 },
  { name: "Namibia", lat: -22.9375, lng: 18.6947 },
  { name: "Venezuela", lat: 6.4238, lng: -66.5897 },
  { name: "Belarus", lat: 53.7098, lng: 27.9534 },
]

export function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const globeRef = useRef<THREE.Group | null>(null)
  const labelsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 2.5
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x0f172a, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create globe group
    const globeGroup = new THREE.Group()
    sceneRef.current.add(globeGroup)
    globeRef.current = globeGroup

    // Create globe geometry
    const geometry = new THREE.IcosahedronGeometry(1, 64)
    const material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x111111,
      shininess: 5,
    })
    const globe = new THREE.Mesh(geometry, material)
    globeGroup.add(globe)

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(5, 3, 5)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Create labels container
    const labelsContainer = document.createElement("div")
    labelsContainer.style.position = "absolute"
    labelsContainer.style.top = "0"
    labelsContainer.style.left = "0"
    labelsContainer.style.width = "100%"
    labelsContainer.style.height = "100%"
    labelsContainer.style.pointerEvents = "none"
    containerRef.current.appendChild(labelsContainer)
    labelsRef.current = labelsContainer

    // Add country labels
    const addLabel = (name: string, lat: number, lng: number, isHighlight = false) => {
      const label = document.createElement("div")
      label.textContent = name
      label.style.position = "absolute"
      label.style.fontSize = isHighlight ? "12px" : "11px"
      label.style.fontWeight = isHighlight ? "600" : "400"
      label.style.color = isHighlight ? "#ffffff" : "#999999"
      label.style.textShadow = "0 0 3px rgba(0,0,0,0.8)"
      label.style.whiteSpace = "nowrap"
      label.style.transform = "translate(-50%, -50%)"
      label.style.zIndex = isHighlight ? "10" : "1"
      labelsContainer.appendChild(label)

      return { label, lat, lng }
    }

    const labels: Array<{ label: HTMLElement; lat: number; lng: number }> = []

    COUNTRY_LABELS.forEach((loc) => {
      const isHighlight = HIGHLIGHTED_LOCATIONS.some((h) => h.name === loc.name)
      labels.push(addLabel(loc.name, loc.lat, loc.lng, isHighlight))
    })

    // Add highlight dots
    const highlightDots: THREE.Mesh[] = []
    HIGHLIGHTED_LOCATIONS.forEach((loc) => {
      const phi = (90 - loc.lat) * (Math.PI / 180)
      const theta = (loc.lng + 180) * (Math.PI / 180)

      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.cos(phi)
      const z = Math.sin(phi) * Math.sin(theta)

      const dotGeometry = new THREE.SphereGeometry(0.04, 32, 32)
      const dotMaterial = new THREE.MeshBasicMaterial({ color: loc.color })
      const dot = new THREE.Mesh(dotGeometry, dotMaterial)
      dot.position.set(x, y, z)
      globeGroup.add(dot)
      highlightDots.push(dot)
    })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate globe
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.0002
      }

      // Update label positions
      labels.forEach(({ label, lat, lng }) => {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lng + 180) * (Math.PI / 180)

        const x = Math.sin(phi) * Math.cos(theta)
        const y = Math.cos(phi)
        const z = Math.sin(phi) * Math.sin(theta)

        const vector = new THREE.Vector3(x, y, z)
        vector.project(camera)

        const widthHalf = containerRef.current!.clientWidth / 2
        const heightHalf = containerRef.current!.clientHeight / 2

        label.style.left = vector.x * widthHalf + widthHalf + "px"
        label.style.top = -vector.y * heightHalf + heightHalf + "px"

        // Hide labels on back of globe
        label.style.opacity = vector.z > 0 ? "1" : "0"
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      containerRef.current?.removeChild(labelsContainer)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="relative w-full h-full max-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      />
    </div>
  )
}

// Export a component with the name expected by other modules.
// Accepts an optional `locations` prop to match the caller signature but
// currently delegates to the InteractiveGlobe rendering.
export function WorldMapVisualization({
  locations,
}: {
  locations?: Array<{
    id: string
    country: string
    lat: number
    lng: number
    color: string
  }>
}) {
  // We don't use `locations` inside the globe for now, but keep the prop
  // to preserve the external contract. Future improvements can map these
  // into highlighted dots/labels.
  void locations
  return <InteractiveGlobe />
}
