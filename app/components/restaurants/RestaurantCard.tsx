/* Restaurant card component */
import React from "react";

type RestaurantProps = {
  name: string;
  address: string;
  img: string;
  alt: string;
};

const RestaurantCard = async ({ name, address, img, alt }: RestaurantProps) => {
  return (
    <div className="card bg-neutral text-accent-neutral w-88 shadow-primary-content shadow-sm">
      <figure>
        <img src={img} alt={alt}></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
