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
import { useEffect, useState } from "react";
import { pingServer } from "../store/slices/userSlice";
import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";
import ProfileView from "./pages/buyerPages/ProfileView";
import ConfirmDelivery from "./pages/buyerPages/ConfirmDelivery";
import OrderDetails from "./pages/sellerPages/OrderDetails";
import ProductDetails from "./pages/sellerPages/ProductDetails";
import BlockchainOrderDetails from "./pages/buyerPages/BlockchainOrderDetails";
import BuyerOrderDetails from "./pages/buyerPages/BuyerOrderDetails";
import SearchResults from "./pages/mainpages/SearchResults";
import Sidebar from "./pages/layout/Sidebar";
import TermsOfUse from "./pages/layout/TermsOfUse";
import PrivacyPolicy from "./pages/layout/PrivacyPolicy";
import SecurityPolicy from "./pages/layout/SecurityPolicy";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = isAuthenticated ? user && user.role == "SELLER" : false;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(pingServer());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <header className="bg-white shadow-md">
          <Navbar isOpen={isOpen} onSidebarToggle={toggleSidebar} />
        </header>

        <main className="flex w-full min-h-screen transition-all duration-300 ease-in-out">
          {isOpen && <Sidebar isOpen={isOpen} />}
          <div className={`flex-1 transition-all duration-300 ease-in-out `}>
            <Routes>
              {isAuthenticated ? (
                <>
                  {isSeller ? (
                    <>
                      <Route
                        path="/home"
                        element={<Navigate to={"/dashboard"} />}
                      />
                      <Route path="/products" element={<AllProduct />} />
                      <Route path="/dashboard" element={<SellerDashboard />} />
                      <Route path="/product/add" element={<AddProduct />} />
                      <Route
                        path="/product/update/:id"
                        element={<UpdateProduct />}
                      />
                      <Route path="/orders" element={<SellerOrders />} />
                      <Route
                        path="/order/details/:id"
                        element={<OrderDetails />}
                      />
                      <Route
                        path="/product/details/:id"
                        element={<ProductDetails />}
                      />
                    </>
                  ) : (
                    <>
                      <Route path="/home" element={<Home />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/product/:id" element={<SingleProduct />} />
                      <Route
                        path="/order/product/:id"
                        element={<PlaceOrder />}
                      />
                      <Route path="/myorders" element={<MyOrders />} />
                      <Route
                        path="/confirm-delivery"
                        element={<ConfirmDelivery />}
                      />
                      <Route
                        path="/blockchain/orderDetails"
                        element={<BlockchainOrderDetails />}
                      />
                      <Route
                        path="/buyer/order-details/:id"
                        element={<BuyerOrderDetails />}
                      />
                    </>
                  )}
                  <Route path="/user/update/:id" element={<UpdateUser />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                  <Route path="/profile" element={<ProfileView />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<LandingPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/security-policy" element={<SecurityPolicy />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer>
          <Footer />
        </footer>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
