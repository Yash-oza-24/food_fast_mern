import React, { useEffect, useState } from "react";
import HeaderImage from "../utils/Images/img.avif";
import ProductsCard from "../components/cards/ProductsCard";
import { getAllProducts } from "../api";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="relative w-full h-[400px] sm:h-[600px] overflow-hidden mt-16">
        <img src={HeaderImage} alt="Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Welcome to <span className="text-red-600">FoodFast</span>
          </h1>
          <p className="text-base sm:text-lg mt-4">
            Delicious meals delivered to your doorstep
          </p>
          <Link to={"/dishes"}>
            <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 ease-in-out">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 p-5 h-full overflow-y-scroll bg-white">
        <div className="max-w-7xl w-full px-4 py-8 flex flex-col gap-7">
          <div className="text-xl sm:text-2xl font-medium">Most Popular</div>
          {loading ? (
            <div className="flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
              {products.map((product) => (
                <ProductsCard product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
