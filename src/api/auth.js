import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// ---------------- SIGNUP ----------------
export const signupUser = async (name, email, password, phone) => {
  const { data } = await API.post("/signup", {
    name,
    email,
    password,
    phone,
  });
  return data; // { msg, userId }
};

// ---------------- VERIFY EMAIL OTP ----------------
export const verifyOTP = async (userId, otp) => {
  const { data } = await API.post("/verify", { userId, otp });
  return data; // { msg }
};

// ---------------- RESEND EMAIL OTP ----------------
export const resendEmailOTP = async (userId) => {
  const { data } = await API.post("/resend-otp", { userId });
  return data; // { msg }
};

// ---------------- LOGIN ----------------
export const loginUser = async (email, password) => {
  const { data } = await API.post("/login", {
    email,
    password,
  });
  return data; // { msg, token, user }
};

// ---------------- SEND PHONE OTP ----------------
export const sendPhoneOTP = async (phone) => {
  const { data } = await API.post("/send-phone-otp", { phone });
  return data; // { msg }
};

// ---------------- VERIFY PHONE OTP ----------------
export const verifyPhoneOTP = async (phone, otp) => {
  const { data } = await API.post("/verify-phone", { phone, otp });
  return data; // { msg }
};
