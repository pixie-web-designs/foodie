import React from "react";
import AddToCart from "../AddToCart";

const sCard = {
  primary: "p-4 my-5 bg-emerald-50 text-lg hover:bg-emerald-100",
};

const ProductCard = () => {
  return (
    <div className={sCard.primary}>
      <AddToCart />
    </div>
  );
};

export default ProductCard;
