import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  addToCart,
} from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import toast from "react-hot-toast";

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const isAdmin = currentUser?.role === 'admin';

  const addFavourite = async () => {
    setFavoriteLoading(true);
    
    const token = localStorage.getItem("token");
    try {
      const res = await addToFavourite(token ,{ productId: product?._id });
      setFavorite(true);
      dispatch(
        openSnackbar({
          message: "Added to favorites successfully",
          severity: "success",
        })
      );
      toast.success("Added to favorites successfully");
    } catch (err) {
      console.error("Error adding to favourite:", err);
      dispatch(
        openSnackbar({
          message: err.response?.data?.message || "An error occurred",
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await deleteFromFavourite(token, { productId: product?._id });
      setFavorite(false);
      dispatch(
        openSnackbar({
          message: "Removed from favorites successfully",
          severity: "success",
        })
      );
    } catch (err) {
      console.error("Error removing from favourite:", err);
      dispatch(
        openSnackbar({
          message: err.response?.data?.message || "An error occurred",
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const checkFavorite = async () => {
    const token = localStorage.getItem("token");  
    setFavoriteLoading(true);
    try {
      const res = await getFavourite(token);
      const isFavorite = res.data?.some(
        (favorite) => favorite._id === product?._id
      );
      setFavorite(isFavorite);
    } catch (err) {
      console.error("Error checking favourite:", err);
      dispatch(
        openSnackbar({
          message: err.response?.data?.message || "An error occurred",
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await addToCart(token, { productId: id, quantity: 1 });
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      dispatch(
        openSnackbar({
          message: err.response?.data?.message || "An error occurred",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      checkFavorite();
    }
  }, []);

  return (
    <div className="w-full sm:w-72 md:w-80 flex flex-col gap-4 transition duration-300 ease-out cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 bg-white">
      <div className="relative">
        <img
          src={product?.img}
          alt={product?.name}
          className="w-full h-56 md:h-64 object-cover transition duration-300 ease-out rounded-t-lg"
        />
        <div className="absolute top-0 right-0 mt-2 mr-2 flex gap-2">
          {isAdmin ? null : (
            favoriteLoading ? (
              <CircularProgress sx={{ fontSize: "20px" }} />
            ) : (
              <>
                {favorite ? (
                  <FavoriteRounded
                    className="text-red-500 cursor-pointer"
                    sx={{ fontSize: "20px" }}
                    onClick={removeFavourite}
                  />
                ) : (
                  <FavoriteBorder
                    className="cursor-pointer"
                    sx={{ fontSize: "20px", color: "white" }}
                    onClick={addFavourite}
                  />
                )}
                <ShoppingBagOutlined
                  className="cursor-pointer"
                  sx={{ fontSize: "20px", color: "white" }}
                  onClick={() => addCart(product?._id)}
                />
              </>
            )
          )}
        </div>
      </div>
      <div className="flex flex-col p-4" onClick={() => navigate(`/dishes/${product._id}`)}>
        <div className="text-lg font-bold text-red-600">{product?.name}</div>
        <div className="text-sm text-gray-600 line-clamp-2">{product?.desc}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-lg font-semibold text-gray-800">${product?.price?.org}</div>
          <div className="text-sm text-gray-600 line-through">${product?.price?.mrp}</div>
          <div className="text-sm font-semibold text-red-600">{product?.price?.off}% Off</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
