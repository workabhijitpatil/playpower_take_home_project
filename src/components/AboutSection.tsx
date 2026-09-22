"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Listing } from "@/data/listing";

interface AboutSectionProps {
  description: string[];
  sleepingArrangements: Listing["sleepingArrangements"];
  translationNotice: boolean;
  onOpenPhotoTour?: (roomId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  description,
  sleepingArrangements,
  translationNotice,
  onOpenPhotoTour,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="about-section" className="py-8 border-b border-[#EBEBEB]">
      {/* Translation notice */}
      {translationNotice && (
        <div className="mb-6 p-4 bg-[#F7F7F7] rounded-xl flex items-center justify-between" style={{ fontSize: 14, color: "#222222" }}>
          <span>
            {/* Translate with Google info */}
            Some info has been automatically translated.{" "}
            <button className="underline font-semibold hover:text-black">
              Show original
            </button>
          </span>
        </div>
      )}

      {/* Description paragraphs */}
      <div className="space-y-4 text-[#222222] leading-relaxed" style={{ fontSize: 16 }}>
        {description.slice(0, expanded ? undefined : 2).map((p, i) => (
          <p key={i} className="whitespace-pre-line">{p}</p>
        ))}
      </div>

      {description.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1 font-semibold underline text-[#222222] hover:text-black transition-colors"
          style={{ fontSize: 16 }}
        >
          {expanded ? "Show less" : "Show more"} &gt;
        </button>
      )}

      {/* Sleeping arrangements */}
      <div className="mt-8 pt-8 border-t border-[#EBEBEB]">
        <h3 className="text-[22px] font-semibold text-[#222222] mb-6">
          Where you&apos;ll sleep
        </h3>
        {/* gap: 16px, card photo radius 12px, clean borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sleepingArrangements.map((room, i) => (
            <div
              key={i}
              onClick={() =>
                onOpenPhotoTour?.(
                  room.roomName.toLowerCase().includes("bed")
                    ? "bedroom"
                    : "living-room-2"
                )
              }
              className="group cursor-pointer"
            >
              {/* Photo: radius 12px, border 1px #ebebeb */}
              <div className="relative overflow-hidden bg-[#f3f3f3] rounded-xl border border-[#EBEBEB]" style={{ height: 200 }}>
                <Image
                  src={room.image}
                  alt={room.roomName}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>
              <div className="mt-3">
                <div style={{ fontSize: 16, fontWeight: 500, color: "#222222" }}>{room.roomName}</div>
                <div style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c", marginTop: 2 }}>{room.bedType}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
