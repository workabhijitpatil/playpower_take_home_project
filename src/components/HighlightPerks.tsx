"use client";

import React from "react";
import { Listing } from "@/data/listing";

const iconMap: Record<string, React.ReactNode> = {
  // Swimming pool ladder, deck ledge, and 3 wavy water ripples
  Waves: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#222222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2.5a2 2 0 0 1 4 0V7" />
      <path d="M4 7h16" />
      <path d="M11 7v5.5M14 7v5.5" />
      <path d="M4 13c2.5-1 5.5-1 8 0s5.5 1 8 0" />
      <path d="M4 16.5c2.5-1 5.5-1 8 0s5.5 1 8 0" />
      <path d="M4 20c2.5-1 5.5-1 8 0s5.5 1 8 0" />
    </svg>
  ),
  // Front door with frame and handle
  DoorOpen: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#222222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V3h14v18" />
      <path d="M3 21h18" />
      <path d="M16 3v18" />
      <circle cx="13" cy="11.5" r="1" fill="#222222" />
    </svg>
  ),
  // Location pin with circular hole
  MapPin: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#222222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.6" />
    </svg>
  ),
};

export const HighlightPerks: React.FC<{ highlights: Listing["highlights"] }> = ({ highlights }) => {
  return (
    <div className="py-6 border-b border-[#EBEBEB] space-y-0">
      {highlights.map((perk, i) => (
        <div
          key={i}
          className="flex items-center gap-4 text-[#222222]"
          style={{ height: 66 }}
        >
          <div className="flex-shrink-0 text-[#222222]">
            {iconMap[perk.icon] ?? <span className="w-6 h-6 block" />}
          </div>
          <div>
            {/* 14px/600 title */}
            <div style={{ fontSize: 14, fontWeight: 600, color: "#222222" }}>{perk.title}</div>
            {/* 14px/400 #6c6c6c desc */}
            <div style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c", marginTop: 2 }}>{perk.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
