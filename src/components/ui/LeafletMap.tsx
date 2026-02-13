import React from 'react'
import dynamic from 'next/dynamic'

const GlobeWithLabels = dynamic(() => import('./GlobeWithLabels'), {
  ssr: false,
  loading: () => <div />,
})

export default function LeafletMap() {
  const [loaded, setLoaded] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (loaded) return
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: keep placeholder and let user click to load
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [loaded])

  const handleLoad = React.useCallback(() => {
    if (loaded || isLoading) return
    setIsLoading(true)
    // setLoaded triggers dynamic import of the heavy globe component
    setLoaded(true)
  }, [loaded, isLoading])

  return (
    <div
      ref={ref}
      className="relative w-full"
      aria-busy={isLoading || loaded}
      aria-live="polite"
    >
      {loaded ? (
        <GlobeWithLabels />
      ) : (
        <div className="w-full h-full bg-slate-800/60 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="relative w-full ">
            <img
              src="//unpkg.com/three-globe/example/img/earth-night.jpg"
              alt="Static preview of globe"
              className="object-cover w-full h-full opacity-90"
              decoding="async"
              loading="lazy"
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={handleLoad}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLoad();
                  }
                }}
                className="pointer-events-auto px-4 py-2 bg-white/90 text-black rounded shadow"
                aria-label="Load interactive globe"
                aria-pressed={loaded}
                disabled={isLoading}
              >
                {isLoading ? 'Loading…' : 'Load globe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}