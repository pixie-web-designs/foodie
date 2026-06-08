import React from "react";

import RestaurantList from "./components/restaurants/RestaurantList";

const classMain = {
  default: "w-full h-auto",
};

const Home = async () => {
  return (
    <main className={classMain.default}>
      <RestaurantList />
    </main>
  );
};

export default Home;
