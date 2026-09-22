"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Listing } from "@/data/listing";

interface PropertyOverviewProps {
  listing: Listing;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ listing }) => {
  return (
    <div className="pb-6 border-b border-[#EBEBEB]">
      {/* Subtitle + Specs */}
      <div>
        <h2 className="font-semibold text-[#222222] leading-tight" style={{ fontSize: 22 }}>
          {listing.propertyType} in Candolim, India
        </h2>
        <div className="flex flex-wrap items-center gap-x-1 text-base text-[#222222] mt-1" style={{ fontSize: 16 }}>
          <span>{listing.guestCount} guests</span>
          <span className="text-[#6c6c6c]">&nbsp;&middot;&nbsp;</span>
          <span>{listing.bedroomCount} bedroom</span>
          <span className="text-[#6c6c6c]">&nbsp;&middot;&nbsp;</span>
          <span>{listing.bedCount} bed</span>
          <span className="text-[#6c6c6c]">&nbsp;&middot;&nbsp;</span>
          <span>{listing.bathCount} bathroom</span>
        </div>
      </div>

      {/* Guest Favourite Banner — 24px radius, exact dividers & botanical laurel */}
      {listing.isGuestFavorite && (
        <div
          className="mt-6 flex items-center justify-between"
          style={{
            border: "1px solid #dddddd",
            borderRadius: 24,
            padding: "20px 26px",
            background: "#ffffff",
          }}
        >
          {/* Left: laurel + "Guest favourite" */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-1.5 text-[#222222] flex-shrink-0">
              {/* Left botanical laurel branch */}
              <div className="w-4 h-7 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/laurel-left.png"
                  alt=""
                  width={15}
                  height={26}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center leading-tight mx-0.5">
                <div style={{ fontSize: 17, fontWeight: 700, color: "#222222" }}>Guest</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#222222" }}>favourite</div>
              </div>

              {/* Right botanical laurel branch (mirrored) */}
              <div className="w-4 h-7 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/laurel-left.png"
                  alt=""
                  width={15}
                  height={26}
                  className="object-contain -scale-x-100"
                  priority
                />
              </div>
            </div>

            <p style={{ fontSize: 15, fontWeight: 500, color: "#222222", maxWidth: 250, lineHeight: 1.3 }}>
              One of the most loved homes on Airbnb, according to guests
            </p>
          </div>

          {/* Right: Rating block: "4.97" + 5 stars / single divider / "33 Reviews" */}
          <div className="flex items-center flex-shrink-0 ml-4">
            <div className="text-center px-4">
              <div style={{ fontSize: 22, fontWeight: 700, color: "#222222" }}>{listing.rating.toFixed(2)}</div>
              <div className="flex justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-[#222222] text-[#222222]" />
                ))}
              </div>
            </div>

            {/* The single authentic divider between rating and reviews */}
            <div className="w-px h-10 bg-[#DDDDDD] flex-shrink-0" />

            <div className="text-center pl-4">
              <div style={{ fontSize: 22, fontWeight: 700, color: "#222222" }}>{listing.reviewCount}</div>
              <a href="#reviews" style={{ fontSize: 12, fontWeight: 600, color: "#222222" }} className="underline hover:text-black block mt-0.5">
                Reviews
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
