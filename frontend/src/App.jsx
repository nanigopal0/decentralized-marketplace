import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/mainpages/login";
import Register from "./pages/mainpages/Register";
import { ToastContainer } from "react-toastify";
import AllProduct from "./pages/sellerPages/AllProduct";
import AddProduct from "./pages/sellerPages/AddProduct";
import SingleProduct from "./pages/buyerPages/SingleProduct";
import Payment from "./pages/buyerPages/Payment";
import SellerDashboard from "./pages/sellerPages/SellerDashboard";
import PlaecOrder from "./pages/buyerPages/PlaecOrder";
import Orders from "./pages/sellerPages/Orders";
import UpdateProduct from "./pages/sellerPages/UpdateProduct";
import UpdateUser from "./pages/mainpages/UpdateUser";
import Home from "./pages/buyerPages/Home";
import MyOrders from "./pages/buyerPages/MyOrders";
import LandingPage from "./pages/mainpages/LandingPage";
import {isAuthenticated} from "./store/slices/userSlice";


function App() {


  console.log(isAuthenticated);

  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/all" element={<AllProduct />} />
          <Route path="/order/product/:id" element={<PlaecOrder />} />
          <Route path="/orders/all" element={<Orders />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />
          <Route path="/myorders/all" element={<MyOrders />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="light" />
      </Router>
    </>
  );
}

export default App;
