import React, { useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";

export default function VerifyEmail({ userId }) {
  const { setRoute, flashMsg } = useApp();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!otp) {
      setError("Enter OTP sent to your email.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/verify-email", {
        userId,
        otp,
      });

      flashMsg("Email Verified Successfully!");
      setRoute("login");

    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Verify Your Email</h2>

      <p className="text-gray-600 text-sm mb-4">
        We sent a verification OTP to your registered email.
      </p>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <label className="block text-sm font-medium">Enter OTP</label>
      <input
        type="text"
        className="border rounded w-full px-3 py-2 mt-1 mb-3"
        placeholder="e.g. 482013"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600"
      >
        {loading ? "Verifying..." : "Verify Email"}
      </button>

      <p className="text-center text-sm mt-4">
        Didn't get OTP?{" "}
        <button
          className="text-pink-600 underline"
          onClick={() => alert("Resend OTP API not connected yet")}
        >
          Resend
        </button>
      </p>
    </div>
  );
}
