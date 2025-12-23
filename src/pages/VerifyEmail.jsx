import React, { useState } from "react";
import axios from "axios";
import { useApp } from "../context/AppContext";

export default function VerifyEmail({ userId }) {
  const { setRoute, flashMsg } = useApp();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      setError("Enter OTP sent to your email.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("http://localhost:5000/api/auth/verify", {
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

  const handleResend = async () => {
    try {
      setResending(true);
      setError("");

      await axios.post("http://localhost:5000/api/auth/resend-otp", {
        userId,
      });

      flashMsg("OTP resent to your email!");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
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
        className="border rounded w-full px-3 py-2 mt-1 mb-3 text-center tracking-widest"
        placeholder="e.g. 482013"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
      />

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Email"}
      </button>

      <p className="text-center text-sm mt-4">
        Didn't get OTP?{" "}
        <button
          className="text-pink-600 underline disabled:opacity-50"
          disabled={resending}
          onClick={handleResend}
        >
          {resending ? "Sending..." : "Resend"}
        </button>
      </p>
    </div>
  );
}
