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
            className="font-serif text-5xl md:text-6xl text-brown-50 font-semibold mb-6"
          >
            Named for Two Rivers
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-brown-100 text-lg leading-relaxed text-center space-y-4"
          >
            <p>My mum was raised on the coast, Rivers, in the Niger Delta region of southern Nigeria. Water was the backdrop to her whole childhood. Mine was east London. Being raised here shaped me.</p>
            <p>When I found out about the development of Barking Riverside, it felt like a home away from home, minutes from the Thames, the name came before anything else did. River House is a nod to where my parents know, and where I&apos;ve ended up. (The two wavy lines beneath the R and the H aren&apos;t decoration.)</p>
            <p>The studio opened in summer 2026, the first Pilates and yoga studio in Barking Riverside — an area still being built, full of people who arrived recently and were looking for somewhere to belong.</p>
            <p>It started small on purpose. Twelve people per class, so nobody is a face in a crowd. Six-week blocks, so you&apos;re building towards something rather than dropping in and out. And time afterwards to actually talk, because the class was never really the whole point.</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-brown-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">Our Philosophy</p>
            <h2 className="font-serif text-4xl text-brown-50 font-semibold">What We Stand For</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-brown-700 flex items-center justify-center">
                    <span className="text-brown-100 font-serif text-xl font-semibold">{v.title[0]}</span>
                  </div>
                  <h3 className="font-serif text-xl text-brown-50 mb-2">{v.title}</h3>
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
          src="/Kimphoto.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[50%_50%] opacity-45"
        />
        <div className="absolute inset-0 bg-brown-800/55" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brown-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">Meet The Founder</p>
            <h2 className="font-serif text-4xl text-brown-50 font-semibold">Your Guide</h2>
          </AnimatedSection>

          <div className="flex justify-center">
            {instructors.map((inst, i) => (
              <AnimatedSection key={inst.name} delay={i * 0.12} className="w-full max-w-sm">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-brown-900 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-brown-600 flex items-center justify-center">
                    <span className="text-brown-50 font-serif text-3xl font-semibold">{inst.name[0]}</span>
                  </div>
                  <h3 className="font-serif text-xl text-brown-50 mb-1">{inst.name}</h3>
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
            <h2 className="font-serif text-4xl text-brown-50 font-semibold mb-6">Our Studio</h2>
            <div className="bg-brown-800 rounded-3xl p-12 md:p-16">
              <p className="text-brown-100 text-lg leading-relaxed">
                We practise in the Seminar Room at The Wilds, Barking Riverside. Warm timber, clean smooth floors underfoot and full-height glass doors that pull in the light and the green outside. It&apos;s an intentionally small room — our intimate numbers for spacious mats, no mirrors, no noise. Somewhere to arrive, breathe out, and actually be seen by your instructor.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
