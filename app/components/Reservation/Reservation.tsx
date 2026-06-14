/* Reservation input component */
"use client";

import React, { useState } from "react";
import { DateTime } from "luxon";

// Basic range array creation function
const range = (start: number, end: number, step: number = 1) => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, index) => start + index * step);
};
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
// Function to create dropdown buttons from arrays
const createDropdown = (
  items: any[],
  desc: string,
  tab: number,
  val: string,
  setVal: React.Dispatch<React.SetStateAction<string>>
) => {
  const handleClick = (value: string) => {
    setVal(
      `${value} ${
        desc !== "Time" ?
          Number(value) > 1 ?
            `${desc}s`
          : desc
        : ""
      }`
    );
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return (
    <div className="dropdown flex-1">
      <div tabIndex={tab} role="button" className="btn btn-block btn-soft m-1 flex-col">
        <p>{val}</p>
      </div>
      <ul tabIndex={-1} className="dropdown-content menu bg-base-200 rounded-box z-1 w-32 p-2 shadow-sm">
        {items.map(i => (
          <li key={`${desc}-${i}`}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Reservation = () => {
  const guests: number[] = range(1, 8);
  const times: string[] = generateTimeIntervals(
    DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
    DateTime.now().set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
  );
  const [guest, setGuest] = useState<string>("2 Guests");
  const [day, setDay] = useState<string>(DateTime.now().toFormat("ccc, LLL d"));
  const [time, setTime] = useState<string>(
    DateTime.now()
      .plus({ minutes: 30 - (DateTime.now().minute % 30) })
      .toFormat("h:mm a")
  );
  return (
    <div className="join w-full pt-24 px-8">
      {createDropdown(guests, "Guest", 0, guest, setGuest)}
      {createDropdown(times, "Time", 1, time, setTime)}
    </div>
  );
};

export default Reservation;
