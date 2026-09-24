import { Link } from 'react-router-dom'
import { BOOKING_URL } from '../lib/booking'

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-brown-50/80 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-sans text-2xl text-brown-50 mb-4">The River House Studio</h3>
          <p className="text-sm leading-relaxed">
            Find your balance. Transform your practice. Build strength and flexibility through mindful movement.
          </p>
        </div>
        <div>
          <h4 className="text-brown-50 font-medium mb-4 text-sm uppercase tracking-wider">Navigate</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm hover:text-brown-50 transition-colors">Home</Link>
            <Link to="/about" className="text-sm hover:text-brown-50 transition-colors">About</Link>
            <Link to="/events" className="text-sm hover:text-brown-50 transition-colors">Events</Link>
            <Link to="/faq" className="text-sm hover:text-brown-50 transition-colors">FAQ</Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brown-50 transition-colors">Book a Class</a>
          </div>
        </div>
        <div>
          <h4 className="text-brown-50 font-medium mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-2 text-sm">
            <p>hello.riverhousestudio@gmail.com</p>
            <p>Barking Riverside</p>
            <p>Tue & Thu: 6:30pm - 8:30pm</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-brown-50/10 text-center text-xs text-brown-50/60">
        &copy; {new Date().getFullYear()} The River House Studio. All rights reserved.
      </div>
    </footer>
  )
}
