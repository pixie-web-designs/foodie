/* Reservation input component */
"use client";

import React, { useState } from "react";
import { DateTime } from "luxon";

import Guest from "./reservation-components/Guest";
import Calendar from "./reservation-components/Calendar";
import Time from "./reservation-components/Time";

// Timestamp with 30 minute intervals creation function
const generateTimeIntervals = (start: DateTime, end: DateTime): string[] => {
  // Return value and current time
  const intervals: string[] = [];
  const now = DateTime.now();
  let current = start;

  // Push current interval to match with current time if selected date matches the current date
  if (start.hasSame(now, "day") && now > start) {
    current = now
      .plus({
        minutes: 30 - (now.minute % 30),
      })
      .startOf("minute");
  }

  // Push timestamps to return value array in 30 minute intervals
  while (current <= end) {
    intervals.push(current.toFormat("h:mm a"));
    current = current.plus({ minutes: 30 });
  }
  return intervals;
};

const Reservation = () => {
  // Disable current day if it's past 9:30 pm
  const isDateDisabled = (date: Date): boolean => {
    const now = DateTime.now();
    const today = DateTime.fromJSDate(date);

    // Disable previous dates
    if (today.startOf("day") < now.startOf("day")) return true;

    // Disable today if it's past 9:30 pm
    if (today.hasSame(now, "day")) {
      if (now.hour > 21 || (now.hour === 21 && now.minute >= 31)) return true;
    }

    return false;
  };
  // Assign state for current date and time
  const [date, setDate] = useState<DateTime>(
    isDateDisabled(new Date()) ? DateTime.now().plus({ days: 1 }).startOf("day") : DateTime.now()
  );
  const [time, setTime] = useState<DateTime>(DateTime.now().plus({ minutes: 30 - (DateTime.now().minute % 30) }));
  const [times, setTimes] = useState<string[]>(
    generateTimeIntervals(
      date?.set({ hour: 10, minute: 0, second: 0, millisecond: 0 }),
      date?.set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
    )
  );
  return (
    <aside className="join pt-24 px-8">
      <Guest />
      <Calendar {...{ date, setDate, setTimes, generateTimeIntervals, isDateDisabled }} />
      <Time {...{ date, time, setTime, times }} />
    </aside>
  );
};

export default Reservation;
