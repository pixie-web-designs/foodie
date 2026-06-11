import React from "react";
import RestaurantList from "./components/restaurants/RestaurantList";

const categories: string[] = ["New", "Trending", "Fine Dining", "Café", "Pub"];
const props = { categories };

const Page = () => {
  return (
    <main className="w-full h-auto p-16">
      <RestaurantList {...props} />
    </main>
  );
};

export default Page;
