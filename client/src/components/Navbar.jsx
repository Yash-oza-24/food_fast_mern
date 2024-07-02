/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImg from "../utils/Images/log.png";
import { MenuIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { Badge } from "@mui/material";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getFavourite, getCart } from "../api";
import { logout } from "../redux/reducers/UserSlice";

const Navbar = ({ setOpenAuth, openAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

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

  const getCartItems = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await getCart(token);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getCartItems();
  }, []);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <nav className="bg-white h-16 flex items-center justify-center fixed top-0 w-full z-20 shadow-md">
      <div className="w-full max-w-6xl px-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="text-black md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon className="h-8 w-8 text-gray-700" />
          </button>
          <LinkR to="/" className="flex items-center">
            <img
              src={LogoImg}
              alt="Logo"
              className="h-20 w-52 md:w-auto object-cover"
            />
          </LinkR>
        </div>

        <ul className="hidden md:flex items-center gap-8 list-none flex-grow justify-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center text-black font-medium transition-colors duration-300 hover:text-red-600 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dishes"
              className={({ isActive }) =>
                `flex items-center text-black font-medium transition-colors duration-300 hover:text-red-600 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
              }
            >
              Dishes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex items-center text-black font-medium transition-colors duration-300 hover:text-red-600 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to={isAdmin ? "/add-food" : "/contact"}
              className={({ isActive }) =>
                `flex items-center text-black font-medium transition-colors duration-300 hover:text-red-600 ${isActive ? "text-red-600 border-b-2 border-red-600" : ""}`
              }
            >
              {isAdmin ? "Add Food" : "Contact"}
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center space-x-3">
            {currentUser && (
              <div className="hidden md:flex items-center gap-4">
                <NavLink to="/favorite" className="text-black">
                  {!isAdmin && (
                    <Badge badgeContent={products.length || 0} color="error">
                      <HeartIcon className="h-8 w-8 text-gray-700" />
                    </Badge>
                  )}
                </NavLink>
                <NavLink to="/cart" className="text-black">
                  {!isAdmin && (
                    <Badge badgeContent={cartItems.length || 0} color="error">
                      <ShoppingCartIcon className="h-8 w-8 text-gray-700" />
                    </Badge>
                  )}
                </NavLink>
                <div className="bg-red-600 text-white p-2 rounded-full">
                  {currentUser?.name.split(" ")[0]}
                </div>
                <button
                  className="text-red-600 font-semibold"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </div>
            )}
            {!currentUser && (
              <div className="hidden md:flex">
                <Button
                  text="Sign In"
                  small
                  onClick={() => setOpenAuth(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md flex flex-col items-start p-6 gap-4 md:hidden">
          <NavLink
            to="/"
            className="text-black font-medium w-full"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/dishes"
            className="text-black font-medium w-full"
            onClick={() => setIsOpen(false)}
          >
            Dishes
          </NavLink>
          <NavLink
            to="/orders"
            className="text-black font-medium w-full"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </NavLink>
          <NavLink
            to={isAdmin ? "/add-food" : "/contact"}
            className="text-black font-medium w-full"
            onClick={() => setIsOpen(false)}
          >
            {isAdmin ? "Add Food" : "Contact"}
          </NavLink>
          {currentUser ? (
            <button
              className="text-red-600 font-semibold"
              onClick={() => {
                dispatch(logout());
                setIsOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-4">
              <Button
                text="Sign Up"
                outlined
                small
                onClick={() => setOpenAuth(true)}
              />
              <Button
                text="Sign In"
                small
                onClick={() => setOpenAuth(true)}
              />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
