"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Share2, Heart } from "lucide-react";
import { Photo } from "@/data/listing";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
}) => {
  const photo = photos[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); handlePrev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); handleNext(); }
      else if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox viewer"
      className="fixed inset-0 z-[100] bg-black flex flex-col select-none"
    >
      {/* ── Top Bar ── */}
      <div className="h-16 px-6 flex items-center justify-between text-white flex-shrink-0 z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close photo viewer"
        >
          <X className="w-5 h-5" />
          <span className="text-sm font-semibold">Close</span>
        </button>

        {/* Counter */}
        <div className="text-sm font-medium text-neutral-300" aria-live="polite">
          {currentIndex + 1} / {photos.length}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
            }}
            className="p-2.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 text-white" />
          </button>
          <button
            className="p-2.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Save"
          >
            <Heart className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* ── Main Viewport ── */}
      <div className="flex-1 relative flex items-center justify-center px-16 overflow-hidden">
        {/* Prev */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 w-12 h-12 rounded-full border border-white/40 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous photo (Left arrow)"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Animated photo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full h-full max-w-5xl max-h-[78vh] flex items-center justify-center"
          >
            <Image
              src={photo.url}
              alt={photo.caption}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 w-12 h-12 rounded-full border border-white/40 bg-black/40 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next photo (Right arrow)"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* ── Caption Bar ── */}
      <div className="h-14 px-6 flex items-center justify-center text-center flex-shrink-0">
        <p className="text-sm text-neutral-300">
          <span className="font-semibold text-white mr-2">{photo.category}:</span>
          {photo.caption}
        </p>
      </div>
    </div>
  );
};
