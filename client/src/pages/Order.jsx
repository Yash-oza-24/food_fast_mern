import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from "@mui/material";
import { fetchOrders } from '../redux/reducers/UserSlice'; // Adjust the path to your slice

const Order = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchOrders(currentUser.id));
    }
  }, [dispatch, currentUser]);

  return (
    <div className="flex flex-col mt-20 items-center p-4">
      <h1 className="text-3xl font-semibold text-black mb-6"> {currentUser?.role === 'admin' ? 'All Orders' : 'My Orders'}</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        orders.map((order) => (
          <div key={order._id} className="flex flex-col md:flex-row border-2 border-gray-300 bg-white p-4 rounded-lg w-full max-w-6xl mb-8 shadow-lg">
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
              <h1 className="text-xl font-semibold text-red-600">Total Amount: <span className="text-gray-700">${order.total_amount}</span></h1>
              <h4 className="text-lg text-red-600">Address: <span className="text-gray-700">{order.address}</span></h4>
              <p className="text-red-600">Status: <span className="text-gray-700">{order.status}</span></p>
            </div>
            <div className="flex flex-wrap gap-4 flex-2 justify-center md:justify-start">
              {order.products.map(({ product, quantity }) => (
                <div key={product._id} className="border-2 border-gray-300 bg-white p-4 rounded-lg w-full max-w-xs text-center shadow-md transform transition-transform hover:scale-105 duration-200">
                  <img src={product.img} alt={product.name} className="w-24 h-24 mx-auto mb-2" />
                  <h4 className="text-lg font-semibold text-red-600">{product.name}</h4>
                  <p className="text-sm text-gray-700">{product.desc}</p>
                  <p className="text-red-600">Price: <span className="text-gray-700">${product.price.mrp} (Original: ${product.price.org}, Off: {product.price.off}%)</span></p>
                  <p className="text-red-600">Quantity: <span className="text-gray-700">{quantity}</span></p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;
