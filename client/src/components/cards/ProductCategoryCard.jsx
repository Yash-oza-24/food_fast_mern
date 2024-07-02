import React from "react";

const ProductCategoryCard = ({ category }) => {
  return (
    <div className="w-full sm:w-72 md:w-44 flex flex-col gap-4 transition duration-300 ease-out cursor-pointer">
      <div className="relative">
        <img
          src={category.img}
          alt={category.name}
          className="w-full h-80 md:h-52 object-cover rounded-md transition duration-300 ease-out"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-opacity-0 hover:bg-black bg-black/40 rounded-md">
          <div className="text-white font-semibold">{category.name}</div>
        </div>
        {category.off && (
          <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded">
            {category.off}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryCard;
