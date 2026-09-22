"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Listing } from "@/data/listing";

interface StickySubNavProps {
  listing: Listing;
  checkIn: Date | null;
  checkOut: Date | null;
  onReserveClick: () => void;
}

export const StickySubNav: React.FC<StickySubNavProps> = ({
  listing,
  checkIn,
  checkOut,
  onReserveClick,
}) => {
  const [visible, setVisible] = useState(false);
  const [showRightBooking, setShowRightBooking] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);

      const resCard = document.getElementById("reservation-card");
      if (resCard) {
        const rect = resCard.getBoundingClientRect();
        setShowRightBooking(rect.bottom <= 80);
      } else {
        setShowRightBooking(window.scrollY > 1800);
      }

      const amenitiesEl = document.getElementById("amenities-section");
      const reviewsEl = document.getElementById("reviews");
      const locationEl = document.getElementById("location-section");

      if (locationEl && window.scrollY >= locationEl.offsetTop - 140) {
        setActiveTab("location");
      } else if (reviewsEl && window.scrollY >= reviewsEl.offsetTop - 140) {
        setActiveTab("reviews");
      } else if (amenitiesEl && window.scrollY >= amenitiesEl.offsetTop - 140) {
        setActiveTab("amenities");
      } else {
        setActiveTab("photos");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "photos") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  const tabs = [
    { id: "photos", label: "Photos" },
    { id: "amenities-section", label: "Amenities" },
    { id: "reviews", label: "Reviews" },
    { id: "location-section", label: "Location" },
  ];

  const tabKey = (id: string) =>
    id === "amenities-section" ? "amenities" :
    id === "reviews" ? "reviews" :
    id === "location-section" ? "location" : "photos";

  const hasDates = checkIn && checkOut;

  return (
    <div className="fixed top-0 inset-x-0 z-40 bg-white border-b border-[#EBEBEB] shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 xl:px-20 h-[64px] flex items-center justify-between">
        <nav className="flex items-center gap-6 h-full text-sm font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`h-full border-b-2 transition-colors ${
                activeTab === tabKey(tab.id)
                  ? "border-[#222222] text-[#222222]"
                  : "border-transparent text-[#717171] hover:text-[#222222]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {showRightBooking && (
          <div className="flex items-center gap-4 transition-opacity duration-200">
            {/* Right info */}
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-[#222222]">
                {hasDates
                  ? `${listing.currency}${listing.basePrice.toLocaleString("en-IN")} night`
                  : "Add dates for prices"}
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-[#222222]">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-semibold">{listing.rating.toFixed(2)}</span>
                <span className="text-[#717171]">&nbsp;&middot;&nbsp;</span>
                <a href="#reviews" className="text-[#717171] underline">
                  {listing.reviewCount} reviews
                </a>
              </div>
            </div>
            <button
              onClick={onReserveClick}
              className="btn-airbnb px-5 py-2.5 rounded-lg text-sm font-semibold"
            >
              {hasDates ? "Reserve" : "Check availability"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
