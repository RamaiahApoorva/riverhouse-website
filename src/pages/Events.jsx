import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { events } from '../lib/events'

const today = new Date()
today.setHours(0, 0, 0, 0)

const upcoming = events
  .filter((e) => new Date(e.date) >= today)
  .sort((a, b) => new Date(a.date) - new Date(b.date))

const past = events
  .filter((e) => new Date(e.date) < today)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatMonthYear(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

function UpcomingCard({ event, delay }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-brown-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h3 className="font-sans text-2xl text-brown-50 mb-2">{event.name}</h3>
        <p className="text-brown-300 text-sm font-medium mb-1">{formatDate(event.date)}{event.time ? ` · ${event.time}` : ''}</p>
        <p className="text-brown-300 text-sm font-medium mb-4">{event.venue}</p>
        <p className="text-brown-200 text-sm leading-relaxed mb-6">{event.description}</p>
        <a
          href={event.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brown-700 text-white px-6 py-3 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-brown-600 transition-colors duration-300"
        >
          {event.ctaLabel}
        </a>
      </div>
    </AnimatedSection>
  )
}

function PastCard({ event, delay }) {
  const photo = event.images?.length ? event.images[0] : event.image || null

  return (
    <AnimatedSection delay={delay}>
      <div className="bg-brown-800 rounded-2xl overflow-hidden shadow-sm">
        {photo ? (
          <img src={photo} alt={event.name} className="w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 bg-brown-700 flex items-center justify-center text-brown-400 text-sm">
            No photo yet
          </div>
        )}
        <div className="p-8">
          <h3 className="font-sans text-xl text-brown-50 mb-1">{event.name}</h3>
          <p className="text-brown-300 text-sm font-medium mb-3">{formatMonthYear(event.date)}</p>
          <p className="text-brown-200 text-sm leading-relaxed">{event.description}</p>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function Events() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-brown-800 to-brown-900 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-64 h-64 rounded-full border-2 border-brown-500/30"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -180, -360] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute top-16 right-16 w-44 h-44 rounded-full border border-brown-500/20"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-4"
          >
            Events
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-sans text-5xl md:text-6xl text-brown-50 font-semibold mb-6"
          >
            Beyond The Mat
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-brown-100 text-lg leading-relaxed"
          >
            Socials, collaborations and special sessions from the River House community.
          </motion.p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-24 px-6 bg-brown-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">Upcoming</p>
            <h2 className="font-sans text-4xl md:text-5xl text-brown-50 font-semibold">What's On</h2>
          </AnimatedSection>

          {upcoming.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-8">
              {upcoming.map((event, i) => (
                <UpcomingCard key={event.id} event={event} delay={i * 0.1} />
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <p className="text-brown-200 text-center max-w-md mx-auto">
                Nothing on the calendar right now — follow us on Instagram to hear about the next one first.
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="py-24 px-6 bg-brown-800">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">Past Events</p>
              <h2 className="font-sans text-4xl md:text-5xl text-brown-50 font-semibold">Where We've Been</h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 gap-8">
              {past.map((event, i) => (
                <PastCard key={event.id} event={event} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full-width photo */}
      <section className="bg-brown-900">
        <img src="/events/tent-wide.jpg" alt="Inside a River House session" className="w-full h-[32rem] object-cover opacity-55" />
      </section>

      {/* Collaborate CTA */}
      <section className="py-24 px-6 bg-brown-900 text-center">
        <AnimatedSection>
          <h2 className="font-sans text-3xl md:text-4xl text-brown-50 font-semibold mb-6">
            Want to host or collaborate on an event with River House?
          </h2>
          <a
            href="mailto:hello.riverhousestudio@gmail.com?subject=Event%20Collaboration&body=Hi%20River%20House%20Studio%20team%2C%0D%0A%0D%0AMy%20name%20is%3A%20(add%20here)%0D%0A%0D%0AI%20am%20interested%20in%3A%20(add%20here%20-%20e.g.%20hosting%20an%20event%2C%20collaborating%2C%20or%20hiring%20an%20instructor)%0D%0A%0D%0ADetails%3A%20(add%20here)%0D%0A%0D%0AThank%20you!"
            className="inline-block bg-brown-100 text-brown-900 px-10 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-white hover:-translate-y-1 transition-all duration-300"
          >
            Get In Touch
          </a>
        </AnimatedSection>
      </section>
    </motion.div>
  )
}
