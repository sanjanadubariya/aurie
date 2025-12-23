import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import PhoneVerify from "../components/PhoneVerify";

export default function AccountPage() {
  const { user, logout, orders, setRoute, flashMsg } = useApp();
  const [showPhoneVerify, setShowPhoneVerify] = useState(false);

  if (!user)
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Login / Register</h2>
        <p className="text-gray-600 mb-4">Please login or create an account to continue.</p>
        
        <button
          onClick={() => setRoute("signup")}
          className="w-full px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 mb-2"
        >
          Create Account
        </button>
        
        <button
          onClick={() => setRoute("home")}
          className="w-full px-4 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-50"
        >
          Back to Home
        </button>
      </div>
    );

  const myOrders = orders.filter(o => o.userId === user.id);

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold">Hello, {user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
        
        {user.phone && (
          <p className="text-sm text-gray-600 mt-1">
            Phone: +91 {user.phone} 
            {user.phoneVerified ? (
              <span className="ml-2 text-green-600 text-xs">✓ Verified</span>
            ) : (
              <button 
                onClick={() => setShowPhoneVerify(true)}
                className="ml-2 text-pink-600 underline text-xs"
              >
                Verify Now
              </button>
            )}
          </p>
        )}
        
        {!user.phone && (
          <button 
            onClick={() => setShowPhoneVerify(true)}
            className="mt-2 text-sm text-pink-600 underline"
          >
            Add & Verify Phone Number
          </button>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={logout}
            className="px-4 py-1 border border-red-400 text-red-500 rounded-full hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">My Orders</h3>

        {myOrders.length === 0 && <p className="mt-3 text-gray-600">No orders yet.</p>}

        <div className="space-y-3 mt-3">
          {myOrders.map(o => (
            <div
              key={o.id}
              className="p-4 bg-white shadow rounded-2xl flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">Order {o.id}</div>
                <div className="text-sm text-gray-600">
                  {new Date(o.createdAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  Status: <span className="font-medium">{o.status}</span>
                </div>
              </div>

              <button
                onClick={() => setRoute("order:" + o.id)}
                className="px-3 py-1 border rounded-full hover:bg-pink-50"
              >
                Track
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Phone Verification Modal */}
      {showPhoneVerify && (
        <PhoneVerify 
          phone={user.phone || ""}
          close={() => setShowPhoneVerify(false)} 
          onVerified={() => {
            flashMsg("Phone verified successfully!");
            setShowPhoneVerify(false);
          }}
        />
      )}
    </div>
  );
}
