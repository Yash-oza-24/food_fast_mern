import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "../../api";
import toast from "react-hot-toast";

// Initial state
const initialState = {
  currentUser: null,
  orders: [],
  isLoading: false
};

// Define the async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  'user/fetchOrders',
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    const response = await getOrders(token);
    return response.data.orders; 
  }
);

// Create the slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      toast.success("Login Successfull")
    },
    logout: (state) => {
      state.currentUser = null;
      state.orders = [];
      state.isLoading = false;
      localStorage.removeItem("token");
      toast.success("Logout Successfull")
    },
    addFavorite: (state, action) => {
      state.currentUser.favourites.push(action.payload);
      toast.success("Added to favourite")
    },
    removeFavorite: (state, action) => {
      state.currentUser.favourites = state.currentUser.favourites.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Failed to fetch orders: ", action.error.message);
      });
  }
});

// Export actions and reducer
export const { updateUser, loginSuccess, logout, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
