/* Reservation time selection dropdown */
"use client";

import React, { useEffect } from "react";
import { DateTime } from "luxon";

type TimeProps = {
  date: DateTime;
  times: string[];
  time: DateTime;
  setTime: React.Dispatch<React.SetStateAction<DateTime>>;
};

const Time = ({ date, time, setTime, times }: TimeProps) => {
  useEffect(() => {
    const random = Math.floor(Math.random()) * times.length;
    const earliest = DateTime.fromFormat(times[random], "h:mm a");
    setTime(date?.set({ hour: earliest.hour, minute: earliest.minute, second: 0, millisecond: 0 }));
  }, [times]);
  const handleClick = (value: string) => {
    setTime(DateTime.fromFormat(`${date?.toFormat("ccc, LLL d")} ${value}`, "ccc, LLL d h:mm a"));
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="join-item btn w-48 h-12 btn-soft m-1">
        <p>{time?.toFormat("h:mm a")}</p>
      </div>
      <ul tabIndex={-1} className="dropdown-content menu bg-base-200 rounded-box z-1 w-32 p-2 shadow-sm">
        {times.map(t => (
          <li key={`time-${t}`}>
            <button onClick={() => handleClick(t)}>{t}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Time;
