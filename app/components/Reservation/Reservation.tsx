/* Reservation input component */
"use client";

import React, { useState } from "react";

import Guest from "./reservation-components/Guest";
import Calendar from "./reservation-components/Calendar";
import Time from "./reservation-components/Time";

const Reservation = () => {
  return (
    <div className="join w-full pt-24 px-8">
      <Guest />
      <Calendar />
      <Time />
    </div>
  );
};

export default Reservation;
