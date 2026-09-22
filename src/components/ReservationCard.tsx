"use client";

import React, { useState } from "react";
import { Star, ChevronDown, Minus, Plus, Flag } from "lucide-react";
import { Listing } from "@/data/listing";
import { format } from "date-fns";

interface ReservationCardProps {
  listing: Listing;
  checkIn: Date | null;
  checkOut: Date | null;
  onOpenCalendar: () => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  listing,
  checkIn,
  checkOut,
  onOpenCalendar,
}) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const totalGuests = adults + children;
  const nights =
    checkIn && checkOut
      ? Math.round(Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const accommodationTotal = listing.basePrice * (nights || 1);
  const total = accommodationTotal + listing.cleaningFee + listing.serviceFee;
  const hasDates = checkIn && checkOut;

  return (
    <div id="reservation-card" className="sticky top-28">
      {/* Booking card: NO border, shadow rgba(0,0,0,0.12) 0 6px 16px, radius 16px, padding 24px */}
      <div
        className="bg-white"
        style={{
          borderRadius: 16,
          padding: 24,
          boxShadow: "rgba(0,0,0,0.12) 0px 6px 16px",
        }}
      >
        {/* Header */}
        {hasDates ? (
          <div className="flex items-start justify-between mb-5">
            <div>
              <span style={{ fontSize: 22, fontWeight: 500, color: "#222222" }}>
                {listing.currency}{listing.basePrice.toLocaleString("en-IN")}
              </span>
              <span style={{ fontSize: 16, color: "#6c6c6c" }}> night</span>
            </div>
            <div className="flex items-center gap-1" style={{ fontSize: 14 }}>
              <Star className="w-3 h-3 fill-[#222222] text-[#222222]" />
              <span style={{ fontWeight: 500, color: "#222222" }}>{listing.rating.toFixed(2)}</span>
              <span className="text-[#6c6c6c]">&nbsp;&middot;&nbsp;</span>
              <a href="#reviews" className="text-[#6c6c6c] underline">{listing.reviewCount} reviews</a>
            </div>
          </div>
        ) : (
          /* "Add dates for prices" — 22px/600 */
          <div className="mb-5">
            <div style={{ fontSize: 22, fontWeight: 600, color: "#222222" }}>Add dates for prices</div>
          </div>
        )}

        {/* Date + Guest boxes: 1px #B0B0B0 border, rounded */}
        <div style={{ border: "1px solid #B0B0B0", borderRadius: 8, overflow: "visible", marginBottom: 16 }}>
          <div className="grid grid-cols-2" style={{ borderBottom: "1px solid #B0B0B0" }}>
            {/* Check-in */}
            <button
              onClick={onOpenCalendar}
              className="text-left hover:bg-[#F7F7F7] transition-colors focus:outline-none cursor-pointer"
              style={{ padding: "10px 12px", borderRight: "1px solid #B0B0B0", borderRadius: "8px 0 0 0" }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: "#222222", textTransform: "uppercase", letterSpacing: "0.04em" }}>Check-in</div>
              <div style={{ fontSize: 14, color: checkIn ? "#222222" : "#717171", marginTop: 2 }}>
                {checkIn ? format(checkIn, "M/d/yyyy") : "Add date"}
              </div>
            </button>
            {/* Checkout */}
            <button
              onClick={onOpenCalendar}
              className="text-left hover:bg-[#F7F7F7] transition-colors focus:outline-none cursor-pointer"
              style={{ padding: "10px 12px", borderRadius: "0 8px 0 0" }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: "#222222", textTransform: "uppercase", letterSpacing: "0.04em" }}>Checkout</div>
              <div style={{ fontSize: 14, color: checkOut ? "#222222" : "#717171", marginTop: 2 }}>
                {checkOut ? format(checkOut, "M/d/yyyy") : "Add date"}
              </div>
            </button>
          </div>

          {/* Guests */}
          <div className="relative">
            <button
              onClick={() => setIsGuestsOpen(!isGuestsOpen)}
              className="w-full text-left flex items-center justify-between hover:bg-[#F7F7F7] transition-colors focus:outline-none cursor-pointer"
              style={{ padding: "10px 12px", borderRadius: "0 0 8px 8px" }}
            >
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#222222", textTransform: "uppercase", letterSpacing: "0.04em" }}>Guests</div>
                <div style={{ fontSize: 14, color: "#222222", marginTop: 2 }}>
                  {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                  {infants > 0 && `, ${infants} infant${infants > 1 ? "s" : ""}`}
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-[#222222] transition-transform ${isGuestsOpen ? "rotate-180" : ""}`} />
            </button>

            {isGuestsOpen && (
              <div
                className="absolute left-0 right-0 top-full bg-white z-20 space-y-4"
                style={{ border: "1px solid #dddddd", borderRadius: 8, padding: 16, boxShadow: "0 6px 16px rgba(0,0,0,0.12)", marginTop: 4 }}
              >
                {([
                  { label: "Adults", sub: "Age 13+", val: adults, set: setAdults, min: 1, max: listing.maxGuests - children },
                  { label: "Children", sub: "Ages 2–12", val: children, set: setChildren, min: 0, max: listing.maxGuests - adults },
                  { label: "Infants", sub: "Under 2", val: infants, set: setInfants, min: 0, max: 2 },
                ] as const).map(({ label, sub, val, set, min, max }, i) => (
                  <div key={label} className={`flex items-center justify-between ${i > 0 ? "pt-3 border-t border-[#EBEBEB]" : ""}`}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#222222" }}>{label}</div>
                      <div style={{ fontSize: 12, color: "#6c6c6c" }}>{sub}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button disabled={val <= min} onClick={() => set(val - 1)}
                        className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center disabled:opacity-30 hover:border-black transition-colors cursor-pointer">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span style={{ fontSize: 14, fontWeight: 500, minWidth: 16, textAlign: "center" }}>{val}</span>
                      <button disabled={val >= max} onClick={() => set(val + 1)}
                        className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center disabled:opacity-30 hover:border-black transition-colors cursor-pointer">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: "#6c6c6c" }}>
                  This place has a maximum of {listing.maxGuests} guests, not including infants.
                </p>
                <button onClick={() => setIsGuestsOpen(false)}
                  className="w-full text-right font-semibold underline text-[#222222] cursor-pointer" style={{ fontSize: 14 }}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CTA — full rounded gradient pill: linear-gradient(90deg,#e61e4d,#e31c5f,#d70466), 9999px radius, 16px/600 */}
        <button
          onClick={onOpenCalendar}
          className="w-full text-white font-semibold transition-all hover:opacity-95 active:scale-[0.99] focus:outline-none flex items-center justify-center cursor-pointer"
          style={{
            background: "linear-gradient(90deg, #E61E4D 0%, #E31C5F 50%, #D70466 100%)",
            borderRadius: 9999,
            height: 48,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {hasDates ? "Reserve" : "Check availability"}
        </button>

        {/* Price breakdown — only rendered when dates are chosen */}
        {hasDates && nights > 0 && (
          <>
            <p className="text-center mt-3" style={{ fontSize: 14, color: "#6c6c6c" }}>
              You won&apos;t be charged yet
            </p>
            <div className="mt-5 space-y-3" style={{ fontSize: 14, color: "#222222" }}>
              <div className="flex justify-between">
                <span className="underline">
                  {listing.currency}{listing.basePrice.toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}
                </span>
                <span>{listing.currency}{accommodationTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Cleaning fee</span>
                <span>{listing.currency}{listing.cleaningFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Airbnb service fee</span>
                <span>{listing.currency}{listing.serviceFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-[#EBEBEB]" style={{ fontSize: 16, fontWeight: 500 }}>
                <span>Total before taxes</span>
                <span>{listing.currency}{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Outside and below the card container: Report this listing */}
      <div className="mt-6 flex justify-center">
        <button className="flex items-center gap-2 text-[#717171] hover:text-[#222222] transition-colors focus:outline-none cursor-pointer">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-[#717171]" aria-hidden="true">
            <path d="M2.5 1a.5.5 0 0 1 .5.5V2h10.379a.5.5 0 0 1 .404.793L11.5 5.5l2.283 2.707a.5.5 0 0 1-.404.793H3v5.5a.5.5 0 0 1-1 0V1.5a.5.5 0 0 1 .5-.5z" />
          </svg>
          <span className="underline text-xs font-semibold text-[#717171]">Report this listing</span>
        </button>
      </div>
    </div>
  );
};
