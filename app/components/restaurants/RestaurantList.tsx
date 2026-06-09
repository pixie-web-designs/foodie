/* Restaurant List component */
import React from "react";

import RestaurantCard from "./RestaurantCard";

interface Restaurant {
  id: number;
  name: string;
  type: string;
  desc: string;
  address: string;
  img: string;
  isNew: boolean;
}

const classList = {
  default: "flex flex-wrap w-full gap-4 p-4",
};

const RestaurantList = async () => {
  const res = await fetch(`${process.env.API_URL}/restaurants`);
  const restaurants: Restaurant[] = await res.json();
  console.log(restaurants);
  return (
    <ul className={classList.default}>
      {restaurants.map((r) => (
        <li key={r.id}>
          <RestaurantCard {...r} />
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
