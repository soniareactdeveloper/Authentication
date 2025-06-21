import axios from 'axios';

const api = axios.create({
  baseURL :`${import.meta.env.VITE_BASE_URL}/api/v1`,
  headers :{
    "Content-Type" : "application/json"
  }
})

export const authService = {
  register : async (userData) => {
    const res = await api.post("/auth/register", userData)
    return res.data
  },
  otp : async (email, otp) => {
    const res = await api.post("/auth/verifyemail", email, otp)
    return res.data
  },
  resendOtp : async (email) => {
    const res = await api.post("/auth/resend-otp", email)
    return res.data
  },
  login : async (userData) => {
    const res = await api.post("/auth/login", userData)
    if(res.data.accessToken){
      localStorage.setItem("token", res.data.accessToken)
      localStorage.setItem("user", JSON.stringify(res.data.user))
    }
    return res.data
  }
}