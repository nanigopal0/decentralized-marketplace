import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/mainpages/login";
import Register from "./pages/mainpages/Register";
import { ToastContainer } from "react-toastify";
import AllProduct from "./pages/sellerPages/AllProduct";
import AddProduct from "./pages/sellerPages/AddProduct";
import SingleProduct from "./pages/buyerPages/SingleProduct";
import Payment from "./pages/buyerPages/Payment";
import SellerDashboard from "./pages/sellerPages/SellerDashboard";
import SellerOrders from "./pages/sellerPages/SellerOrders";
import UpdateProduct from "./pages/sellerPages/UpdateProduct";
import UpdateUser from "./pages/mainpages/UpdateUser";
import Home from "./pages/buyerPages/Home";
import MyOrders from "./pages/buyerPages/MyOrders";
import PlaceOrder from "./pages/buyerPages/PlaceOrder";
import LandingPage from "./pages/mainpages/LandingPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { pingServer } from "../store/slices/userSlice";
import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";
import ProfileView from "./pages/buyerPages/ProfileView";
import ConfirmDelivery from "./pages/buyerPages/ConfirmDelivery";
import OrderDetails from "./pages/buyerPages/OrderDetails";
import CancelOrder from "./pages/buyerPages/cancelOrder";
import TermsOfUse from "./pages/layout/Termsofuse";
import PrivacyPolicy from "./pages/layout/PrivacyPolicy";
import SecurityPolicy from "./pages/layout/SecurityPolicy";
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(pingServer());
  // }, [dispatch]); //Make it uncomment while push

  return (
    <>
      <Navbar />
      <Routes>
        {isAuthenticated ? (
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
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/confirmDelivery" element={<ConfirmDelivery />} />
            <Route path="/orderDetails" element={<OrderDetails />} />
            <Route path="/cancelOrder" element={<CancelOrder />} />
            <Route path="/termsOfUse" element={<TermsOfUse />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/securityPolicy" element={<SecurityPolicy />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </>
  );
}

export default App;
