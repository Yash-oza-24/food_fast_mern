/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductsCard";
import { filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";

const FoodListing = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [selectedCategories, setSelectedCategories] = useState([]); // Default selected categories

  const getFilteredProductsData = async () => {
    setLoading(true);
    try {
      const queryParams = selectedCategories.length > 0
        ? `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&categories=${selectedCategories.join(",")}`
        : `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

      console.log("API Call with query:", queryParams); // Debug API query
      const response = await getAllProducts(queryParams);
      console.log("Fetched Products:", response.data); // Debug fetched data
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching products with filters:", {
      priceRange,
      selectedCategories,
    });
    getFilteredProductsData();
  }, [priceRange, selectedCategories]);

  return (
    <div className="min-h-screen mt-20">
      <h1 className="text-3xl font-semibold text-black text-center ">Food Listing</h1>
      <div className="flex flex-col md:flex-row  md:p-3 bg-white rounded-lg">
        <div className="w-full md:w-1/4 bg-white p-5 rounded-l-md md:h-screen">
          <div className="space-y-6 ">
            {filter.map((filters) => (
              <div key={filters.name} className="space-y-3">
                <div className="text-xl font-semibold text-red-600">{filters.name}</div>
                {filters.value === "price" ? (
                  <Slider
                    aria-label="Price"
                    value={priceRange}
                    min={0}
                    max={1000}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: "$0" },
                      { value: 1000, label: "$1000" },
                    ]}
                    onChange={(e, newValue) => {
                      console.log("New Price Range:", newValue); // Debug price range change
                      setPriceRange(newValue);
                    }}
                  />
                ) : filters.value === "category" ? (
                  <div className="flex flex-wrap gap-2">
                    {filters.items.map((item) => (
                      <div
                        key={item}
                        className={`cursor-pointer border rounded-md px-3 py-1 text-sm ${
                          selectedCategories.includes(item)
                            ? "border-blue-500 text-blue-500 bg-blue-100"
                            : "border-gray-300 text-gray-600"
                        }`}
                        onClick={() => {
                          const newCategories = selectedCategories.includes(item)
                            ? selectedCategories.filter(
                                (category) => category !== item
                              )
                            : [...selectedCategories, item];
                          console.log("New Selected Categories:", newCategories); // Debug category change
                          setSelectedCategories(newCategories);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/4 flex mt-8 flex-col items-center bg-white rounded-lg">
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="flex flex-wrap justify-center gap-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodListing;
