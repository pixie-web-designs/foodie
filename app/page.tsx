import React from "react";
import RestaurantList from "./components/restaurants/RestaurantList";
import Navbar from "./components/navbar/Navbar";

const categories: string[] = ["New", "Trending", "Fine Dining", "Café", "Pub"];
const props = { categories };

const Page = () => {
  return (
    <>
      <Navbar />
      <RestaurantList {...props} />
    </>
  );
};

export default Page;
