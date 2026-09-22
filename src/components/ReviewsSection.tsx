"use client";

import React from "react";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Listing } from "@/data/listing";

/* Exact CSS from reference:
   Laurel "4.97": 100px/500 #222222
   "Guest favourite" heading: 22px/500
   Description: 18px/400 #6c6c6c
   "How reviews work": 14px/400 #6c6c6c
   Rating bars: 4px height, fill #222 radius 0, track #dddddd radius 2px
   Category labels/values: 12px/500
   Tag chips: 14px/400, 1px #f2f2f2 border, radius 16px
   Review name: 14px/500 #222
   Review member sub: 14px/400 #6c6c6c
   Review body: 16px/400, line-height 24px
   "Show more" per review: 16px/500
   "Show all 33 reviews" btn: #f2f2f2 bg, 12px radius (secondary style)
*/

interface ReviewsSectionProps {
  listing: Listing;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ listing }) => {
  const cats = [
    {
      name: "Cleanliness",
      score: listing.ratingsBreakdown.cleanliness,
      iconSrc: "/rating-cleanliness.png",
      w: 24,
      h: 24,
    },
    {
      name: "Accuracy",
      score: listing.ratingsBreakdown.accuracy,
      iconSrc: "/rating-accuracy.png",
      w: 24,
      h: 24,
    },
    {
      name: "Check-in",
      score: listing.ratingsBreakdown.checkIn,
      iconSrc: "/rating-checkin.png",
      w: 24,
      h: 24,
    },
    {
      name: "Communication",
      score: listing.ratingsBreakdown.communication,
      iconSrc: "/rating-communication.png",
      w: 24,
      h: 24,
    },
    {
      name: "Location",
      score: listing.ratingsBreakdown.location,
      iconSrc: "/rating-location.png",
      w: 24,
      h: 24,
    },
    {
      name: "Value",
      score: listing.ratingsBreakdown.value,
      iconSrc: "/rating-value.png",
      w: 24,
      h: 24,
    },
  ];

  return (
    <div id="reviews" className="py-12 border-b border-[#EBEBEB]">

      {/* ── Giant 3D Laurel + 4.97 ── */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Left 3D metallic laurel branch */}
          <div className="w-12 h-24 md:w-14 md:h-28 relative flex items-center justify-center flex-shrink-0">
            <Image
              src="/laurel-3d-left.png"
              alt=""
              width={56}
              height={112}
              className="object-contain"
              priority
            />
          </div>

          {/* Rating number */}
          <div style={{ fontSize: 96, fontWeight: 700, color: "#222222", lineHeight: 1, letterSpacing: "-0.03em" }}>
            {listing.rating.toFixed(2)}
          </div>

          {/* Right 3D metallic laurel branch */}
          <div className="w-12 h-24 md:w-14 md:h-28 relative flex items-center justify-center flex-shrink-0">
            <Image
              src="/laurel-3d-right.png"
              alt=""
              width={56}
              height={112}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 22px/600 heading */}
        <h3 style={{ fontSize: 22, fontWeight: 600, color: "#222222", marginTop: 14 }}>
          Guest favourite
        </h3>
        {/* 16px/400 subtitle */}
        <p style={{ fontSize: 16, fontWeight: 400, color: "#6c6c6c", marginTop: 6, maxWidth: 450, lineHeight: 1.4 }}>
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        {/* 14px/500 underlined link */}
        <button className="underline hover:text-black focus:outline-none font-medium cursor-pointer" style={{ fontSize: 14, color: "#222222", marginTop: 8 }}>
          How reviews work
        </button>
      </div>

      {/* ── Rating breakdown grid with authentic vertical dividers ── */}
      <div className="py-6 border-t border-b border-[#EBEBEB] mb-8 flex items-stretch">
        {/* Overall rating bar chart */}
        <div className="pr-4 flex-1 max-w-[170px]">
          <div style={{ fontSize: 13, fontWeight: 600, color: "#222222", marginBottom: 8 }}>Overall rating</div>
          <div className="space-y-1.5">
            {[
              { stars: 5, fill: 100 },
              { stars: 4, fill: 6 },
              { stars: 3, fill: 0 },
              { stars: 2, fill: 0 },
              { stars: 1, fill: 0 },
            ].map((s) => (
              <div key={s.stars} className="flex items-center gap-2">
                <span style={{ fontSize: 11, color: "#222222", minWidth: 8 }}>{s.stars}</span>
                <div
                  style={{ flex: 1, height: 4, background: "#EBEBEB", borderRadius: 2, overflow: "hidden" }}
                >
                  <div
                    style={{
                      height: 4,
                      background: "#222222",
                      borderRadius: 2,
                      width: `${s.fill}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 category score columns with vertical divider between each */}
        {cats.map((cat) => (
          <React.Fragment key={cat.name}>
            <div className="w-px bg-[#EBEBEB] self-stretch mx-3 lg:mx-5 flex-shrink-0" />
            <div className="flex-1 flex flex-col justify-between" style={{ minHeight: 96 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#222222" }}>{cat.name}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#222222", marginTop: 2 }}>{cat.score.toFixed(1)}</div>
              </div>
              <div className="mt-3 flex items-center justify-start h-8">
                <Image
                  src={cat.iconSrc}
                  alt={cat.name}
                  width={cat.w}
                  height={cat.h}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ── Guest reviews mention chips with authentic icons & carousel button ── */}
      <div className="mb-8 relative">
        <h4 style={{ fontSize: 16, fontWeight: 500, color: "#222222", marginBottom: 16 }}>
          Guest reviews mention
        </h4>
        <div className="flex items-center gap-3 overflow-x-hidden pr-12 py-1">
          {listing.reviewMentionTags.map((tag) => (
            <button
              key={tag.label}
              className="flex items-center gap-2 whitespace-nowrap flex-shrink-0 hover:border-[#222222] transition-all cursor-pointer"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#222222",
                background: "#FFFFFF",
                border: "1px solid #EBEBEB",
                borderRadius: 12,
                boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)",
                padding: "8px 14px",
              }}
            >
              {tag.iconSrc ? (
                <div className="w-4 h-4 relative flex-shrink-0 flex items-center justify-center">
                  <Image src={tag.iconSrc} alt={tag.label} width={16} height={16} className="object-contain" priority />
                </div>
              ) : null}
              <span>{tag.label}</span>
              {tag.count ? (
                <span style={{ color: "#717171", fontWeight: 400 }}>{tag.count}</span>
              ) : null}
            </button>
          ))}
        </div>
        {/* Right carousel navigation arrow with smooth fade */}
        <div className="absolute right-0 top-[36px] bottom-1 flex items-center pl-6 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none">
          <button
            aria-label="Next tags"
            className="w-8 h-8 rounded-full bg-white shadow-md border border-[#DDDDDD] flex items-center justify-center hover:scale-105 transition-all text-[#222222] cursor-pointer pointer-events-auto"
          >
            <ChevronRight className="w-4 h-4 text-[#222222]" />
          </button>
        </div>
      </div>

      {/* ── Review cards — 2 column ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
        {listing.reviews.map((rev) => (
          <div key={rev.id} className="space-y-3">
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-full overflow-hidden relative flex-shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: rev.avatar ? "transparent" : rev.avatarColor,
                }}
              >
                {rev.avatar ? (
                  <Image src={rev.avatar} alt={rev.author} fill sizes="40px" className="object-cover" priority />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center font-bold"
                    style={{ fontSize: 16, color: rev.avatarTextColor || "#222222" }}
                  >
                    {rev.author.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                {/* 14px/500 name */}
                <div style={{ fontSize: 14, fontWeight: 500, color: "#222222" }}>{rev.author}</div>
                {/* 14px/400 #6c6c6c member info */}
                <div style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c" }}>{rev.memberInfo}</div>
              </div>
            </div>

            {/* Stars + date */}
            <div className="flex items-center gap-1.5" style={{ fontSize: 14, color: "#222222" }}>
              <div className="flex gap-0.5">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-[#222222] text-[#222222]" />
                ))}
              </div>
              <span className="text-[#222222]">&nbsp;&middot;&nbsp;</span>
              <span style={{ fontSize: 14, fontWeight: 400, color: "#222222" }}>{rev.date}</span>
            </div>

            {/* 16px/400, line-height 24px review body */}
            <p style={{ fontSize: 16, fontWeight: 400, color: "#222222", lineHeight: "24px" }}>
              {rev.content}
            </p>

            {/* Show more — only if text is truncated with ellipsis */}
            {rev.content.includes("...") && (
              <button className="underline text-[#222222] hover:text-black font-semibold block focus:outline-none cursor-pointer" style={{ fontSize: 16 }}>
                Show more
              </button>
            )}
          </div>
        ))}
      </div>

      {/* "Show all 33 reviews" — secondary btn */}
      <div className="mt-10">
        <button className="btn-secondary" style={{ borderRadius: 8, padding: "13px 23px", fontSize: 16, fontWeight: 500 }}>
          Show all {listing.reviewCount} reviews
        </button>
      </div>
    </div>
  );
};
