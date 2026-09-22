import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

const faqs = [
  {
    q: 'What is River House Studio?',
    a: "Barking Riverside's first Pilates and yoga studio — small classes, intimate numbers, and instructors who actually know your name.",
  },
  {
    q: 'How do I book a class?',
    a: 'All bookings happen through Time2Book. Tap "Book a Class" anywhere on the site to see the live schedule and reserve your spot.',
  },
  {
    q: 'Do you offer a deal for first-timers?',
    a: 'Yes — new to River House? Start with 2 classes for £33 through Time2Book.',
  },
  {
    q: 'What levels are the classes?',
    a: 'Every class is All Levels: Pilates Root and Pilates Rise for core and posture work, plus Restorative and Hatha yoga.',
  },
  {
    q: 'Who will I be practising with?',
    a: "Classes are kept intentionally small so you're never just a face in the crowd — you'll get real attention from your instructor.",
  },
  {
    q: 'What should I bring?',
    a: 'All equipment is provided — just bring yourself and some water to stay hydrated.',
  },
  {
    q: 'Where are you located?',
    a: 'We practise in the Seminar Room at The Wilds, Barking Riverside — minutes from the Thames.',
  },
  {
    q: 'Is there a car park at The Wilds?',
    points: [
      'There is a public car park next to The Wilds. This is a pay-to-park facility charged at 50p per hour, with 24 visitor spaces available 24/7.',
      "An additional larger car park is available approximately 0.5 miles (around a 15-minute walk) from the venue at: Project Road Car Park, Project Road, IG11 0YP.",
      "Vehicles are parked at the owner's own risk, and Barking Riverside Limited cannot be held liable for any parking fines or charges.",
    ],
  },
  {
    q: "What's your cancellation policy?",
    a: 'Cancellations are accepted up to 11 hours before your class. Need to reach us? Call 07951 418850 or email hello.riverhousestudio@gmail.com.',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-brown-700">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-sans text-lg md:text-xl text-brown-50">{item.q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-brown-500 flex items-center justify-center text-brown-200 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {item.points ? (
              <ul className="text-brown-200 leading-relaxed pb-6 pr-12 space-y-3 list-disc pl-5">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-brown-200 leading-relaxed pb-6 pr-12">{item.a}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-brown-800 to-brown-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-4"
          >
            FAQ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-sans text-5xl md:text-6xl text-brown-50 font-semibold mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-brown-100 text-lg leading-relaxed"
          >
            Everything you need to know before your first class.
          </motion.p>
        </div>
      </section>

      {/* Questions */}
      <section className="py-24 px-6 bg-brown-900">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            {faqs.map((item, i) => (
              <FAQItem
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-brown-800 text-center">
        <AnimatedSection>
          <h2 className="font-sans text-3xl md:text-4xl text-brown-50 font-semibold mb-6">Still have a question?</h2>
          <p className="text-brown-100 max-w-lg mx-auto mb-10 leading-relaxed">
            Drop us a line and we&apos;ll get back to you.
          </p>
          <a
            href="mailto:hello.riverhousestudio@gmail.com"
            className="inline-block bg-brown-100 text-brown-900 px-10 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-white hover:-translate-y-1 transition-all duration-300"
          >
            Email Us
          </a>
        </AnimatedSection>
      </section>
    </motion.div>
  )
}
