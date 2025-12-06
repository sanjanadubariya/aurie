import React from "react";
import { useApp } from "../context/AppContext";
import { currency, isWinter } from "../data/helpers";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, setRoute } = useApp();

  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = isWinter() ? subtotal * 0.25 : 0;
  const total = Math.round(subtotal - discount + (cart.length ? 50 : 0));

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold">Your Cart</h2>

      {cart.length === 0 && <p className="mt-4">Cart is empty.</p>}

      <div className="mt-4 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cart.map(it => (
            <div
              key={it.id}
              className="flex items-center gap-4 border-b py-4"
            >
              <img
                src={it.images[0]}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <div className="font-semibold">{it.title}</div>
                <div className="text-gray-500 text-sm">
                  {currency(it.price)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(it.id, it.qty - 1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>

                <div>{it.qty}</div>

                <button
                  onClick={() => updateQty(it.id, it.qty + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(it.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* PRICE CARD */}
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

            <button
              onClick={() => setRoute("transaction")}
              className="mt-4 w-full px-4 py-2 bg-pink-500 text-white rounded-full"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
