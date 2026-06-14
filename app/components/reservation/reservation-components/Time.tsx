/* Reservation time selection dropdown */
"use client";

import React, { useState } from "react";
import { DateTime } from "luxon";

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

const Time = () => {
  const [time, setTime] = useState<string>(
    DateTime.now()
      .plus({ minutes: 30 - (DateTime.now().minute % 30) })
      .toFormat("h:mm a")
  );
  const times: string[] = generateTimeIntervals(
    DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
    DateTime.now().set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
  );
  const handleClick = (value: string) => {
    setTime(value);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return (
    <div className="dropdown flex-1">
      <div tabIndex={0} role="button" className="btn btn-block btn-soft m-1 flex-col">
        <p>{time}</p>
      </div>
      <ul tabIndex={-1} className="dropdown-content menu bg-base-200 rounded-box z-1 w-32 p-2 shadow-sm">
        {times.map(t => (
          <li key={`guest-${t}`}>
            <button onClick={() => handleClick(t)}>{t}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Time;
