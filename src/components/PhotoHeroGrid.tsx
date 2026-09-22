"use client";

import React from "react";
import Image from "next/image";
import { LayoutGrid } from "lucide-react";
import { Photo } from "@/data/listing";

interface PhotoHeroGridProps {
  photos: Photo[];
  onOpenPhotoTour: (startIndex?: number) => void;
}

export const PhotoHeroGrid: React.FC<PhotoHeroGridProps> = ({
  photos,
  onOpenPhotoTour,
}) => {
  const display = photos.slice(0, 5);

  const PhotoCell = ({
    photo,
    index,
    className,
  }: {
    photo: Photo;
    index: number;
    className: string;
  }) => (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenPhotoTour(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenPhotoTour(index);
        }
      }}
      aria-label={`View photo ${index + 1}: ${photo.caption}`}
      className={`relative cursor-pointer group overflow-hidden bg-[#e5e5e5] ${className}`}
    >
      <Image
        src={photo.url}
        alt={photo.caption}
        fill
        priority={index === 0}
        sizes={index === 0 ? "50vw" : "25vw"}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
    </div>
  );

  return (
    <div className="relative pb-6">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[460px] md:h-[480px] rounded-xl overflow-hidden">
        {/* Large left photo */}
        {display[0] && (
          <PhotoCell
            photo={display[0]}
            index={0}
            className="col-span-2 row-span-2"
          />
        )}
        {/* Top-right 2 */}
        {display[1] && (
          <PhotoCell photo={display[1]} index={1} className="col-span-1 row-span-1" />
        )}
        {display[2] && (
          <PhotoCell photo={display[2]} index={2} className="col-span-1 row-span-1" />
        )}
        {/* Bottom-right 2 */}
        {display[3] && (
          <PhotoCell photo={display[3]} index={3} className="col-span-1 row-span-1" />
        )}
        {display[4] && (
          <PhotoCell photo={display[4]} index={4} className="col-span-1 row-span-1" />
        )}
      </div>

      {/* Show all photos button */}
      <button
        onClick={() => onOpenPhotoTour()}
        className="absolute bottom-10 right-4 z-10 flex items-center gap-2 bg-white text-[#222222] text-sm font-medium px-4 py-1.5 rounded-lg border border-[#222222] shadow-sm hover:bg-[#F7F7F7] active:scale-[0.98] transition-all focus:outline-none"
        aria-label={`Show all ${photos.length} photos`}
      >
        <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
          <circle cx="2.5" cy="2.5" r="1.5" />
          <circle cx="8" cy="2.5" r="1.5" />
          <circle cx="13.5" cy="2.5" r="1.5" />
          <circle cx="2.5" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="13.5" cy="8" r="1.5" />
          <circle cx="2.5" cy="13.5" r="1.5" />
          <circle cx="8" cy="13.5" r="1.5" />
          <circle cx="13.5" cy="13.5" r="1.5" />
        </svg>
        <span>Show all photos</span>
      </button>
    </div>
  );
};
