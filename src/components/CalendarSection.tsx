"use client";

import React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  isBefore,
  startOfDay,
  addDays,
  getDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarSectionProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onDatesChange: (checkIn: Date | null, checkOut: Date | null) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  checkIn,
  checkOut,
  onDatesChange,
}) => {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const nextMonth = addMonths(currentMonth, 1);

  const nights =
    checkIn && checkOut
      ? Math.round(
          Math.abs(checkOut.getTime() - checkIn.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const handleDateClick = (day: Date) => {
    if (isBefore(day, today)) return;
    if (!checkIn || (checkIn && checkOut)) {
      onDatesChange(day, null);
    } else {
      if (isBefore(day, checkIn) || isSameDay(day, checkIn)) {
        onDatesChange(day, null);
      } else {
        onDatesChange(checkIn, day);
      }
    }
  };

  const renderMonth = (monthDate: Date) => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });
    const startDow = getDay(start);
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    return (
      <div className="w-full">
        <div className="text-center font-semibold text-base text-[#222222] mb-4">
          {format(monthDate, "MMMM yyyy")}
        </div>
        {/* Week headers */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#717171] mb-2">
          {weekDays.map((d) => (
            <div key={d} className="h-6 flex items-center justify-center">
              {d}
            </div>
          ))}
        </div>
        {/* Days */}
        <div className="grid grid-cols-7 gap-y-1">
          {/* Spacers */}
          {Array.from({ length: startDow }).map((_, i) => (
            <div key={`sp-${i}`} />
          ))}
          {days.map((day) => {
            const isPast = isBefore(day, today);
            const isStart = checkIn && isSameDay(day, checkIn);
            const isEnd = checkOut && isSameDay(day, checkOut);
            const isInRange =
              checkIn &&
              checkOut &&
              isWithinInterval(day, { start: checkIn, end: checkOut }) &&
              !isStart &&
              !isEnd;

            return (
              <div
                key={day.toISOString()}
                className={`flex items-center justify-center h-10 ${
                  isInRange ? "bg-[#F7F7F7]" : ""
                } ${isStart && checkOut ? "rounded-l-full" : ""} ${
                  isEnd && checkIn ? "rounded-r-full" : ""
                }`}
              >
                <button
                  disabled={isPast}
                  onClick={() => handleDateClick(day)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-black ${
                    isPast
                      ? "text-[#DDDDDD] line-through cursor-not-allowed"
                      : isStart || isEnd
                      ? "bg-[#222222] text-white hover:bg-black"
                      : "text-[#222222] hover:border hover:border-[#222222] cursor-pointer"
                  }`}
                >
                  {format(day, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id="calendar-section" className="py-8 border-b border-[#EBEBEB]">
      <div className="mb-6">
        <h3 className="text-[22px] font-semibold text-[#222222]">
          {nights > 0
            ? `${nights} night${nights > 1 ? "s" : ""} in Candolim`
            : "Select check-in date"}
        </h3>
        <p className="text-sm text-[#717171] mt-1">
          {checkIn && checkOut
            ? `${format(checkIn, "MMM d, yyyy")} \u2013 ${format(checkOut, "MMM d, yyyy")}`
            : "Add your travel dates for exact pricing"}
        </p>
      </div>

      <div className="relative">
        {/* Nav arrows */}
        <div className="absolute top-0 inset-x-0 flex justify-between pointer-events-none">
          <button
            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
            className="pointer-events-auto p-2 rounded-full border border-[#DDDDDD] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-[#222222]" />
          </button>
          <button
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
            className="pointer-events-auto p-2 rounded-full border border-[#DDDDDD] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-[#222222]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-1">
          {renderMonth(currentMonth)}
          {renderMonth(nextMonth)}
        </div>
      </div>

      {checkIn && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => onDatesChange(null, null)}
            className="text-sm font-semibold underline text-[#222222] hover:text-black focus:outline-none"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
};
