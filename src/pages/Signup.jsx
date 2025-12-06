import React, { useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";

export default function Signup() {
  const { setRoute, flashMsg } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      flashMsg("Signup successful! Verify your email.");
      setRoute("verify:" + res.data.userId);

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Create Account</h2>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <label className="block text-sm font-medium">Full Name</label>
      <input
        type="text"
        className="border rounded w-full px-3 py-2 mt-1 mb-3"
        placeholder="Sanjana Patel"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block text-sm font-medium">Email Address</label>
      <input
        type="email"
        className="border rounded w-full px-3 py-2 mt-1 mb-3"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block text-sm font-medium">Password</label>
      <input
        type="password"
        className="border rounded w-full px-3 py-2 mt-1 mb-3"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <button
          className="text-pink-600 underline"
          onClick={() => setRoute("login")}
        >
          Login
        </button>
      </p>
    </div>
  );
}
