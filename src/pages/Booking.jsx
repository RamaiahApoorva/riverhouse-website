import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Booking({ onBook }) {
  const [classes, setClasses] = useState([])
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('classes').select('*').eq('active', true).order('created_at').then(({ data }) => {
      setClasses(data || [])
    })
  }, [])

  // Pre-fill from profile
  useEffect(() => {
    if (profile?.full_name) setName(profile.full_name)
    if (user?.email) setEmail(user.email)
  }, [profile, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    const cls = classes.find((c) => c.id === selected)
    // Create booking in DB
    await supabase.from('bookings').insert({
      user_id: user.id,
      class_id: cls.id,
      customer_name: name,
      customer_email: email,
    })
    onBook({ ...cls, customerName: name, customerEmail: email })
    navigate('/payments')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-sage-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-4"
          >
            Schedule
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-serif text-5xl md:text-6xl text-stone-900 font-semibold mb-4"
          >
            Book a Class
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-stone-500 text-lg"
          >
            Choose a class and reserve your spot in the studio.
          </motion.p>
        </div>
      </section>

      {/* Login prompt if not authenticated */}
      {!user && (
        <div className="px-6 pb-4">
          <div className="max-w-4xl mx-auto bg-sage-50 rounded-xl p-4 text-center">
            <p className="text-stone-600 text-sm">
              You need to <Link to="/login" className="text-sage-700 font-medium hover:underline">sign in</Link> or{' '}
              <Link to="/signup" className="text-sage-700 font-medium hover:underline">create an account</Link> to book a class.
            </p>
          </div>
        </div>
      )}

      {/* Class Selection */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-2xl text-stone-900 mb-8">Select a Class</h2>
          </AnimatedSection>

          <div className="grid gap-4">
            {classes.map((c, i) => (
              <AnimatedSection key={c.id} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                    selected === c.id
                      ? 'border-sage-600 bg-sage-50 shadow-md'
                      : 'border-stone-100 hover:border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-stone-900 font-medium text-lg">{c.name}</h3>
                      <p className="text-stone-500 text-sm mt-1">
                        {c.instructor} &middot; {c.time} &middot; {c.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-sage-600 bg-sage-100 px-3 py-1 rounded-full">
                        {c.level}
                      </span>
                      <span className="text-stone-900 font-semibold text-lg">${c.price}</span>
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      {selected && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-12 px-6 bg-stone-50"
        >
          <div className="max-w-lg mx-auto">
            <h2 className="font-serif text-2xl text-stone-900 mb-6">Your Details</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                <input
                  id="name" type="text" required value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                <input
                  id="email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                  placeholder="you@email.com"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-sage-700 text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-sage-800 transition-colors duration-300"
              >
                {user ? 'Continue to Payment' : 'Sign In to Book'}
              </button>
            </form>
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}
