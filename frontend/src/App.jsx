import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";
import Login from "./pages/mainpages/login";
import Register from "./pages/mainpages/Register";
import { ToastContainer } from "react-toastify";
import AllProduct from "./pages/sellerPages/AllProduct";
import AddProduct from "./pages/sellerPages/AddProduct";
import SingleProduct from "./pages/buyerPages/SingleProduct";
import Payment from "./pages/buyerPages/Payment";
import SellerDashboard from "./pages/sellerPages/SellerDashboard";
import PlaceOrder from "./pages/buyerPages/PlaceOrder";
import SellerOrders from "./pages/sellerPages/SellerOrders";
import UpdateProduct from "./pages/sellerPages/UpdateProduct";
import UpdateUser from "./pages/mainpages/UpdateUser";
import Home from "./pages/buyerPages/Home";
import MyOrders from "./pages/buyerPages/MyOrders";
import LandingPage from "./pages/mainpages/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { loadUser } from "../store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);

  // useEffect( () => {
  //   dispatch(loadUser());
  // }, [dispatch]);

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          {/* Redirect to /home if authenticated, otherwise to /login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Public Routes */}
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          {/* Protected Routes */}
          {isAuthenticated && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/all" element={<AllProduct />} />
              <Route path="/order/product/:id" element={<PlaceOrder />} />
              <Route path="/orders/all" element={<SellerOrders />} />
              <Route path="/product/update/:id" element={<UpdateProduct />} />
              <Route path="/user/update/:id" element={<UpdateUser />} />
              <Route path="/myorders/all" element={<MyOrders />} />
            </>
          )}
          {/* Catch-All Route */}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <ToastContainer position="bottom-right" theme="light" />
      </Router>
      <Footer />
    </>
  );
}

export default App;
