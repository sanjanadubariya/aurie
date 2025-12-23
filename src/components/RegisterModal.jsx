import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function RegisterModal({ close, openVerify }) {
  const { handleRegister } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    
    setLoading(true);
    const result = await handleRegister(name, email, password, phone);
    setLoading(false);
    
    if (result.success) {
      if (openVerify) {
        openVerify(result.userId);
      }
      close();
    } else {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-xl font-semibold mb-4">Create Account</h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <input 
          value={name}
          onChange={(e)=>setName(e.target.value)} 
          placeholder="Full name"
          className="border rounded w-full px-3 py-2 mb-2" 
        />

        <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)} 
          placeholder="Email"
          type="email"
          className="border rounded w-full px-3 py-2 mb-2" 
        />

        <input 
          value={phone}
          onChange={(e)=>setPhone(e.target.value)} 
          placeholder="Phone number (optional)"
          type="tel"
          className="border rounded w-full px-3 py-2 mb-2" 
        />

        <input 
          type="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password" 
          className="border rounded w-full px-3 py-2 mb-2" 
        />

        <button 
          onClick={submit}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <button onClick={close} className="mt-2 text-sm w-full text-center text-gray-500">Cancel</button>
      </div>
    </div>
  );
}
