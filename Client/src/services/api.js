import axios from 'axios';


const api = axios.create({
  baseURL :`${import.meta.env.VITE_BASE_URL}/api/v1`,
  headers :{
    "Content-Type" : "application/json"
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {        
    return Promise.reject(err);
  }
);

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
  },
  forgetPassword : async (email) => {
    const res = await api.post("/auth/forget-password", email)
    return res.data
  },
  passwordReset: async (randomString, email, newPass) => {
    const res = await api.post(`/auth/reset-password/${randomString}?email=${email}`, {
      newPass
    });
    console.log(res.data);
    return res.data;
  },
  updateUser: async (fullname, password, avatar) => {
    const res = await api.post(
      "/auth/update-user",
      { fullname, password, avatar },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  },


}