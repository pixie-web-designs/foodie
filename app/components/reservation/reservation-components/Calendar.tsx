/* Reservation calendar dropdown component */

import React, { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import { DayPicker, getDefaultClassNames } from "@daypicker/react";

type CalendarProps = {
  date: DateTime;
  setDate: React.Dispatch<React.SetStateAction<DateTime>>;
  setTimes: React.Dispatch<React.SetStateAction<string[]>>;
  generateTimeIntervals: (start: DateTime, end: DateTime) => string[];
};

const Calendar = ({ date, setDate, setTimes, generateTimeIntervals }: CalendarProps) => {
  // Set state for whether calendar is open
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    setTimes(
      generateTimeIntervals(
        date?.set({ hour: 10, minute: 0, second: 0, millisecond: 0 }),
        date?.set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
      )
    );
  }, [date]);

  // Handle open and closed calendar dropdown states
  useEffect(() => {
    isOpen ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Handle calendar date selection
  const handleSelect = (newDate: Date | undefined) => {
    if (!newDate) setDate(DateTime.now());
    else setDate(DateTime.fromJSDate(newDate));
    setIsOpen(false);
  };

  // Handle blur event when calendar closes
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsOpen(false);
  };
  return (
    <div onBlur={handleBlur} ref={containerRef}>
      <button
        popoverTarget="res-cal"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
        className=""
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="btn btn-soft w-48 h-12 m-1">{date?.toFormat("ccc, LLL d")}</div>
      </button>
      {isOpen && (
        <div
          popover="hint"
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
