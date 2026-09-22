"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Listing } from "@/data/listing";

export const HostSection: React.FC<{ host: Listing["host"] }> = ({ host }) => {
  return (
    <div id="host-section" className="py-12 border-b border-[#EBEBEB]">
      {/* 22px/500 heading */}
      <h3 style={{ fontSize: 22, fontWeight: 500, color: "#222222", marginBottom: 24 }}>
        Meet your host
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ── Left: Host card + personal info (5 cols) ── */}
        <div className="lg:col-span-5 max-w-[360px]">
          {/* Host card matching Airbnb */}
          <div
            className="bg-white flex items-center justify-between"
            style={{
              borderRadius: 24,
              padding: "24px 28px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Left: Avatar + Name + Host */}
            <div className="flex flex-col items-center text-center pr-6 flex-shrink-0">
              <div
                className="relative flex-shrink-0 mb-3"
                style={{ width: 72, height: 68 }}
              >
                <Image
                  src="/host-mirashya-logo-exact.png"
                  alt="Mirashya Homes"
                  fill
                  sizes="72px"
                  className="object-contain"
                  priority
                />
              </div>
              <h4 style={{ fontSize: 22, fontWeight: 700, color: "#222222", lineHeight: 1.2 }}>
                {host.name}
              </h4>
              <p style={{ fontSize: 14, fontWeight: 400, color: "#6c6c6c", marginTop: 2 }}>Host</p>
            </div>

            {/* Right: 3 stacked stats with horizontal dividers */}
            <div className="flex flex-col justify-between pl-6 flex-1 py-1 border-l border-[#EBEBEB]" style={{ minHeight: 160 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#222222" }}>{host.hostReviewCount}</div>
                <div style={{ fontSize: 10, fontWeight: 400, color: "#222222" }}>Reviews</div>
              </div>
              <div className="h-px bg-[#EBEBEB] my-2" />
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#222222" }}>{host.hostRating.toFixed(2)}★</div>
                <div style={{ fontSize: 10, fontWeight: 400, color: "#222222" }}>Rating</div>
              </div>
              <div className="h-px bg-[#EBEBEB] my-2" />
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#222222" }}>{host.yearsHosting}</div>
                <div style={{ fontSize: 10, fontWeight: 400, color: "#222222" }}>Years hosting</div>
              </div>
            </div>
          </div>

          {/* Personal info below card */}
          <div className="mt-8 space-y-4">
            {host.personalInfo.map((info, i) => (
              <div key={i} className="flex items-center gap-3.5">
                {i === 0 ? (
                  <div className="w-5 h-5 relative flex-shrink-0 flex items-center justify-center">
                    <Image
                      src="/icon-balloon-clean.png"
                      alt=""
                      width={16}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <GraduationCap className="w-5 h-5 text-[#222222] flex-shrink-0" strokeWidth={1.8} />
                )}
                <span style={{ fontSize: 14, color: "#222222" }}>{info}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Co-hosts + Host details (7 cols) ── */}
        <div className="lg:col-span-7 space-y-6 lg:pl-6">
          {/* Co-Hosts */}
          {host.coHosts.length > 0 && (
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 500, color: "#222222", marginBottom: 16 }}>
                Co-Hosts
              </h4>
              <div className="space-y-4">
                {/* Row 1: 3 co-hosts */}
                <div className="flex items-center gap-6">
                  {host.coHosts.slice(0, 3).map((coHost, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 flex-shrink-0">
                      <div
                        className="rounded-full overflow-hidden relative flex-shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: coHost.avatar ? "transparent" : coHost.avatarColor,
                        }}
                      >
                        {coHost.avatar ? (
                          <Image src={coHost.avatar} alt={coHost.name} fill sizes="32px" className="object-cover" />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center font-bold"
                            style={{ fontSize: 13, color: coHost.avatarTextColor || "#222222" }}
                          >
                            {coHost.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: 14, color: "#222222", fontWeight: 400 }}>
                        {coHost.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Row 2: 5 co-hosts */}
                <div className="flex items-center gap-5">
                  {host.coHosts.slice(3).map((coHost, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 flex-shrink-0">
                      <div
                        className="rounded-full overflow-hidden relative flex-shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: coHost.avatar ? "transparent" : coHost.avatarColor,
                        }}
                      >
                        {coHost.avatar ? (
                          <Image src={coHost.avatar} alt={coHost.name} fill sizes="32px" className="object-cover" />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center font-bold"
                            style={{ fontSize: 13, color: coHost.avatarTextColor || "#222222" }}
                          >
                            {coHost.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: 14, color: "#222222", fontWeight: 400 }}>
                        {coHost.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Host details */}
          <div className="pt-2">
            <h4 style={{ fontSize: 18, fontWeight: 500, color: "#222222", marginBottom: 8 }}>
              Host details
            </h4>
            <div style={{ fontSize: 14, color: "#222222" }} className="space-y-1">
              <p>Response rate: {host.responseRate}</p>
              <p>Responds {host.responseTime}</p>
            </div>
          </div>

          {/* Message host button (no icon, clean gray pill) */}
          <div className="pt-2">
            <button
              className="bg-[#F2F2F2] hover:bg-[#EBEBEB] text-[#222222] transition-colors cursor-pointer"
              style={{ borderRadius: 8, padding: "13px 24px", fontSize: 16, fontWeight: 500 }}
            >
              Message host
            </button>
          </div>
        </div>
      </div>

      {/* Full-width safety protection notice */}
      <div className="flex items-center gap-3 pt-6 mt-12 border-t border-[#EBEBEB]">
        <div className="relative w-5 h-7 flex-shrink-0">
          <Image
            src="/icon-airbnb-protect-clean.png"
            alt=""
            fill
            sizes="20px"
            className="object-contain"
          />
        </div>
        <p style={{ fontSize: 12, color: "#6c6c6c", lineHeight: "18px" }}>
          To help protect your payment, always use Airbnb to send money and communicate with hosts.
        </p>
      </div>
    </div>
  );
};
