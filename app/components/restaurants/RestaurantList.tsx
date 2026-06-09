/* Restaurant List component */
import React from "react";

import RestaurantCard from "./RestaurantCard";

type ListProps = {
  amount: number;
};

interface Restaurant {
  id: number;
  name: string;
  desc: string;
  address: string;
  img: string;
  isNew: boolean;
  tags: string[];
}

const classList = {
  default: "flex flex-wrap w-full gap-4 p-4",
};

const RestaurantList = async ({ amount }: ListProps) => {
  const res = await fetch(`${process.env.API_URL}/restaurants`);
  const restaurants: Restaurant[] = await res.json();
  return (
    <ul className={classList.default}>
      {[...restaurants].slice(0, amount).map((r) => (
        <li key={r.id}>
          <RestaurantCard {...r} />
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
