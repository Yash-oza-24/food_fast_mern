import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useState } from "react";
import Authentication from "./pages/Authentication";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import FoodDetails from "./pages/FoodDetails";
import FoodListing from "./pages/FoodListing";
import { useSelector } from "react-redux";
import Order from "./pages/Order";
import ContactPage from "./pages/Contacts";
import AddFood from "./pages/AddFood"; // Make sure to import the AddFood component
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const [openAuth, setOpenAuth] = useState(false);
  const isAdmin = currentUser?.role === 'admin';

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
        <Toaster />
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/favorite" exact element={<Favourites />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/dishes/:id" exact element={<FoodDetails />} />
            <Route path="/dishes" exact element={<FoodListing />} />
            <Route path="/orders" exact element={<Order />} />
            {!isAdmin && <Route path="/contact" exact element={<ContactPage />} />}
            {isAdmin && <Route path="/add-food" exact element={<AddFood />} />}
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
          <Footer />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
