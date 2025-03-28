"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface VenueMapProps {
  address: string
  venueName: string
}

export function VenueMap({ address, venueName }: VenueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  // This is a placeholder for an actual map implementation
  // In a real application, you would use Google Maps, Mapbox, or another mapping service
  useEffect(() => {
    if (!mapRef.current) return

    // Simulate map loading
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.classList.remove("animate-pulse")

        // Add a pin to the center of the map
        const pin = document.createElement("div")
        pin.className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
        pin.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="h-8 w-8">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        `
        mapRef.current.appendChild(pin)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      <motion.div
        ref={mapRef}
        className="w-full h-[400px] bg-gray-200 rounded-lg relative animate-pulse"
        aria-label={`Map showing location of ${venueName} at ${address}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Map will be rendered here */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Map loading...</p>
            <p className="text-sm mt-2">
              {venueName}, {address}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.a
          href={`https://maps.google.com/?q=${encodeURIComponent(`${venueName}, ${address}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Get Directions
        </motion.a>
      </motion.div>
    </div>
  )
}

