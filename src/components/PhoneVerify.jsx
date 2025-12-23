import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function PhoneVerify({ phone, close, onVerified }) {
  const { handleSendPhoneOTP, handleVerifyPhoneOTP } = useApp();
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    
    setError("");
    setSending(true);
    const result = await handleSendPhoneOTP(phoneNumber);
    setSending(false);
    
    if (result.success) {
      setOtpSent(true);
    } else {
      setError(result.error || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setError("");
    setLoading(true);
    const result = await handleVerifyPhoneOTP(phoneNumber, otp);
    setLoading(false);
    
    if (result.success) {
      if (onVerified) onVerified();
      close();
    } else {
      setError(result.error || "Verification failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-lg font-semibold">Verify Phone Number</h2>
        
        {!otpSent ? (
          <>
            <p className="text-sm text-gray-600 mb-3">
              Enter your phone number to receive verification OTP
            </p>

            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

            <div className="flex gap-2 mb-2">
              <span className="border rounded px-3 py-2 bg-gray-50 text-gray-600">+91</span>
              <input 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="Phone number" 
                maxLength={10}
                className="border rounded flex-1 px-3 py-2" 
              />
            </div>

            <button 
              onClick={sendOtp}
              disabled={sending}
              className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 disabled:opacity-50"
            >
              {sending ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-3">
              Enter the OTP sent to +91 {phoneNumber}
            </p>

            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

            <input 
              value={otp} 
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="6-digit OTP" 
              maxLength={6}
              className="border rounded w-full px-3 py-2 mb-2 text-center tracking-widest" 
            />

            <button 
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Phone"}
            </button>

            <p className="text-center text-sm mt-3 text-gray-600">
              Didn't receive OTP?{" "}
              <button 
                onClick={() => { setOtpSent(false); setOtp(""); }}
                className="text-pink-600 underline"
              >
                Change number
              </button>
              {" or "}
              <button 
                onClick={sendOtp}
                disabled={sending}
                className="text-pink-600 underline disabled:opacity-50"
              >
                {sending ? "Sending..." : "Resend"}
              </button>
            </p>
          </>
        )}

        <button onClick={close} className="mt-3 text-sm w-full text-center text-gray-500">Cancel</button>
      </div>
    </div>
  );
}
