import axios from "axios";

//auth
export const UserSignUp = async (data) => await axios.post("http://localhost:5000/api/user/signup", data);
export const UserSignIn = async (data) => await axios.post("http://localhost:5000/api/user/signin", data);

//products
export const getAllProducts = async (filter) =>
  await axios.get(`http://localhost:5000/api/food?${filter}`, filter);

export const getProductDetails = async (id) => await axios.get(`http://localhost:5000/api/food/${id}`);

//Cart
export const getCart = async (token) =>
  await axios.get(`http://localhost:5000/api/user/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = async (token, data) =>
  await axios.post(`http://localhost:5000/api/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromCart = async (token, data) =>
  await axios.patch(`http://localhost:5000/api/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//favorites
export const getFavourite = async (token) =>
  await axios.get(`http://localhost:5000/api/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToFavourite = async (token, data) =>
  await axios.post(`http://localhost:5000/api/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromFavourite = async (token, data) =>
  await axios.patch(`http://localhost:5000/api/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Orders
export const placeOrder = async (token, data) =>
  await axios.post(`http://localhost:5000/api/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await axios.get(`http://localhost:5000/api/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addFood = async (data) =>
  await axios.post(`http://localhost:5000/api/food/add`, data, {
  }) 
