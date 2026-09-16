import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-2xl text-white mb-4">Serenity</h3>
          <p className="text-sm leading-relaxed">
            Find your balance. Transform your practice. Build strength and flexibility through mindful movement.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Navigate</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-sm hover:text-white transition-colors">About</Link>
            <Link to="/booking" className="text-sm hover:text-white transition-colors">Book a Class</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-2 text-sm">
            <p>hello@serenityyoga.com</p>
            <p>123 Peaceful Lane</p>
            <p>Mon - Sat: 6am - 8pm</p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
        &copy; {new Date().getFullYear()} Serenity Pilates Studio. All rights reserved.
      </div>
    </footer>
  )
}
