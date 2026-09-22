"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Search, Maximize2, Minimize2, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  location: string;
  address: string;
  neighbourhoodHighlights: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  location,
  neighbourhoodHighlights,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let map: any;
    let isMounted = true;

    // Dynamically import Leaflet so it only loads on the client
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      // Center around [15.498, 73.832] zoom 12 so Candolim is in the exact spot as the Airbnb reference
      map = L.map(mapContainerRef.current, {
        center: [15.498, 73.832],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        // Scroll wheel zoom is DISABLED by default in embedded mode so it doesn't hijack page scrolling.
        // It is only enabled when the user expands the map.
        scrollWheelZoom: false,
      });

      mapInstanceRef.current = map;

      // Google Maps Roadmap raster tiles
      L.tileLayer("https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        subdomains: ["0", "1", "2", "3"],
        maxZoom: 20,
      }).addTo(map);

      // Airbnb black circle house pin at Candolim
      const houseIcon = L.divIcon({
        className: "custom-airbnb-marker",
        html: `
          <div style="width: 44px; height: 44px; background: #222222; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2.5px solid white; cursor: pointer; transition: transform 0.2s ease;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
            </svg>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      L.marker([15.5185, 73.768], { icon: houseIcon }).addTo(map);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map size and toggle scrollWheelZoom whenever expansion changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (isExpanded) {
      // Zoom in and out with mouse scroll is ENABLED only when expanded!
      mapInstanceRef.current.scrollWheelZoom.enable();
      document.body.style.overflow = "hidden";
    } else {
      // Zoom in and out with mouse scroll is DISABLED in embedded view
      mapInstanceRef.current.scrollWheelZoom.disable();
      document.body.style.overflow = "";
    }

    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  // Close expanded map on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    mapInstanceRef.current?.zoomOut();
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div id="location-section" className="py-10 border-b border-[#EBEBEB]">
      <h3 style={{ fontSize: 22, fontWeight: 500, color: "#222222", marginBottom: 4 }}>
        Where you&apos;ll be
      </h3>
      {/* 16px/400 location label */}
      <p style={{ fontSize: 16, fontWeight: 400, color: "#222222", marginBottom: 20 }}>{location}</p>

      {/* Placeholder to prevent layout jump when map is expanded to full viewport */}
      {isExpanded && <div className="w-full h-[480px] rounded-2xl bg-[#E5E3DF]" />}

      {/* Map container with authentic Airbnb overlays */}
      <div
        className={
          isExpanded
            ? "fixed inset-0 z-[99999] w-screen h-screen bg-[#E5E3DF] overflow-hidden"
            : "relative rounded-2xl overflow-hidden w-full h-[480px] bg-[#E5E3DF] border border-[#EBEBEB]"
        }
      >
        {/* Leaflet map div */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Top-left search pill: "Find things to do" */}
        <div className="absolute top-5 left-5 z-[400] pointer-events-auto flex items-center gap-3">
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] flex items-center justify-center hover:bg-gray-100 text-[#222222] transition-colors cursor-pointer"
              title="Close expanded map"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.18)] text-sm text-[#222222] min-w-[260px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.22)] transition-shadow cursor-pointer">
            <Search className="w-4 h-4 text-[#717171]" />
            <span className="text-[#717171] text-[14px] font-normal">Find things to do</span>
          </div>
        </div>

        {/* Right-side controls (Expand/Collapse, Zoom In/Out, Street View Pegman) */}
        <div className="absolute top-5 right-5 z-[400] flex flex-col gap-3 pointer-events-auto">
          {/* Fullscreen Expand / Collapse button */}
          <button
            onClick={toggleExpand}
            className="w-10 h-10 rounded-lg bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-gray-50 text-[#555555] transition-colors cursor-pointer"
            title={isExpanded ? "Collapse map" : "Expand map"}
          >
            {isExpanded ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          {/* Zoom controls (+ and -) */}
          <div className="flex flex-col bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.2)] overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-[#555555] text-2xl font-light transition-colors cursor-pointer leading-none"
              title="Zoom in"
            >
              +
            </button>
            <div className="h-px bg-[#EBEBEB] mx-2" />
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-[#555555] text-2xl font-light transition-colors cursor-pointer leading-none"
              title="Zoom out"
            >
              −
            </button>
          </div>

          {/* Street View Pegman */}
          <div
            className="w-10 h-10 rounded-lg bg-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors"
            title="Drag Pegman to use Street View"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#F4B400]">
              <circle cx="12" cy="5" r="2.5" />
              <path d="M14.5 9h-5c-.8 0-1.5.7-1.5 1.5v4c0 .6.4 1 1 1h1v6c0 .6.4 1 1 1s1-.4 1-1v-6h1v6c0 .6.4 1 1 1s1-.4 1-1v-6h1c.6 0 1-.4 1-1v-4c0-.8-.7-1.5-1.5-1.5z" />
            </svg>
          </div>
        </div>

        {/* Google logo at bottom-left */}
        <div className="absolute bottom-2 left-3 z-[400] pointer-events-none select-none">
          <svg className="h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" viewBox="0 0 74 24" fill="none">
            <path d="M9.24 10.74V13.88H15.17C14.93 15.19 14.15 16.97 12.19 18.32C10.51 19.48 8.16 20.14 5.38 18.66C2.6 17.18 1.15 14.18 1.76 11.08C2.37 7.98 4.88 5.62 8.04 5.25C9.72 5.06 11.39 5.64 12.67 6.84L15.13 4.45C13.25 2.68 10.74 1.76 8.04 1.83C3.62 1.83 0 5.45 0 9.87C0 14.29 3.62 17.91 8.04 17.91C12.66 17.91 15.71 14.67 15.71 10.23C15.71 9.54 15.65 9.07 15.54 8.61H9.24V10.74Z" fill="#4285F4"/>
            <path d="M25.76 11.23C25.76 7.69 22.88 4.96 19.34 4.96C15.8 4.96 12.92 7.69 12.92 11.23C12.92 14.77 15.8 17.5 19.34 17.5C22.88 17.5 25.76 14.77 25.76 11.23ZM22.58 11.23C22.58 13.57 20.91 14.99 19.34 14.99C17.77 14.99 16.1 13.57 16.1 11.23C16.1 8.89 17.77 7.47 19.34 7.47C20.91 7.47 22.58 8.89 22.58 11.23Z" fill="#EA4335"/>
            <path d="M39.63 11.23C39.63 7.69 36.75 4.96 33.21 4.96C29.67 4.96 26.79 7.69 26.79 11.23C26.79 14.77 29.67 17.5 33.21 17.5C36.75 17.5 39.63 14.77 39.63 11.23ZM36.45 11.23C36.45 13.57 34.78 14.99 33.21 14.99C31.64 14.99 29.97 13.57 29.97 11.23C29.97 8.89 31.64 7.47 33.21 7.47C34.78 7.47 36.45 8.89 36.45 11.23Z" fill="#FBBC05"/>
            <path d="M53.13 5.34V6.52H53.02C52.4 5.76 51.27 4.96 49.61 4.96C46.12 4.96 43.15 7.98 43.15 11.26C43.15 14.51 46.12 17.53 49.61 17.53C51.27 17.53 52.4 16.73 53.02 15.94H53.13V16.89C53.13 19.46 51.72 20.87 49.53 20.87C47.74 20.87 46.63 19.59 46.17 18.52L43.43 19.66C44.22 21.57 46.34 23.38 49.53 23.38C53.02 23.38 55.97 21.32 55.97 16.42V5.34H53.13ZM49.85 14.99C48.28 14.99 46.33 13.62 46.33 11.26C46.33 8.87 48.28 7.5 49.85 7.5C51.42 7.5 53.37 8.87 53.37 11.26C53.37 13.62 51.42 14.99 49.85 14.99Z" fill="#4285F4"/>
            <path d="M59.98 1.83H56.8V17.5H59.98V1.83Z" fill="#34A853"/>
            <path d="M70.36 13.25L72.82 14.89C72.03 16.07 70.33 17.5 67.88 17.5C64.31 17.5 61.64 14.72 61.64 11.23C61.64 7.61 64.34 4.96 67.61 4.96C70.92 4.96 72.82 7.64 72.82 7.64L72.48 8.16L65.34 11.12C65.88 12.18 66.73 12.74 67.88 12.74C69.03 12.74 69.83 12.18 70.36 13.25ZM64.67 11.04L69.64 8.98C69.36 8.32 68.57 7.74 67.72 7.74C66.63 7.74 64.62 8.71 64.67 11.04Z" fill="#EA4335"/>
          </svg>
        </div>

        {/* Scale & Copyright notice at bottom-right */}
        <div className="absolute bottom-0 right-0 z-[400] flex items-center gap-1.5 text-[10px] text-[#444444] bg-white/70 backdrop-blur-[1px] px-2 py-0.5 pointer-events-none select-none">
          <span className="cursor-pointer hover:underline">Keyboard shortcuts</span>
          <span>Map Data ©2026</span>
          <span className="flex items-center gap-1">2 km <span className="inline-block w-8 border-b border-l border-r border-[#555555] h-1"></span></span>
          <span className="cursor-pointer hover:underline">Terms</span>
          <span className="cursor-pointer hover:underline">Report a map error</span>
        </div>
      </div>

      {/* 16px/400 exact location notice */}
      <p style={{ fontSize: 16, fontWeight: 400, color: "#222222", marginTop: 16 }}>
        Exact location will be provided after booking.
      </p>

      {/* Neighbourhood highlights: 22px/600 */}
      <div className="mt-6">
        <h4 style={{ fontSize: 22, fontWeight: 600, color: "#222222", marginBottom: 8 }}>
          Neighbourhood highlights
        </h4>
        <p style={{ fontSize: 16, fontWeight: 400, color: "#222222", lineHeight: "24px", maxWidth: 700 }}>
          {neighbourhoodHighlights}
        </p>
        <p style={{ fontSize: 16, color: "#6c6c6c" }}>...</p>
        <button
          className="flex items-center gap-0.5 underline text-[#222222] hover:text-black focus:outline-none mt-1"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          Show more
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
