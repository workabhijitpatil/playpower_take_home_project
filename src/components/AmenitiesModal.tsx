"use client";

import React, { useEffect } from "react";
import {
  Bath,
  Wifi,
  Waves,
  Laptop,
  Wind,
  Utensils,
  Car,
  Tv,
  Trees,
  Shirt,
  KeyRound,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { Amenity } from "@/data/listing";

const iconMap: Record<string, React.ReactNode> = {
  Bath: <Bath className="w-6 h-6" />,
  Wifi: <Wifi className="w-6 h-6" />,
  Waves: <Waves className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
  Wind: <Wind className="w-6 h-6" />,
  Utensils: <Utensils className="w-6 h-6" />,
  Car: <Car className="w-6 h-6" />,
  Tv: <Tv className="w-6 h-6" />,
  Trees: <Trees className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  KeyRound: <KeyRound className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
};

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenities: Amenity[];
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({
  isOpen,
  onClose,
  amenities,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [...new Set(amenities.map((a) => a.category))];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="All amenities"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-6 py-4 flex items-center">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-[#F7F7F7] transition-colors focus:outline-none"
            aria-label="Close amenities"
          >
            <X className="w-5 h-5 text-[#222222]" />
          </button>
          <h2 className="text-lg font-semibold text-[#222222] ml-4">
            What this place offers
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-8">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="text-base font-semibold text-[#222222] mb-4">
                {cat}
              </h3>
              <div className="space-y-4">
                {amenities
                  .filter((a) => a.category === cat)
                  .map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center gap-4 text-[#222222]"
                    >
                      <div className="flex-shrink-0 text-[#222222]">
                        {iconMap[amenity.icon] ?? (
                          <Check className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`text-base ${
                          amenity.strikethrough
                            ? "line-through text-[#717171]"
                            : ""
                        }`}
                      >
                        {amenity.name}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="mt-6 border-b border-[#EBEBEB]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
