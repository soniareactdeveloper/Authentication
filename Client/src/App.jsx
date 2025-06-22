import { Route, Routes } from 'react-router'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'
import ForgetPass from './Pages/ForgetPass'
import Otp from './Pages/Otp'
import ResetPass from './Components/ResetPass'
import Profile from './Components/Profile'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="/reset-password/:randomString" element={<ResetPass />} />
        <Route path="/otp/:email" element={<Otp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path = "*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
