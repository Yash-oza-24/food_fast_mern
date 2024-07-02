import React, { useEffect, useState } from "react";
import ProductsCard from "../components/cards/ProductsCard";
import { getFavourite } from "../api";
import { CircularProgress } from "@mui/material";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await getFavourite(token);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="p-6 md:p-12 mt-12 h-full flex flex-col items-center gap-6 overflow-y-auto bg-bg">
      <div className="max-w-4xl w-full">
        <div className="text-2xl font-bold flex justify-between items-center mb-6">
          Your Favourites
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {loading ? (
            <div className="flex justify-center w-full">
              <CircularProgress />
            </div>
          ) : (
            <>
              {products.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))}
              {products.length === 0 && (
                <div className="text-lg text-center w-full mt-4">
                  No favourite products found.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
