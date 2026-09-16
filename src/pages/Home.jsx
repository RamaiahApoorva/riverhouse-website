import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { supabase } from '../lib/supabase'

const testimonials = [
  { name: 'Maya R.', text: 'Serenity transformed my mornings. I feel stronger, calmer, and more focused than ever.' },
  { name: 'James L.', text: 'The instructors genuinely care. Every class feels like it was made for me.' },
  { name: 'Priya K.', text: 'I came for the pilates, stayed for the community. This studio is my second home.' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Home() {
  const [classes, setClasses] = useState([])
  const [heroImages, setHeroImages] = useState({ 'hero-1': null, 'hero-2': null })

  useEffect(() => {
    supabase.from('classes').select('*').eq('active', true).order('created_at').limit(3).then(({ data }) => {
      setClasses(data || [])
    })
    supabase.from('site_images').select('*').in('key', ['hero-1', 'hero-2']).then(({ data }) => {
      if (data) {
        const map = {}
        data.forEach((img) => { map[img.key] = img })
        setHeroImages(map)
      }
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-white to-stone-50 overflow-hidden">
        {/* Decorative circles */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-16 right-16 w-80 h-80 rounded-full border-2 border-sage-300/50"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-24 left-10 w-56 h-56 rounded-full bg-sage-200/40"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-40 left-1/4 w-32 h-32 rounded-full border border-sage-200/30"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-48 right-1/4 w-24 h-24 rounded-full bg-sage-300/30"
        />

        <div className="relative z-10 text-center px-6 max-w-4xl pt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-6"
          >
            Welcome to Serenity
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="font-serif text-5xl md:text-7xl font-semibold text-stone-900 leading-tight mb-6"
          >
            Find Your
            <br />
            <span className="text-sage-600">Balance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-stone-500 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Transform your body through controlled movement, core strength, and a community that lifts you up.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="inline-block bg-sage-700 text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-sage-800 transition-colors duration-300"
            >
              Book a Class
            </Link>
            <Link
              to="/about"
              className="inline-block border border-stone-300 text-stone-700 px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:border-stone-500 transition-colors duration-300"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Two Images below CTA — only show if at least one image is uploaded */}
          {(heroImages['hero-1']?.image_url || heroImages['hero-2']?.image_url) && (
            <div className="flex gap-5 justify-center mt-14">
              {['hero-1', 'hero-2'].map((key, i) => {
                const img = heroImages[key]
                if (!img?.image_url) return null
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.15, duration: 0.7, ease: 'easeOut' }}
                    className={`w-44 sm:w-56 md:w-64 ${i === 0 ? 'mt-8' : ''}`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.alt_text || 'Pilates'}
                      className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-3xl shadow-lg"
                    />
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-stone-300 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Classes */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-3">Our Classes</p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-semibold">Move With Intention</h2>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {classes.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group bg-stone-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-sage-600 bg-sage-100 px-3 py-1 rounded-full">
                  {c.level}
                </span>
                <h3 className="font-serif text-2xl text-stone-900 mt-5 mb-2">{c.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{c.description}</p>
                <p className="text-sage-700 text-sm font-medium">{c.time} daily</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-sage-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-3">Testimonials</p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-semibold">Words From Our Community</h2>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="text-sage-300 text-5xl font-serif leading-none mb-4">&ldquo;</div>
                <p className="text-stone-600 leading-relaxed mb-6">{t.text}</p>
                <p className="text-stone-900 font-medium text-sm">{t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-stone-900 text-center">
        <AnimatedSection>
          <p className="text-sage-400 text-sm font-medium uppercase tracking-[0.2em] mb-3">Ready?</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-6">Begin Your Journey Today</h2>
          <p className="text-stone-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Your first class is on us. Step into the studio and feel the difference.
          </p>
          <Link
            to="/booking"
            className="inline-block bg-sage-600 text-white px-10 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-sage-500 transition-colors duration-300"
          >
            Book Your Free Class
          </Link>
        </AnimatedSection>
      </section>
    </motion.div>
  )
}
