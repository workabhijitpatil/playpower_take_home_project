"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Listing } from "@/data/listing";

interface AboutSectionProps {
  description: string[];
  sleepingArrangements: Listing["sleepingArrangements"];
  translationNotice: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  description,
  sleepingArrangements,
  translationNotice,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="about-section" className="py-8 border-b border-[#EBEBEB]">
      {/* Translation notice */}
      {translationNotice && (
        <div className="mb-6 p-4 bg-[#F7F7F7] rounded-xl flex items-center justify-between" style={{ fontSize: 14, color: "#222222" }}>
          <span>
            Some info has been automatically translated.{" "}
            <button className="font-semibold underline text-[#222222] hover:text-black">
              Show original
            </button>
          </span>
        </div>
      )}

      {/* Description — 16px/400 paragraphs */}
      <div className="space-y-4 text-[#222222]" style={{ fontSize: 16, fontWeight: 400 }}>
        <p style={{ lineHeight: "24px" }}>{description[0]}</p>

        {expanded && (
          <div className="space-y-4">
            {description.slice(1).map((p, i) => (
              <p key={i} className="whitespace-pre-line" style={{ lineHeight: "24px" }}>{p}</p>
            ))}
          </div>
        )}

        {/* "Show more" button */}
        {description.length > 1 && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="btn-secondary mt-2 flex items-center gap-1.5"
              style={{ fontSize: 15, padding: "10px 18px", borderRadius: 8 }}
            >
              <span>{expanded ? "Show less" : "Show more"}</span>
              <span style={{ fontSize: 14 }}>›</span>
            </button>
          </div>
        )}
      </div>

      {/* Where you'll sleep */}
      <div id="sleeping-section" className="mt-10 pt-8 border-t border-[#EBEBEB]">
        <h3 style={{ fontSize: 22, fontWeight: 500, color: "#222222" }} className="mb-5">
          Where you&apos;ll sleep
        </h3>
        {/* gap: 16px, card photo radius 12px, clean borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sleepingArrangements.map((room, i) => (
            <div key={i} className="group">
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
