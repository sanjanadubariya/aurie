import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function RegisterModal({ close }) {
  const { handleRegister } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await handleRegister(name, email, password);
    close();
    alert("Check your email for OTP!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h2 className="text-xl font-semibold mb-4">Create Account</h2>

        <input onChange={(e)=>setName(e.target.value)} placeholder="Full name"
          className="border rounded w-full px-3 py-2 mb-2" />

        <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"
          className="border rounded w-full px-3 py-2 mb-2" />

        <input type="password" onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password" className="border rounded w-full px-3 py-2 mb-2" />

        <button onClick={submit}
          className="w-full bg-pink-500 text-white py-2 rounded-full">
          Register
        </button>

        <button onClick={close} className="mt-2 text-sm">Cancel</button>
      </div>
    </div>
  );
}
