import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'
import { BOOKING_URL } from '../lib/booking'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, profile, isAdmin, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brown-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="River House Studio" className="h-11 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {publicLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                pathname === to ? 'text-brown-300' : 'text-brown-100 hover:text-brown-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide uppercase transition-colors duration-200 text-brown-100 hover:text-brown-50"
          >
            Book a Class
          </a>
          {isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                pathname === '/admin' ? 'text-brown-300' : 'text-brown-100 hover:text-brown-50'
              }`}
            >
              Admin
            </Link>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <Avatar name={profile?.full_name} avatarUrl={profile?.avatar_url} />
              <button
                onClick={handleSignOut}
                className="text-sm font-medium tracking-wide uppercase text-brown-100 hover:text-brown-50 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brown-50 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brown-50 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brown-50 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-brown-900/95 backdrop-blur-md border-t border-brown-800"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {publicLinks.map(({ to, label }) => (
              <Link
                key={to} to={to} onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium tracking-wide uppercase ${pathname === to ? 'text-brown-300' : 'text-brown-100'}`}
              >
                {label}
              </Link>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-wide uppercase text-brown-100"
            >
              Book a Class
            </a>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-sm font-medium tracking-wide uppercase text-brown-100">
                Admin
              </Link>
            )}
            {user && (
              <div className="flex items-center gap-3">
                <Avatar name={profile?.full_name} avatarUrl={profile?.avatar_url} />
                <button onClick={handleSignOut} className="text-sm font-medium tracking-wide uppercase text-brown-100 text-left">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
