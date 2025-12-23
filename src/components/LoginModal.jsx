import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function LoginModal({ close, openVerify, openRegister }) {
  const { handleLogin } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    
    setLoading(true);
    const res = await handleLogin(email, password);
    setLoading(false);
    
    if (res.verify && openVerify) {
      openVerify(res.userId);
      close();
    } else if (res.success) {
      close();
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <input 
          value={email}
          onChange={(e)=>setEmail(e.target.value)} 
          placeholder="Email"
          type="email"
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-3 text-gray-600">
          Don't have an account?{" "}
          <button 
            onClick={() => { 
              close(); 
              if (openRegister) openRegister(); 
            }}
            className="text-pink-600 underline"
          >
            Register
          </button>
        </p>

        <button onClick={close} className="mt-2 text-sm w-full text-center text-gray-500">Cancel</button>
      </div>
    </div>
  );
}
