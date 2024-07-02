/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
} from "../api";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { useDispatch, useSelector } from "react-redux";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();

  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const removeFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("token");
    await deleteFromFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const addFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("token");
    await addToFavourite(token, { productId: id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const checkFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("token");
    await getFavourite(token, { productId: id })
      .then((res) => {
        const isFavorite = res.data?.some((favorite) => favorite._id === id);
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getProduct();
    checkFavorite();
  }, []);

  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  return (
    <div className="p-6 md:p-8 mt-20 h-full flex items-center gap-6 overflow-x-auto bg-bg">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="w-full max-w-9xl grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-start md:flex-col md:gap-8">
          <div className="flex-0.5 flex justify-center">
            <img
              src={product?.img}
              alt={product?.name}
              className="max-w-xl w-full max-h-xl rounded-lg object-cover md:max-w-md md:h-auto"
            />
          </div>
          <div className="flex-1 flex flex-col gap-4 p-2.5">
            <div>
              <h1 className="text-2xl font-bold text-primary">{product?.name}</h1>
            </div>
            <Rating value={3.5} readOnly />
            <div className="flex items-center gap-2 text-xl font-medium text-primary">
              ${product?.price?.org}{" "}
              <span className="text-lg font-medium text-secondary line-through">
                ${product?.price?.mrp}
              </span>{" "}
              <span className="text-lg font-medium text-red-600">
                ({product?.price?.off}% Off)
              </span>
            </div>
            <div className="text-base font-normal text-primary">
              {product?.desc}
            </div>
            <div className="text-base font-medium flex flex-col gap-6">
              Ingredients
              <div className="flex flex-wrap gap-3">
                {product?.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-primary bg-opacity-20 text-primary text-sm px-3 py-1 rounded-lg flex items-center justify-center"
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
            </div>
            {currentUser?.role !== "admin" && (
              <div className="flex gap-4 py-8 md:gap-3 md:py-3">
                <Button
                  text="Add to Cart"
                  full
                  outlined
                  isLoading={cartLoading}
                  onClick={addCart}
                />
                <Button
                  leftIcon={
                    favorite ? (
                      <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                    ) : (
                      <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                    )
                  }
                  full
                  outlined
                  isLoading={favoriteLoading}
                  onClick={favorite ? removeFavourite : addFavourite}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
