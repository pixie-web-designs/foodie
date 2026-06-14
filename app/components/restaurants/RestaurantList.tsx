/* Restaurant List component */
import React, { Fragment } from "react";

import RestaurantCard from "./RestaurantCard";

type ListProps = {
  categories: string[];
};

interface Restaurant {
  id: number;
  name: string;
  address: string;
  img: string;
  alt: string;
  status: string[];
  tags: string[];
}

const RestaurantList = async ({ categories }: ListProps) => {
  // Get restaurant data from server
  const res = await fetch(`${process.env.API_URL}/restaurants`);
  const restaurants: Restaurant[] = await res.json();

  // Assign item categories and descriptors for display
  const displayItems = categories.map(c => {
    let title: string = "New Arrivals";
    let subtitle: string = "The latest and greatest of the New Verdania culinary world.";
    switch (c.toLowerCase()) {
      case "trending":
        title = "Popular Locales";
        subtitle = "Check out these local delicacies. See what the buzz is about.";
        break;
      case "fine dining":
        title = "Upscale Dining";
        subtitle = "Luxurious culinary experiences. Ethically sourced and produced.";
        break;
      case "café":
        title = "Coffee and Brunch";
        subtitle = "Midday bites and artisan brews. Savour a fresh cup.";
        break;
      case "pub":
        title = "Pours and Plates";
        subtitle = "Curated menus and craft brews. Relax and enjoy.";
        break;
    }
    // Loop over and slice restaurant data to display only a select amount based on their filters
    const items = restaurants
      .filter(r => (r.status.includes(c) && !r.tags.includes(c)) || (r.tags.includes(c) && !r.status.includes(c)))
      .slice(0, 4);
    return { category: c, title, subtitle, items };
  });
  // List component
  return (
    <main className="p-8">
      {displayItems.map(d => (
        <div key={`frag-${d.category}`} className="flex flex-col justify-between align-center">
          <h2 key={`header-${d.category}`} className="text-3xl text-base-content pb-2">
            {d.title}
          </h2>
          <h3 className="text-xl text-base-content pb-6">{d.subtitle}</h3>
          <ul key={`list-${d.category}`} className="flex justify-start w-full gap-4 pb-8">
            {d.items.map(i => (
              <div key={i.id} className="card flex-1 text-neutral-content bg-neutral shadow-neutral shadow-sm">
                <RestaurantCard {...i} />
              </div>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};

export default RestaurantList;
