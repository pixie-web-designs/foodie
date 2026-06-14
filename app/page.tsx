import React from "react";

import Navbar from "./components/navbar/Navbar";
import Reservation from "./components/Reservation/Reservation";
import RestaurantList from "./components/restaurants/RestaurantList";

const categories: string[] = ["New", "Trending", "Fine Dining", "Café", "Pub"];
const props = { categories };

const Page = () => {
  return (
    <>
      <Navbar />
      <Reservation />
      <RestaurantList {...props} />
    </>
  );
};

export default Page;
