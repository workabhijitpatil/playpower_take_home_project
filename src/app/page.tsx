"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { LISTING } from "@/data/listing";
import { Navbar } from "@/components/Navbar";
import { StickySubNav } from "@/components/StickySubNav";
import { ListingHeader } from "@/components/ListingHeader";
import { PhotoHeroGrid } from "@/components/PhotoHeroGrid";
import { PropertyOverview } from "@/components/PropertyOverview";
import { HighlightPerks } from "@/components/HighlightPerks";
import { AboutSection } from "@/components/AboutSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { CalendarSection } from "@/components/CalendarSection";
import { ReservationCard } from "@/components/ReservationCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { LocationMap } from "@/components/LocationMap";
import { HostSection } from "@/components/HostSection";
import { HouseRulesSection } from "@/components/HouseRulesSection";
import { PhotoTourModal } from "@/components/PhotoTourModal";
import { LightboxModal } from "@/components/LightboxModal";
import { Footer } from "@/components/Footer";

export default function ListingPage() {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [photoTourTarget, setPhotoTourTarget] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleOpenPhotoTour = (target?: string | number) => {
    if (typeof target === "string") {
      setPhotoTourTarget(target);
    } else if (typeof target === "number") {
      // Map 5 hero photos to their corresponding rooms
      const roomTargets = [
        "living-room-2", // photo 0: Warm living room with wooden pergola seating
        "living-room-2", // photo 1: Private Jacuzzi hot tub
        "exterior",      // photo 2: Exterior view of Amor De Goa complex
        "bedroom",       // photo 3: Cozy bedroom with ambient lighting
        "living-room-2", // photo 4: Indoor atrium and living patio
      ];
      setPhotoTourTarget(roomTargets[target] || "living-room-1");
    } else {
      setPhotoTourTarget(null);
    }
    setIsPhotoTourOpen(true);
  };

  const handleDatesChange = (ci: Date | null, co: Date | null) => {
    setCheckIn(ci);
    setCheckOut(co);
  };

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToReservationCard = () => {
    const el = document.getElementById("reservation-card");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <StickySubNav
        listing={LISTING}
        checkIn={checkIn}
        checkOut={checkOut}
        onReserveClick={scrollToReservationCard}
      />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 xl:px-20">
        <ListingHeader title={LISTING.title} />
        <PhotoHeroGrid photos={LISTING.photos} onOpenPhotoTour={handleOpenPhotoTour} />

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pt-4">
          {/* Left column */}
          <div className="lg:col-span-7">
            <PropertyOverview listing={LISTING} />

            {/* Hosted by row */}
            <div className="flex items-center gap-4 py-6 border-b border-[#EBEBEB]">
              <div
                className="rounded-full overflow-hidden flex-shrink-0 relative shadow-sm"
                style={{ width: 40, height: 40 }}
              >
                <Image
                  src="/mirashya-logo.png"
                  alt="Mirashya Homes"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: "#222222" }}>Hosted by {LISTING.host.name}</h3>
                <p style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c" }}>{LISTING.host.yearsHosting} years hosting</p>
              </div>
            </div>

            <HighlightPerks highlights={LISTING.highlights} />
            <AboutSection
              description={LISTING.description}
              sleepingArrangements={LISTING.sleepingArrangements}
              translationNotice={LISTING.translationNotice}
              onOpenPhotoTour={handleOpenPhotoTour}
            />
            <AmenitiesSection amenities={LISTING.amenities} />
            <div ref={calendarRef}>
              <CalendarSection
                checkIn={checkIn}
                checkOut={checkOut}
                onDatesChange={handleDatesChange}
              />
            </div>
          </div>

          {/* Right column — sticky reservation card */}
          <div className="lg:col-span-5">
            <ReservationCard
              listing={LISTING}
              checkIn={checkIn}
              checkOut={checkOut}
              onOpenCalendar={scrollToCalendar}
            />
          </div>
        </div>

        {/* Full-width sections */}
        <ReviewsSection listing={LISTING} />
        <LocationMap
          location={LISTING.location}
          address={LISTING.address}
          neighbourhoodHighlights={LISTING.neighbourhoodHighlights}
        />
        <HostSection host={LISTING.host} />
        <HouseRulesSection listing={LISTING} />
      </main>

      <Footer />

      {/* Modals */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={() => {
          setIsPhotoTourOpen(false);
          setPhotoTourTarget(null);
        }}
        photos={LISTING.photos}
        initialTarget={photoTourTarget}
        onSelectPhoto={(idx) => { setLightboxIndex(idx); setIsLightboxOpen(true); }}
      />
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        photos={LISTING.photos}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
