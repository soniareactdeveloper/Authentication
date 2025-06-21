import { Route, Routes } from 'react-router'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'
import ForgetPass from './Pages/ForgetPass'
import Otp from './Pages/Otp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="/otp" element={<Otp />} />
        <Route path = "*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
