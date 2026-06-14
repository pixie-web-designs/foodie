/* Reservation calendar dropdown component */

import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { DayPicker, getDefaultClassNames } from "@daypicker/react";

const Calendar = () => {
  // Set state for current date and whether calendar is open
  const [date, setDate] = useState<DateTime | null>(DateTime.now());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultClassNames = getDefaultClassNames();

  // Handle open and closed calendar dropdown states
  useEffect(() => {
    isOpen ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) setDate(null);
    else setDate(DateTime.fromJSDate(date));
    setIsOpen(false);
  };
  return (
    <div className="flex-1">
      <button
        popoverTarget="res-cal"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
        className="btn-block"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="btn btn-block btn-soft m-1">{date?.toFormat("ccc, LLL d")}</div>
      </button>
      {isOpen && (
        <div
          popover="manual"
          id="res-cal"
          className="dropdown"
          style={{ positionAnchor: "--rdp" } as React.CSSProperties}
        >
          <DayPicker
            className="react-day-picker"
            mode="single"
            selected={date?.toJSDate()}
            onSelect={handleSelect}
            disabled={{ before: new Date() }}
            classNames={{ day_button: `${defaultClassNames.day_button} hover:disabled:cursor-default` }}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
