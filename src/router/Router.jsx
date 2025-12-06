import React from "react";
import { useApp } from "../context/AppContext";

import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import TransactionPage from "../pages/TransactionPage";
import AccountPage from "../pages/AccountPage";
import Personalized from "../pages/Personalized";
import About from "../pages/About";
import SearchResults from "../pages/SearchResults";
import ProductDetail from "../pages/ProductDetail";
import CategoryPage from "../pages/CategoryPage";
import OrderTrack from "../pages/OrderTrack";
import CheckoutAddress from "../pages/CheckoutAddress";
import Signup from "../pages/Signup";
import VerifyEmail from "../pages/VerifyEmail";


export default function Router() {
  const { route } = useApp();

  if (route.startsWith("product:"))
    return <ProductDetail id={route.split(":")[1]} />;

  if (route.startsWith("category:"))
    return <CategoryPage cat={route.split(":")[1]} />;

  if (route.startsWith("order:"))
    return <OrderTrack id={route.split(":")[1]} />;

  if (route.startsWith("search:"))
    return <SearchResults q={route.split(":")[1]} />;
  if (route === "checkout")
    return <CheckoutAddress />;
  if (route.startsWith("verify:")) {
  const userId = route.split(":")[1];
  return <VerifyEmail userId={userId} />;
  
}

  if (route === "signup")
    return <Signup />;

  const pages = {
    home: <Home />,
    cart: <CartPage />,
    transaction: <TransactionPage />,
    account: <AccountPage />,
    personalized: <Personalized />,
    about: <About />

  };

  return pages[route] || <Home />;
}
