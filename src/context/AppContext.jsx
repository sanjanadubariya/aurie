import React, { createContext, useContext, useState, useEffect } from "react";
import { uid, LS, isWinter } from "../data/helpers";
import { SEEDED } from "../data/products";
import { signupUser, loginUser, verifyOTP, sendPhoneOTP, verifyPhoneOTP, resendEmailOTP } from "../api/auth";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [products] = useState(LS.get("aurie_products", SEEDED));
  const [cart, setCart] = useState(LS.get("aurie_cart", []));
  const [user, setUser] = useState(LS.get("aurie_user", null));
  const [orders, setOrders] = useState(LS.get("aurie_orders", []));
  const [route, setRoute] = useState("home");
  const [flash, setFlash] = useState(null);
  const [favorites, setFavorites] = useState(LS.get("aurie_favorites", []));

  useEffect(() => LS.set("aurie_cart", cart), [cart]);
  useEffect(() => LS.set("aurie_user", user), [user]);
  useEffect(() => LS.set("aurie_orders", orders), [orders]);

  function flashMsg(t) {
    setFlash(t);
    setTimeout(() => setFlash(null), 1500);
  }

  const addToCart = p => {
    setCart(c => {
      const existing = c.find(x => x.id === p.id);
      if (existing)
        return c.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...p, qty: 1 }];
    });
    flashMsg("Added to cart");
  };

  const updateQty = (id, qty) =>
    setCart(c =>
      c.map(i => i.id === id ? { ...i, qty } : i)
       .filter(i => i.qty > 0)
    );

  const removeFromCart = id => setCart(c => c.filter(i => i.id !== id));
  const clearCart = () => setCart([]);

  const toggleFav = id => {
    setFavorites(f => {
      const next = f.includes(id) ? f.filter(x => x !== id) : [...f, id];
      LS.set("aurie_favorites", next);
      return next;
    });
  };

  async function mockPayment() {
    return new Promise(res => setTimeout(() =>
      res({ success: true, txId: uid("tx_") }), 700));
  }

  async function placeOrder({ method, shippingAddress }) {
    if (!user) throw new Error("Login required");
    if (cart.length === 0) throw new Error("Cart empty");

    const pay = await mockPayment();

    const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
    const discount = isWinter() ? subtotal * 0.25 : 0;
    const shipping = cart.length ? 50 : 0;
    const total = Math.round(subtotal - discount + shipping);

    const order = {
      id: uid("ord_"),
      items: cart,
      subtotal, discount, shipping, total,
      userId: user.id,
      paymentMethod: method,
      paymentStatus: pay.success ? "paid" : "failed",
      status: pay.success ? "Order Placed" : "Failed",
      trackingId: uid("trk_"),
      createdAt: new Date().toISOString(),
      shippingAddress
    };

    setOrders(o => [order, ...o]);
    clearCart();
    flashMsg("Order placed");
    setRoute("order:" + order.id);
  }

  // ---------------- AUTH FUNCTIONS ----------------
  const [pendingUserId, setPendingUserId] = useState(null);

  async function handleRegister(name, email, password, phone) {
    try {
      const data = await signupUser(name, email, password, phone);
      setPendingUserId(data.userId);
      flashMsg("Check your email for OTP!");
      return { success: true, userId: data.userId };
    } catch (err) {
      flashMsg(err.response?.data?.message || "Signup failed");
      return { success: false, error: err.response?.data?.message || "Signup failed" };
    }
  }

  async function handleLogin(email, password) {
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        setUser({ ...data.user, token: data.token });
        flashMsg("Login successful!");
        return { success: true };
      }
      // If email/phone not verified yet
      if (data.userId) {
        setPendingUserId(data.userId);
        return { success: false, verify: true, userId: data.userId };
      }
      return { success: true };
    } catch (err) {
      flashMsg(err.response?.data?.message || "Login failed");
      return { success: false, error: err.response?.data?.message || "Login failed" };
    }
  }

  async function handleVerifyOtp(userId, otp) {
    try {
      await verifyOTP(userId || pendingUserId, otp);
      flashMsg("Email verified successfully!");
      setPendingUserId(null);
      return { success: true };
    } catch (err) {
      flashMsg(err.response?.data?.message || "Verification failed");
      return { success: false, error: err.response?.data?.message || "Verification failed" };
    }
  }

  async function handleSendPhoneOTP(phone) {
    try {
      await sendPhoneOTP(phone);
      flashMsg("OTP sent to your phone!");
      return { success: true };
    } catch (err) {
      flashMsg(err.response?.data?.message || "Failed to send OTP");
      return { success: false, error: err.response?.data?.message || "Failed to send OTP" };
    }
  }

  async function handleVerifyPhoneOTP(phone, otp) {
    try {
      await verifyPhoneOTP(phone, otp);
      flashMsg("Phone verified successfully!");
      return { success: true };
    } catch (err) {
      flashMsg(err.response?.data?.message || "Phone verification failed");
      return { success: false, error: err.response?.data?.message || "Phone verification failed" };
    }
  }

  async function handleResendEmailOTP(userId) {
    try {
      await resendEmailOTP(userId || pendingUserId);
      flashMsg("OTP resent to your email!");
      return { success: true };
    } catch (err) {
      flashMsg(err.response?.data?.message || "Failed to resend OTP");
      return { success: false, error: err.response?.data?.message || "Failed to resend OTP" };
    }
  }

  function logout() {
    setUser(null);
    LS.set("aurie_user", null);
    flashMsg("Logged out successfully");
  }

  return (
    <AppContext.Provider value={{
      products, cart, user, orders, favorites,
      addToCart, updateQty, removeFromCart, clearCart,
      toggleFav, placeOrder, setUser, setRoute, route, flash, flashMsg,
      handleRegister, handleLogin, handleVerifyOtp,
      handleSendPhoneOTP, handleVerifyPhoneOTP, handleResendEmailOTP,
      pendingUserId, logout
    }}>
      {children}
    </AppContext.Provider>
  );
}
