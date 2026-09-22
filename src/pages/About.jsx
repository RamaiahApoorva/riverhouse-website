import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

const instructors = [
  { name: 'Kimmy', role: 'Founder and Lead Instructor', bio: 'The founder behind River House Studio.' },
]

const values = [
  { title: 'Strength', desc: 'Built slowly and properly. Small movements, full control — the kind of strength that holds up outside the studio in your everyday lives.' },
  { title: 'Confidence', desc: 'Every body is a Pilates body. We learn to love our bodies and feel empowered by how they move.' },
  { title: 'Connection', desc: "Intimate classes, same faces, growing within the community that you create — not just a studio, it's a village." },
  { title: 'Presence', desc: 'Time on the mat is time back with yourself — a chance to slow down, tune in, and come back to who you are.' },
]

export default function About() {
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-sans text-5xl md:text-6xl text-brown-50 font-semibold mb-6"
          >
            The River House Journey
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-brown-100 text-lg leading-relaxed text-center space-y-4"
          >
            <p>The River House is a place for you to come to, come back to, and feel at home.</p>
            <p>When I found out about Barking Riverside, a whole new neighbourhood rising minutes from the Thames, something in me recognised it straight away. I'm a water baby, so naturally I connect to the water whenever I'm around it. Similar to my clients, we've all arrived at this place still being built, looking for something new.</p>
            <p>The name came before anything else did. A nod to my parents' heritage and a nod to what feels like home to me. River House: by the water you feel, away from the noise, coming back to your self, your home.</p>
            <p>The studio opened in summer 2026 as the first Pilates and yoga studio in Barking Riverside — I'm even honoured to say that.</p>
            <p>I say all this to say, this was created from lots of changes in my personal life. Not everything in life goes to plan for us — sometimes things come to us when we least expect it, but the journey is the beauty, and I'm honoured I get to meet incredible people from all walks of life and take a small journey with them.</p>
            <p>River House is built for community, by the community, on hope, and on faith that the best is still ahead. My wish is you leave feeling lighter and collectively held.</p>
            <p>You've got this x</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-brown-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">Our Philosophy</p>
            <h2 className="font-sans text-4xl text-brown-50 font-semibold">What We Stand For</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-brown-700 flex items-center justify-center">
                    <span className="text-brown-100 font-sans text-xl font-semibold">{v.title[0]}</span>
                  </div>
                  <h3 className="font-sans text-xl text-brown-50 mb-2">{v.title}</h3>
                  <p className="text-brown-200 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="relative py-24 px-6 bg-brown-800 overflow-hidden">
        <img
          src="/founder.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[50%_34%] opacity-45"
          style={{ transform: 'scale(1.3) translateX(-15%)' }}
        />
        <div className="absolute inset-0 bg-brown-800/55" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">Meet The Founder</p>
            <h2 className="font-sans text-4xl text-brown-50 font-semibold">Your Guide</h2>
          </AnimatedSection>

          <div className="flex justify-center">
            {instructors.map((inst, i) => (
              <AnimatedSection key={inst.name} delay={i * 0.12} className="w-full max-w-sm">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-brown-900/45 backdrop-blur-sm rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-brown-600 flex items-center justify-center">
                    <span className="text-brown-50 font-sans text-3xl font-semibold">{inst.name[0]}</span>
                  </div>
                  <h3 className="font-sans text-xl text-brown-50 mb-1">{inst.name}</h3>
                  <p className="text-brown-300 text-sm font-medium mb-3">{inst.role}</p>
                  <p className="text-brown-200 text-sm leading-relaxed">{inst.bio}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="py-24 px-6 bg-brown-900">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">The Space</p>
            <h2 className="font-sans text-4xl text-brown-50 font-semibold mb-6">Our Studio</h2>
            <div className="bg-brown-800 rounded-3xl p-12 md:p-16">
              <p className="text-brown-100 text-lg leading-relaxed">
                We practise in The Seminar, at The Wilds, Barking Riverside. Warm timber, smooth floors underfoot and full-height glass doors that pull in the light. Somewhere to arrive, breathe out, and be with self — the next 50 minutes are yours.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
