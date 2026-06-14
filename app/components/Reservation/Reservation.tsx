/* Reservation input component */
"use client";

import React, { useState } from "react";
import { DateTime } from "luxon";
import { DayPicker } from "@daypicker/react";

import Guest from "./reservation-components/Guest";
import Time from "./reservation-components/Time";

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

const createCalendar = (val: string, setVal: React.Dispatch<React.SetStateAction<string>>) => {
  return (
    <div className="flex-1">
      <button
        popoverTarget="cally-reserve"
        className="btn btn-block btn-soft m-1 flex-col"
        id="date-reserve"
        style={{ anchorName: "--date-reserve" }}
      >
        <p>Date</p>
      </button>
    </div>
  );
};

const Reservation = () => {
  const [day, setDay] = useState<string>(DateTime.now().toFormat("ccc, LLL d"));
  return (
    <div className="join w-full pt-24 px-8">
      <Guest />
      {createCalendar(day, setDay)}
      <Time />
    </div>
  );
};

export default Reservation;
