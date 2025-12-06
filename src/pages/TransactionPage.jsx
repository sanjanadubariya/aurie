import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { currency, isWinter } from "../data/helpers";

export default function TransactionPage() {
  const { cart, placeOrder, setRoute, user } = useApp();

  const [method, setMethod] = useState("COD");
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState("");

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = isWinter() ? subtotal * 0.25 : 0;
  const total = Math.round(subtotal - discount + (cart.length ? 50 : 0));

  async function handlePlace() {
    try {
      await placeOrder({ method, shippingAddress: { name, address } });
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold">Payment</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="text-sm">Full Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
          />

          <label className="text-sm">Address</label>
          <textarea
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
          />

          <label className="font-semibold">Payment Method</label>
          <div className="mt-2 space-y-2">
            <label>
              <input
                type="radio"
                checked={method === "COD"}
                onChange={() => setMethod("COD")}
              />{" "}
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                checked={method === "UPI"}
                onChange={() => setMethod("UPI")}
              />{" "}
              UPI
            </label>

            <label>
              <input
                type="radio"
                checked={method === "CARD"}
                onChange={() => setMethod("CARD")}
              />{" "}
              Card (mock)
            </label>
          </div>

          {method === "CARD" && (
            <div className="mt-4">
              <input
                placeholder="Card number"
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <div className="flex gap-2">
                <input
                  placeholder="MM/YY"
                  className="w-1/2 border rounded px-3 py-2"
                />
                <input
                  placeholder="CVV"
                  className="w-1/2 border rounded px-3 py-2"
                />
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handlePlace}
              className="px-4 py-2 bg-pink-500 text-white rounded-full"
            >
              Place Order
            </button>

            <button
              onClick={() => setRoute("cart")}
              className="px-4 py-2 border rounded-full"
            >
              Back
            </button>
          </div>
        </div>

        <div>
          <div className="p-4 border rounded-xl">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency(subtotal)}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Winter Discount</span>
              <span>-{currency(discount)}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Shipping</span>
              <span>{currency(cart.length ? 50 : 0)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>{currency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
