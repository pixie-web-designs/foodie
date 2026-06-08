/* Restaurant card component */
import React from "react";

const classCard = {
  default: "card text-primary-content bg-primary w-96 shadow-sm",
};

type RestaurantProps = {
  name: string;
  type: string;
  desc: string;
  address: string;
  img: string;
};

const RestaurantCard = async ({ name, type, desc, address, img }: RestaurantProps) => {
  return (
    <div className={classCard.default}>
      <figure>
        <img src={img} alt="Sunroot Commons: Cod Fillet"></img>
      </figure>
      <main className="card-body">
        <h5 className="card-title">
          {name}
          <div className="badge badge-accent">
            <p className="text-accent-content">NEW</p>
          </div>
        </h5>
        <p className="text-secondary-content">{address}</p>
        <p>{desc}</p>
      </main>
    </div>
  );
};

export default RestaurantCard;
