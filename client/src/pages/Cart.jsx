import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { addToCart, deleteFromCart, getCart, placeOrder } from "../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import { DeleteOutline } from "@mui/icons-material";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await getCart(token);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.org,
      0
    );
  };

  const convertAddressToString = (addressObj) => {
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const placeOrderHandler = async () => {
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.completeAddress &&
        deliveryDetails.phoneNumber &&
        deliveryDetails.emailAddress;

      const isPaymentDetailsFilled =
        paymentDetails.cardNumber &&
        paymentDetails.expiryDate &&
        paymentDetails.cvv &&
        paymentDetails.cardHolderName;

      if (!isDeliveryDetailsFilled || !isPaymentDetailsFilled) {
        dispatch(
          openSnackbar({
            message: "Please fill in all required delivery and payment details.",
            severity: "error",
          })
        );
        setButtonLoad(false);
        return;
      }

      const token = localStorage.getItem("token");
      const totalAmount = calculateSubtotal().toFixed(2);
      const orderDetails = {
        products,
        address: convertAddressToString(deliveryDetails),
        totalAmount,
      };

      await placeOrder(token, orderDetails);
      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );
      setButtonLoad(false);
      setReload(!reload); // Refresh cart
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await addToCart(token, { productId: id, quantity: 1 });
      setReload(!reload); // Refresh cart
    } catch (error) {
      console.error("Error adding to cart:", error);
      dispatch(
        openSnackbar({
          message: error.message,
          severity: "error",
        })
      );
    }
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    try {
      await deleteFromCart(token, { productId: id, quantity: qnt });
      setReload(!reload); // Refresh cart
    } catch (error) {
      console.error("Error removing from cart:", error);
      dispatch(
        openSnackbar({
          message: error.message,
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  return (
    <div className="p-6 md:p-12 h-full flex flex-col items-center gap-6 overflow-y-auto bg-bg mt-12">
      <div className="w-full max-w-4xl">
        <div className="text-2xl font-bold flex justify-between items-center">
          Your Shopping Cart
        </div>
        {loading ? (
          <div className="flex justify-center mt-4">
            <CircularProgress />
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="mt-4 text-xl text-center">Cart is empty</div>
            ) : (
              <div className="flex flex-col mt-14 md:flex-row gap-6">
                <div className="flex-1">
                  <div className="grid grid-cols-5 gap-4 text-sm md:text-base border-b border-gray-200 pb-2">
                    <div className="col-span-2">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                    <div></div>
                  </div>
                  {products.map((item) => (
                    <div
                      key={item.product._id}
                      className="grid grid-cols-5 gap-4 items-center py-2 border-b border-gray-200"
                    >
                      <div className="col-span-2 flex items-center gap-4">
                        <img
                          src={item?.product?.img}
                          alt={item?.product?.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <div className="text-sm md:text-base font-semibold text-primary">
                            {item?.product?.name}
                          </div>
                          <div className="text-xs md:text-sm text-text_primary">
                            {item?.product?.desc}
                          </div>
                        </div>
                      </div>
                      <div>${item?.product?.price?.org}</div>
                      <div className="flex items-center gap-4">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            removeCart(item?.product?._id, item?.quantity - 1)
                          }
                        >
                          -
                        </div>
                        <div>{item?.quantity}</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => addCart(item?.product?._id)}
                        >
                          +
                        </div>
                      </div>
                      <div>${(item.quantity * item?.product?.price?.org).toFixed(2)}</div>
                      <div>
                        <DeleteOutline
                          className="text-red-500 cursor-pointer"
                          onClick={() =>
                            removeCart(
                              item?.product?._id,
                              item?.quantity - 1,
                              "full"
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-6">
                  <div className="text-lg font-semibold flex justify-between">
                    Subtotal : ${calculateSubtotal().toFixed(2)}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="text-lg font-medium">Delivery Details:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextInput
                        small
                        placeholder="First Name"
                        value={deliveryDetails.firstName}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Last Name"
                        value={deliveryDetails.lastName}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Email Address"
                        value={deliveryDetails.emailAddress}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            emailAddress: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Phone no. +91 XXXXX XXXXX"
                        value={deliveryDetails.phoneNumber}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        textArea
                        rows="5"
                        placeholder="Complete Address (Address, State, Country, Pincode)"
                        value={deliveryDetails.completeAddress}
                        handleChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            completeAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="text-lg font-medium">Payment Details:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextInput
                        small
                        placeholder="Card Number"
                        value={paymentDetails.cardNumber}
                        handleChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardNumber: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-4">
                        <TextInput
                          small
                          placeholder="Expiry Date"
                          value={paymentDetails.expiryDate}
                          handleChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              expiryDate: e.target.value,
                            })
                          }
                        />
                        <TextInput
                          small
                          placeholder="CVV"
                          value={paymentDetails.cvv}
                          handleChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cvv: e.target.value,
                            })
                          }
                        />
                      </div>
                      <TextInput
                        small
                        placeholder="Card Holder name"
                        value={paymentDetails.cardHolderName}
                        handleChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardHolderName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    text="Place Order"
                    small
                    onClick={placeOrderHandler}
                    isLoading={buttonLoad}
                    isDisabled={buttonLoad}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
