import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { supabase } from '../lib/supabase'
import { BOOKING_URL, FIRST_CLASS_DEAL_URL } from '../lib/booking'

const testimonials = [
  { name: 'Smita P.', text: 'River House transformed my evenings. I feel stronger, calmer, and more focused than ever.' },
  { name: 'Kit E.', text: 'The instructors genuinely care. Every class feels like it was made for me.' },
  { name: 'Lillian J.', text: 'I came for the pilates, stayed for the community. This studio is my second home.' },
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
  const [heroImages, setHeroImages] = useState({ 'hero-1': null, 'hero-2': null, 'hero-video': null })
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5
  }, [])

  useEffect(() => {
    supabase.from('classes').select('*').eq('active', true).order('id').then(({ data }) => {
      setClasses(data || [])
    })
    supabase.from('site_images').select('*').in('key', ['hero-1', 'hero-2', 'hero-video']).then(({ data }) => {
      if (data) {
        const map = {}
        data.forEach((img) => { map[img.key] = img })
        setHeroImages(map)
      }
    })
  }, [])

  // Falls back to the bundled default video until an admin uploads one via Site Images
  const heroVideoUrl = heroImages['hero-video']?.image_url || '/hero-video.mp4'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${heroVideoUrl ? 'bg-[#2A211B]' : 'bg-gradient-to-br from-brown-800 via-brown-900 to-brown-900'}`}>
        {heroVideoUrl ? (
          <>
            <video
              ref={videoRef}
              src={heroVideoUrl}
              className="absolute inset-0 w-full h-full object-cover opacity-55"
              style={{ filter: 'saturate(0.7) contrast(0.95)' }}
              autoPlay
              muted
              loop
              playsInline
            />
            {/* Scrim so hero text stays legible over any video content */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
          </>
        ) : (
          <>
            {/* Decorative circles (shown until a hero video is uploaded via Admin) */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute top-16 right-16 w-80 h-80 rounded-full border-2 border-brown-500/40"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-24 left-10 w-56 h-56 rounded-full bg-brown-700/40"
            />
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-40 left-1/4 w-32 h-32 rounded-full border border-brown-500/30"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-48 right-1/4 w-24 h-24 rounded-full bg-brown-600/30"
            />
          </>
        )}

        <div className="relative z-10 text-center px-6 max-w-4xl pt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-brown-200 text-sm font-medium uppercase tracking-[0.2em] mb-6"
          >
            Welcome to The River House studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="font-serif text-[47px] md:text-[56px] font-semibold leading-tight mb-6 text-brown-50"
          >
            Strength.
            <br />
            Confidence.
            <br />
            Connection.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl max-w-[640px] mx-auto mb-20 leading-loose text-brown-100"
          >
            Barking Riverside's first Pilates &amp; yoga studio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider transition-colors duration-300 bg-brown-100 text-brown-900 hover:bg-brown-50"
            >
              Book a Class
            </a>
          </motion.div>

          {/* Two Images below CTA — only when no hero video is set and at least one image is uploaded */}
          {!heroVideoUrl && (heroImages['hero-1']?.image_url || heroImages['hero-2']?.image_url) && (
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
          <div className="w-6 h-10 border-2 border-brown-300 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-brown-300 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Classes */}
      <section className="py-24 px-6 bg-[#F5F0E8]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brown-600 text-sm font-medium uppercase tracking-[0.2em] mb-3">Our Classes</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2A211B] font-semibold">Move With Intention</h2>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-8"
          >
            {classes.map((c) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-brown-700 bg-brown-100 px-3 py-1 rounded-full">
                  {c.level}
                </span>
                <h3 className="font-serif text-2xl text-[#2A211B] mt-5 mb-2">{c.name}</h3>
                <p className="text-[#2A211B]/80 text-sm leading-relaxed mb-4">{c.description}</p>
                <p className="text-[#2A211B]/80 text-sm font-medium">{c.time}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#F5F0E8]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#AD8CC0] text-sm font-medium uppercase tracking-[0.2em] mb-3">Testimonials</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2A211B] font-semibold">Words From Our Community</h2>
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
                <div className="text-[#2A211B]/15 text-5xl font-serif leading-none mb-4">&ldquo;</div>
                <p className="text-[#2A211B]/80 leading-relaxed mb-6">{t.text}</p>
                <p className="text-[#2A211B] font-medium text-sm">{t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#2A211B] text-center">
        <AnimatedSection>
          <p className="text-[#F5F0E8]/70 text-sm font-medium uppercase tracking-[0.2em] mb-3">Ready to Join</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] font-semibold mb-6">Begin Your Journey Today</h2>
          <p className="text-[#F5F0E8]/80 max-w-lg mx-auto mb-10 leading-relaxed">
            Start with 2 classes for £33. Step into the studio and feel the difference.
          </p>
          <a
            href={FIRST_CLASS_DEAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#F5F0E8] text-[#2A211B] px-10 py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity duration-300"
          >
            Book Your First Class With Us
          </a>
        </AnimatedSection>
      </section>
    </motion.div>
  )
}
