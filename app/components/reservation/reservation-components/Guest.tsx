/* Reservation guest selection dropdown */
"use client";

import React, { useState } from "react";

// Basic range array creation function
const range = (start: number, end: number, step: number = 1) => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, index) => start + index * step);
};

const Guest = () => {
  const [guest, setGuest] = useState<string>("2 Guests");
  const guests: number[] = range(1, 8);
  const handleClick = (value: number) => {
    setGuest(`${value} ${value > 1 ? "Guests" : "Guest"}`);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return (
    <div className="dropdown flex-1">
      <div tabIndex={0} role="button" className="btn btn-block btn-soft m-1">
        <p>{guest}</p>
      </div>
      <ul tabIndex={-1} className="dropdown-content menu bg-base-200 rounded-box z-1 w-32 p-2 shadow-sm">
        {guests.map(g => (
          <li key={`guest-${g}`}>
            <button onClick={() => handleClick(g)}>{g}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guest;
