import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Booking from './pages/Booking'
import Payments from './pages/Payments'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'

function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sage-300 border-t-sage-700 rounded-full animate-spin" />
      </div>
    )
  }
  if (!user || !isAdmin) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  const [booking, setBooking] = useState(null)
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-50">
        <div className="w-10 h-10 border-2 border-sage-300 border-t-sage-700 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking onBook={setBooking} />} />
          <Route path="/payments" element={<Payments booking={booking} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
