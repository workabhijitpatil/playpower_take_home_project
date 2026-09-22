"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Share, Heart, Check } from "lucide-react";
import { Photo } from "@/data/listing";

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
  photos?: Photo[];
  initialTarget?: string | null;
}

interface TourRoom {
  id: string;
  name: string;
  thumbnail: string;
  amenities: string;
  photos: {
    url: string;
    caption?: string;
    layout?: "full" | "half";
  }[];
}

const TOUR_ROOMS: TourRoom[] = [
  {
    id: "living-room-1",
    name: "Living room 1",
    thumbnail: "/tour-thumb-1.png",
    amenities: "Sofa · Air conditioning · Ceiling fan · TV",
    photos: [
      {
        url: "/tour-lr1-hero.png",
        caption: "Warm living room with wooden dining set and ambient lighting",
        layout: "full",
      },
      {
        url: "/tour-lr1-sofa.png",
        caption: "Comfortable orange sofa with wooden coffee table",
        layout: "full",
      },
      {
        url: "/tour-lr1-tv.png",
        caption: "Entertainment wall with Smart TV and credenza",
        layout: "half",
      },
      {
        url: "/tour-lr1-wide.png",
        caption: "Spacious open living room angle",
        layout: "half",
      },
    ],
  },
  {
    id: "living-room-2",
    name: "Living room 2",
    thumbnail: "/tour-thumb-2.png",
    amenities: "Ceiling fan · Hot tub",
    photos: [
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg?im_w=1200",
        caption: "Indoor living patio with wooden pergola and jacuzzi hot tub",
        layout: "full",
      },
      {
        url: "/tour-lr2-floor.png",
        caption: "Courtyard patio tiled flooring with dining table",
        layout: "full",
      },
    ],
  },
  {
    id: "full-kitchen",
    name: "Full kitchen",
    thumbnail: "/tour-thumb-3.png",
    amenities: "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Show more",
    photos: [
      {
        url: "/tour-kit-1.png",
        caption: "Modern kitchen with wooden cabinetry, stove and microwave",
        layout: "half",
      },
      {
        url: "/tour-kit-2.png",
        caption: "Open kitchen view connecting to the dining area",
        layout: "half",
      },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    thumbnail: "/tour-thumb-4.png",
    amenities: "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Show more",
    photos: [
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/67c61c6f-6260-4809-9510-0360e58a345d.jpeg?im_w=1200",
        caption: "Serene bedroom with comfortable king bed and warm lighting",
        layout: "full",
      },
    ],
  },
  {
    id: "full-bathroom",
    name: "Full bathroom",
    thumbnail: "/tour-thumb-5.png",
    amenities: "Shower · Hot water · Towels · Mirror · Hair dryer · Show more",
    photos: [
      {
        url: "/tour-bathroom-hires.jpg",
        caption: "Modern bathroom with walk-in rain shower and illuminated vanity mirror",
        layout: "full",
      },
    ],
  },
  {
    id: "gym",
    name: "Gym",
    thumbnail: "/tour-thumb-6.png",
    amenities: "Exercise equipment · Dumbbells · Treadmill · Stationary bike",
    photos: [
      {
        url: "/tour-gym-hires.jpg",
        caption: "Fitness center inside the complex with cardio and weight equipment",
        layout: "full",
      },
    ],
  },
  {
    id: "exterior",
    name: "Exterior",
    thumbnail: "/tour-thumb-7.png",
    amenities: "Building · Complex · Free parking · Garden",
    photos: [
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg?im_w=1200",
        caption: "Amor De Goa complex architectural exterior view",
        layout: "full",
      },
    ],
  },
  {
    id: "pool",
    name: "Pool",
    thumbnail: "/tour-thumb-8.png",
    amenities: "Swimming pool · Shared outdoor pool · Sun loungers",
    photos: [
      {
        url: "/tour-pool-hires.jpg",
        caption: "Central swimming pool surrounded by residential balconies",
        layout: "full",
      },
    ],
  },
  {
    id: "additional-photos",
    name: "Additional photos",
    thumbnail: "/tour-thumb-9.png",
    amenities: "Balcony · Garden view · Patio seating",
    photos: [
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1599895892448055764/original/f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg?im_w=720",
        caption: "Private balcony overlooking lush Goan palm trees",
        layout: "full",
      },
    ],
  },
];

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
  initialTarget,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

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

  useEffect(() => {
    if (!isOpen) return;
    if (initialTarget) {
      const timer = setTimeout(() => {
        const targetId = initialTarget.startsWith("tour-")
          ? initialTarget
          : `tour-${initialTarget}`;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [isOpen, initialTarget]);

  if (!isOpen) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const scrollToRoom = (roomId: string) => {
    const el = document.getElementById(roomId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto"
      style={{ animation: "fadeIn 0.15s ease" }}
    >
      {/* ── Sticky Top Header ── */}
      <div className="sticky top-0 bg-white z-30 px-6 py-4 flex items-center justify-between border-b border-transparent">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors text-[#222222] cursor-pointer"
          aria-label="Close photo tour"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm font-medium text-[#222222] hover:underline cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share className="w-4 h-4" />
            )}
            <span>Share</span>
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className="flex items-center gap-2 text-sm font-medium text-[#222222] hover:underline cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                saved ? "fill-[#FF385C] text-[#FF385C]" : "text-[#222222]"
              }`}
            />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* ── Main Photo Tour Container ── */}
      <div className="max-w-6xl mx-auto w-full px-6 pb-20">
        {/* Photo tour Heading */}
        <h2 className="text-[26px] font-semibold text-[#222222] mt-4 mb-6">
          Photo tour
        </h2>

        {/* Room Category Thumbnails Grid */}
        <div className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {TOUR_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => scrollToRoom(`tour-${room.id}`)}
                className="flex flex-col text-left group cursor-pointer"
              >
                <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden bg-neutral-100 border border-[#EBEBEB]">
                  <Image
                    src={room.thumbnail}
                    alt={room.name}
                    fill
                    sizes="150px"
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <span className="text-[13px] text-[#222222] font-medium mt-2 leading-tight group-hover:underline">
                  {room.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Room-by-Room Photo Sections (2-column layout) ── */}
        <div className="space-y-16">
          {TOUR_ROOMS.map((room) => {
            // Group photos sequentially into full or half-pair rows
            type PhotoRow =
              | { type: "full"; photo: (typeof room.photos)[0] }
              | { type: "half-pair"; photos: typeof room.photos };

            const rows: PhotoRow[] = [];
            let i = 0;
            while (i < room.photos.length) {
              const current = room.photos[i];
              if (current.layout === "half") {
                const pair = [current];
                if (
                  i + 1 < room.photos.length &&
                  room.photos[i + 1].layout === "half"
                ) {
                  pair.push(room.photos[i + 1]);
                  i += 2;
                } else {
                  i += 1;
                }
                rows.push({ type: "half-pair", photos: pair });
              } else {
                rows.push({ type: "full", photo: current });
                i += 1;
              }
            }

            return (
              <div
                key={room.id}
                id={`tour-${room.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 scroll-mt-16"
              >
                {/* Left Column: Room Name & Amenities (Sticky until section ends) */}
                <div className="lg:col-span-4 lg:pr-6">
                  <div className="sticky top-20">
                    <h3 className="text-[22px] font-semibold text-[#222222] mb-2 leading-tight">
                      {room.name}
                    </h3>
                    <p className="text-[14px] text-[#717171] leading-relaxed">
                      {room.amenities}
                    </p>
                  </div>
                </div>

                {/* Right Column: Photos for this room in sequential rows */}
                <div className="lg:col-span-8 space-y-4">
                  {rows.map((row, rowIdx) => {
                    if (row.type === "full") {
                      return (
                        <div
                          key={`row-${rowIdx}`}
                          onClick={() => onSelectPhoto(0)}
                          className="group cursor-pointer relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm"
                        >
                          <Image
                            src={row.photo.url}
                            alt={row.photo.caption || room.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 750px"
                            className="object-cover transition-transform duration-300 group-hover:scale-102"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={`row-${rowIdx}`}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          {row.photos.map((photo, pIdx) => (
                            <div
                              key={`half-${pIdx}`}
                              onClick={() => onSelectPhoto(0)}
                              className="group cursor-pointer relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm"
                            >
                              <Image
                                src={photo.url}
                                alt={photo.caption || room.name}
                                fill
                                sizes="(max-width: 1024px) 50vw, 360px"
                                className="object-cover transition-transform duration-300 group-hover:scale-102"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                          ))}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};
