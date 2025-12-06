import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// ---------------- SIGNUP ----------------
export const signupUser = async (name, email, password) => {
  const { data } = await API.post("/signup", {
    name,
    email,
    password,
  });
  return data; // { msg, userId }
};

// ---------------- VERIFY OTP ----------------
export const verifyOTP = async (userId, otp) => {
  const { data } = await API.post("/verify", { userId, otp });
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
