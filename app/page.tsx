import React from "react";
import RestaurantList from "./components/restaurants/RestaurantList";

const props = { amount: 4 };

const Home = async () => {
  return (
    <main className="w-full h-auto">
      <RestaurantList {...props} />
    </main>
  );
};

export default Home;
