import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// ponytail: replace with your real Stripe publishable key
const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY')

const cardStyle = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1c1917',
      fontFamily: "'Inter', sans-serif",
      '::placeholder': { color: '#a8a29e' },
    },
    invalid: { color: '#dc2626' },
  },
}

function CheckoutForm({ booking }) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError(null)

    // ponytail: in production, create a PaymentIntent on your backend
    // and use clientSecret here. This demo uses createToken as a placeholder.
    const { error: stripeError, token } = await stripe.createToken(elements.getElement(CardElement))

    if (stripeError) {
      setError(stripeError.message)
      setProcessing(false)
    } else {
      // In production: send token.id to your backend to complete payment
      console.log('Payment token:', token.id)
      setSuccess(true)
      setProcessing(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-stone-900 font-semibold mb-3">Booking Confirmed!</h2>
        <p className="text-stone-500 mb-2">
          Thank you, {booking.customerName}. You&apos;re booked for <strong>{booking.name}</strong>.
        </p>
        <p className="text-stone-400 text-sm mb-8">A confirmation has been sent to {booking.customerEmail}.</p>
        <Link
          to="/"
          className="inline-block bg-sage-700 text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-sage-800 transition-colors duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-3">Card Details</label>
        <div className="px-4 py-4 rounded-xl border border-stone-200 bg-white">
          <CardElement options={cardStyle} />
        </div>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-sage-700 text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-sage-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${booking.price}`}
      </button>
      <p className="text-stone-400 text-xs text-center">
        Payments are securely processed by Stripe. We never store your card details.
      </p>
    </form>
  )
}

export default function Payments({ booking }) {
  if (!booking) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-20 px-6 text-center"
      >
        <h1 className="font-serif text-3xl text-stone-900 mb-4">No Booking Selected</h1>
        <p className="text-stone-500 mb-8">Please select a class first.</p>
        <Link
          to="/booking"
          className="inline-block bg-sage-700 text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-sage-800 transition-colors"
        >
          Browse Classes
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-sage-50 to-white">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <p className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-4">Checkout</p>
            <h1 className="font-serif text-4xl md:text-5xl text-stone-900 font-semibold">Complete Payment</h1>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-8"
          >
            <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-4">Order Summary</h3>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-stone-900 font-medium">{booking.name}</p>
                <p className="text-stone-500 text-sm">{booking.instructor} &middot; {booking.time} &middot; {booking.duration}</p>
              </div>
              <p className="text-stone-900 font-semibold text-lg">${booking.price}</p>
            </div>
            <div className="border-t border-stone-100 pt-3 mt-3 flex justify-between">
              <span className="text-stone-500 text-sm">Booked by</span>
              <span className="text-stone-700 text-sm">{booking.customerName}</span>
            </div>
          </motion.div>

          {/* Stripe Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Elements stripe={stripePromise}>
              <CheckoutForm booking={booking} />
            </Elements>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
