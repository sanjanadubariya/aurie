import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function CheckoutAddress() {
  const { cart, setRoute, placeOrder, user } = useApp();

  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">You're not logged in</h2>
        <button
          onClick={() => setRoute("account")}
          className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-full"
        >
          Login to continue
        </button>
      </div>
    );
  }

  const handleContinue = () => {
    if (!fullName || !phone || !pincode || !address) {
      alert("Please fill all fields");
      return;
    }

    const shipping = { fullName, phone, pincode, address };
    localStorage.setItem("aurie_checkout_shipping", JSON.stringify(shipping));

    setRoute("transaction");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>

      <label className="block text-sm font-medium">Full Name</label>
      <input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      />

      <label className="block text-sm font-medium">Phone Number</label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      />

      <label className="block text-sm font-medium">Pincode</label>
      <input
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      />

      <label className="block text-sm font-medium">Full Address</label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-3"
      />

      <button
        onClick={handleContinue}
        className="mt-4 w-full bg-pink-500 text-white py-2 rounded-full"
      >
        Continue to Payment
      </button>

      <button
        onClick={() => setRoute("cart")}
        className="mt-3 w-full border py-2 rounded-full"
      >
        Back to Cart
      </button>
    </div>
  );
}
