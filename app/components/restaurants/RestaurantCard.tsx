/* Restaurant card component */
import React from "react";

type RestaurantProps = {
  name: string;
  desc: string;
  address: string;
  img: string;
  status: string[];
  tags: string[];
  amount: number;
};

const RestaurantCard = async ({ name, desc, address, img, status, tags, amount }: RestaurantProps) => {
  return (
    <div className="card bg-neutral text-accent-neutral w-96 shadow-sm">
      <figure>
        <img src={img} alt="Sunroot Commons: Cod Fillet"></img>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          {status.map((s) => (
            <div key={s} className="badge badge-accent">
              {s}
            </div>
          ))}
        </h2>
        <p>{address}</p>
        {amount > 4 && <p>{desc}</p>}
        <div className="card-actions justify-end pt-4">
          {tags.map((t) => (
            <div key={t} className="badge badge-secondary">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
