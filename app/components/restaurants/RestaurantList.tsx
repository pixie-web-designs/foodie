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
  status: string[];
  tags: string[];
  amount: number;
}

const RestaurantList = async ({ amount }: ListProps) => {
  const res = await fetch(`${process.env.API_URL}/restaurants`);
  const restaurants: Restaurant[] = await res.json();
  return (
    <ul className="flex justify-center flex-wrap w-full gap-8 py-16 px-4">
      {[...restaurants].slice(0, amount).map((r) => (
        <li key={r.id}>
          <RestaurantCard {...r} />
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
