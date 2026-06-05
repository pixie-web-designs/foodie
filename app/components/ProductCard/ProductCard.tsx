import React from "react";
import AddToCart from "../AddToCart";

const ProductCard = () => {
  return (
    <div className="p-4 my-5 bg-emerald-50 text-lg hover:bg-emerald-100">
      <AddToCart />
    </div>
  );
};

export default ProductCard;
