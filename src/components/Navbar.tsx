"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Globe, Menu } from "lucide-react";
import { AirbnbLogo } from "./AirbnbLogo";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    /* Real Airbnb navbar: 80px tall, white, border-bottom #ebebeb */
    <header className="sticky top-0 z-30 bg-white border-b border-[#EBEBEB]">
      <div className="w-full max-w-[2520px] mx-auto px-6 md:px-10 flex items-center justify-between gap-4 h-20">

        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <a href="#" className="flex-shrink-0 text-[#FF385C]" aria-label="Airbnb home">
            <AirbnbLogo showWordmark={true} />
          </a>
        </div>

        {/* Center: Search Pill */}
        <div
          className="flex items-center bg-white cursor-pointer hover:shadow-md transition-shadow duration-200 pl-3 pr-2 h-12"
          style={{
            border: "1px solid #dddddd",
            borderRadius: 9999,
            boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* Authentic 3D house graphic */}
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mr-1">
            <Image
              src="/house-icon.png"
              alt="House"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </div>

          <button className="px-3 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-full py-2.5 transition-colors whitespace-nowrap">
            Anywhere
          </button>
          <span className="w-px h-4 bg-[#DDDDDD]" />
          <button className="px-3 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-full py-2.5 transition-colors whitespace-nowrap">
            Anytime
          </button>
          <span className="w-px h-4 bg-[#DDDDDD]" />
          <button className="pl-3 pr-1.5 flex items-center gap-3 rounded-full py-1.5 hover:bg-[#F7F7F7] transition-colors">
            <span className="text-sm font-normal text-[#717171]">Add guests</span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm"
              style={{
                background: "linear-gradient(90deg, #E61E4D 0%, #E31C5F 50%, #D70466 100%)",
              }}
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Right Nav */}
        <div className="flex-1 flex items-center justify-end gap-2 flex-shrink-0">
          <button className="hidden md:block py-2.5 px-3.5 rounded-full text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors whitespace-nowrap">
            Become a host
          </button>

          <button
            aria-label="Choose a language"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#222222] hover:bg-[#F7F7F7] transition-colors"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Authentic circular hamburger menu button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#F0F0F0] hover:bg-[#E5E5E5] flex items-center justify-center text-[#222222] transition-colors focus:outline-none"
              aria-label="Main navigation menu"
            >
              <Menu className="w-4 h-4 stroke-[2.5]" />
            </button>

            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] border border-[#EBEBEB] py-2 z-50 text-sm">
                  <button className="w-full text-left px-4 py-3 font-semibold text-[#222222] hover:bg-[#F7F7F7]">Sign up</button>
                  <button className="w-full text-left px-4 py-3 text-[#222222] hover:bg-[#F7F7F7]">Log in</button>
                  <div className="h-px bg-[#EBEBEB] my-1" />
                  <button className="w-full text-left px-4 py-3 text-[#222222] hover:bg-[#F7F7F7]">Become a host</button>
                  <button className="w-full text-left px-4 py-3 text-[#222222] hover:bg-[#F7F7F7]">Help Centre</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
