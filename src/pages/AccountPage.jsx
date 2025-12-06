import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AccountPage() {
  const { user, setUser, orders, setRoute } = useApp();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function createAccount() {
    const u = { id: "u_" + Date.now(), name, email };
    setUser(u);
    setRoute("account");
  }

  if (!user)
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold">Login / Register</h2>

        <input
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2 mt-3"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border rounded px-3 py-2 mt-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={createAccount}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full"
        >
          Create Account
        </button>
      </div>
    );

  const myOrders = orders.filter(o => o.userId === user.id);

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold">Hello, {user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>

        <button
          onClick={() => setUser(null)}
          className="mt-3 px-3 py-1 border rounded-full"
        >
          Logout
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">My Orders</h3>

        {myOrders.length === 0 && <p className="mt-3">No orders yet.</p>}

        <div className="space-y-3 mt-3">
          {myOrders.map(o => (
            <div
              key={o.id}
              className="p-4 bg-white shadow rounded-2xl flex justify-between"
            >
              <div>
                <div className="font-semibold">Order {o.id}</div>
                <div className="text-sm text-gray-600">
                  {new Date(o.createdAt).toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => setRoute("order:" + o.id)}
                className="px-3 py-1 border rounded-full"
              >
                Track
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
