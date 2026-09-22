"use client";

import React, { useState } from "react";
import { Share2, Heart } from "lucide-react";

interface ListingHeaderProps {
  title: string;
}

export const ListingHeader: React.FC<ListingHeaderProps> = ({ title }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="pt-6 pb-4">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-[26px] font-semibold text-[#222222] leading-tight tracking-tight flex-1">
          {title}
        </h1>

        <div className="flex items-center gap-1 flex-shrink-0 mt-1">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] transition-colors underline underline-offset-2 focus:outline-none"
            aria-label="Share this listing"
          >
            {/* Authentic Airbnb Share Icon (upload tray with arrow) */}
            <svg
              viewBox="0 0 32 32"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v18M8 11l8-8 8 8" />
            </svg>
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] transition-colors underline underline-offset-2 focus:outline-none"
            aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart
              className={`w-4 h-4 stroke-[2.2] transition-all duration-200 ${
                isSaved
                  ? "fill-[#FF385C] text-[#FF385C] scale-110"
                  : "text-[#222222]"
              }`}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
