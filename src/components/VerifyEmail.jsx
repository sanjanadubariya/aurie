import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function VerifyEmail({ email, userId, close }) {
  const { handleVerifyOtp, handleResendEmailOTP, pendingUserId } = useApp();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);

  const effectiveUserId = userId || pendingUserId;

  const submit = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    
    setError("");
    setLoading(true);
    const result = await handleVerifyOtp(effectiveUserId, otp);
    setLoading(false);
    
    if (result.success) {
      close();
    } else {
      setError(result.error || "Verification failed");
    }
  };

  const resendOtp = async () => {
    setResending(true);
    await handleResendEmailOTP(effectiveUserId);
    setResending(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-lg font-semibold">Verify Email</h2>
        <p className="text-sm text-gray-600 mb-3">
          Enter the OTP sent to {email || "your email"}
        </p>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <input 
          value={otp} 
          onChange={(e)=>setOtp(e.target.value)}
          placeholder="6-digit OTP" 
          maxLength={6}
          className="border rounded w-full px-3 py-2 mb-2 text-center tracking-widest" 
        />

        <button 
          onClick={submit}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="text-center text-sm mt-3 text-gray-600">
          Didn't receive OTP?{" "}
          <button 
            onClick={resendOtp}
            disabled={resending}
            className="text-pink-600 underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend"}
          </button>
        </p>

        <button onClick={close} className="mt-2 text-sm w-full text-center text-gray-500">Cancel</button>
      </div>
    </div>
  );
}
