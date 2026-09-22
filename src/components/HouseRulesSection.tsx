"use client";

import React from "react";
import { Listing } from "@/data/listing";

/* Exact CSS from reference:
   Visible heading: 22px/600 (h2 is sr-only)
   Column heads: 14px/500 #222222
   Rule text: 14px/400 #6c6c6c
   Order: Cancellation | House rules | Safety
*/

export const HouseRulesSection: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <div id="things-to-know-section" className="py-10 border-b border-[#EBEBEB]">
      {/* sr-only h2 */}
      <h2 className="sr-only">Things to know</h2>

      {/* Visible heading: 22px/600 */}
      <div style={{ fontSize: 22, fontWeight: 600, color: "#222222", marginBottom: 32 }}>
        Things to know
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* 1. Cancellation policy */}
        <div>
          <div className="mb-4">
            {/* Calendar × icon */}
            <svg viewBox="0 0 32 32" style={{ width: 24, height: 24 }} fill="none" stroke="#222222" strokeWidth="2">
              <rect x="4" y="6" width="24" height="23" rx="2" />
              <path d="M4 12h24M11 4v4M21 4v4M12 20l8-8M20 20l-8-8" strokeLinecap="round" />
            </svg>
          </div>
          {/* 14px/500 column head */}
          <h4 style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 8 }}>
            Cancellation policy
          </h4>
          {/* 14px/400 #6c6c6c text */}
          <p style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c", lineHeight: "20px" }}>
            Add your trip dates to get the cancellation details for this stay.
          </p>
          <button
            className="underline hover:text-black focus:outline-none mt-2 block"
            style={{ fontSize: 14, fontWeight: 500, color: "#222222" }}
          >
            Add dates
          </button>
        </div>

        {/* 2. House rules */}
        <div>
          <div className="mb-4">
            {/* Search/magnifier icon */}
            <svg viewBox="0 0 32 32" style={{ width: 24, height: 24 }} fill="none" stroke="#222222" strokeWidth="2">
              <circle cx="14" cy="14" r="9" />
              <path d="M21 21l7 7" strokeLinecap="round" />
            </svg>
          </div>
          <h4 style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 8 }}>
            House rules
          </h4>
          <ul className="space-y-1.5">
            {listing.houseRules.map((rule, i) => (
              <li key={i} style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c" }}>{rule}</li>
            ))}
          </ul>
          <button
            className="underline hover:text-black focus:outline-none mt-3 block"
            style={{ fontSize: 14, fontWeight: 500, color: "#222222" }}
          >
            Learn more
          </button>
        </div>

        {/* 3. Safety & property */}
        <div>
          <div className="mb-4">
            {/* Shield icon */}
            <svg viewBox="0 0 32 32" style={{ width: 24, height: 24 }} fill="none" stroke="#222222" strokeWidth="2">
              <path d="M16 3L5 8v8c0 6.6 4.7 12.8 11 14 6.3-1.2 11-7.4 11-14V8L16 3z" />
            </svg>
          </div>
          <h4 style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 8 }}>
            Safety &amp; property
          </h4>
          <ul className="space-y-1.5">
            {listing.safetyInfo.map((item, i) => (
              <li key={i} style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c" }}>{item}</li>
            ))}
          </ul>
          <button
            className="underline hover:text-black focus:outline-none mt-3 block"
            style={{ fontSize: 14, fontWeight: 500, color: "#222222" }}
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};
