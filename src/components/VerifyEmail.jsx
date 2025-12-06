import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function VerifyEmail({ email, close }) {
  const { handleVerifyOtp } = useApp();
  const [otp, setOtp] = useState("");

  const submit = async () => {
    await handleVerifyOtp(email, otp);
    close();
    alert("Email verified!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-lg font-semibold">Verify Email</h2>
        <p className="text-sm text-gray-600 mb-3">
          Enter the OTP sent to {email}
        </p>

        <input value={otp} onChange={(e)=>setOtp(e.target.value)}
          placeholder="6-digit OTP" className="border rounded w-full px-3 py-2 mb-2" />

        <button onClick={submit}
          className="w-full bg-purple-600 text-white py-2 rounded-full">
          Verify
        </button>

        <button onClick={close} className="mt-2 text-sm">Cancel</button>
      </div>
    </div>
  );
}
