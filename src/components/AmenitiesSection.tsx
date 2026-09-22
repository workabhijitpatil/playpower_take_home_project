"use client";

import React, { useState } from "react";
import {
  Wifi, Laptop, Car, Waves, Bath, PawPrint, Camera, ShieldOff, UtensilsCrossed,
} from "lucide-react";
import { Amenity } from "@/data/listing";
import { AmenitiesModal } from "./AmenitiesModal";

const iconMap: Record<string, React.ReactNode> = {
  UtensilsCrossed: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v10a4 4 0 0 0 8 0V3M11 3v26M23 3v26M23 13a5 5 0 0 0 5-5V3" />
    </svg>
  ),
  Wifi: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 9c7.7-6 16.3-6 24 0M7.5 13.5c5.6-4.5 11.4-4.5 17 0M11 18c3.5-3 6.5-3 10 0M16 23.5a1.5 1.5 0 1 0 0 .01" />
    </svg>
  ),
  Laptop: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h26M6 21V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14M6 21v6M26 21v6M12 21v6M20 21v6" />
    </svg>
  ),
  Car: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 14l3-8h16l3 8v9a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2H10v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9zM5 14h22M9 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM23 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  ),
  Waves: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 21c3-2 6-2 9 0s6 2 9 0 6-2 9 0M1 26c3-2 6-2 9 0s6 2 9 0 6-2 9 0M10 3v12M14 3v12M10 7h4M10 11h4" />
    </svg>
  ),
  Bath: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 17h24v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-7zM7 28v2M25 28v2M9 7c1 1.5 1 3 0 4.5M16 5c1 2 1 4 0 6M23 7c1 1.5 1 3 0 4.5" />
    </svg>
  ),
  PawPrint: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="9" r="3"/>
      <circle cx="15" cy="6" r="3"/>
      <circle cx="22" cy="7" r="3"/>
      <circle cx="27" cy="13" r="2.5"/>
      <path d="M8 18c3-4 11-5 15-1 3 3 2 9-2 11-4 2-8 2-11 0-3-2-4-7-2-10z"/>
    </svg>
  ),
  Camera: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l18-5v14L4 14zM22 11l6-3v10l-6-3M9 18v7M5 25h8" />
    </svg>
  ),
  ShieldOff: (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="12" />
      <path d="M4 4l24 24" />
    </svg>
  ),
};

export const AmenitiesSection: React.FC<{ amenities: Amenity[] }> = ({ amenities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const preview = amenities.slice(0, 10);

  return (
    <div id="amenities-section" className="py-8 border-b border-[#EBEBEB]">
      {/* 22px/500 heading */}
      <h3 style={{ fontSize: 22, fontWeight: 500, color: "#222222" }} className="mb-6">
        What this place offers
      </h3>

      {/* Items: 16px/400 #222222, 2-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
        {preview.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center gap-4"
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: amenity.strikethrough ? "#6c6c6c" : "#222222",
            }}
          >
            <div className="flex-shrink-0 text-[#222222]">
              {iconMap[amenity.icon] ?? <div className="w-6 h-6" />}
            </div>
            <span className={amenity.strikethrough ? "line-through" : ""}>
              {amenity.name}
            </span>
          </div>
        ))}
      </div>

      {/* Secondary button: #f2f2f2 bg, 8px radius, 16px/500 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-secondary"
        style={{ borderRadius: 8, padding: "13px 23px", fontSize: 16, fontWeight: 500 }}
      >
        Show all 50 amenities
      </button>

      <AmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amenities={amenities}
      />
    </div>
  );
};
