/* Restaurant card component */
import React from "react";

type RestaurantProps = {
  name: string;
  address: string;
  img: string;
  alt: string;
};

const RestaurantCard = async ({ name, address, img, alt }: RestaurantProps) => {
  // Return a restaurant card for the landing page
  return (
    <>
      <figure>
        <img src={img} alt={alt}></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{address}</p>
      </div>
    </>
  );
};

export default RestaurantCard;
