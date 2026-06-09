/* Restaurant card component */
import React from "react";

type RestaurantProps = {
  name: string;
  type: string;
  desc: string;
  address: string;
  img: string;
  isNew: boolean;
};

const RestaurantCard = async ({ name, type, desc, address, img, isNew }: RestaurantProps) => {
  return (
    <div className="card bg-neutral text-accent-neutral w-96 shadow-sm">
      <figure>
        <img src={img} alt="Sunroot Commons: Cod Fillet"></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          {isNew && <div className="badge badge-accent">NEW</div>}
        </h2>
        <p>{address}</p>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
