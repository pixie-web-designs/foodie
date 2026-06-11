/* Restaurant card component */
import React from "react";

type RestaurantProps = {
  name: string;
  address: string;
  img: string;
  alt: string;
  status: string[];
  tags: string[];
};

const RestaurantCard = async ({ name, address, img, alt, status, tags }: RestaurantProps) => {
  return (
    <div className="card bg-neutral text-accent-neutral w-96 shadow-sm">
      <figure>
        <img src={img} alt={alt}></img>
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
