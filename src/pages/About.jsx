import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

const instructors = [
  { name: 'Elena Marsh', role: 'Founder & Lead Instructor', bio: '15 years of practice. Certified in Mat, Reformer, and Clinical Pilates. Trained in London and New York.' },
  { name: 'David Chen', role: 'Reformer Specialist', bio: '10 years teaching dynamic reformer classes. Former dancer who brings grace and precision to every session.' },
  { name: 'Aisha Patel', role: 'Mat & Recovery Guide', bio: '8 years of movement practice. Specializes in corrective exercise and mobility techniques.' },
]

const values = [
  { title: 'Precision', desc: 'Every movement, every breath, every rep performed with full control and intention.' },
  { title: 'Community', desc: 'A welcoming space where every body is a pilates body. No judgment, only growth.' },
  { title: 'Growth', desc: 'Meet yourself where you are. Progress is personal and celebrated at every stage.' },
  { title: 'Balance', desc: 'Strength and flexibility. Power and control. In the studio and in daily life.' },
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
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-sage-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-serif text-5xl md:text-6xl text-stone-900 font-semibold mb-6"
          >
            Rooted in Practice
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-stone-500 text-lg leading-relaxed"
          >
            Serenity was born from a simple belief: pilates should be accessible, authentic, and
            transformative. Founded in 2018, we&apos;ve grown from a small garage studio to a
            thriving community of over 500 members who share a love for mindful movement.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-3">Our Philosophy</p>
            <h2 className="font-serif text-4xl text-stone-900 font-semibold">What We Stand For</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-sage-100 flex items-center justify-center">
                    <span className="text-sage-700 font-serif text-xl font-semibold">{v.title[0]}</span>
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mb-2">{v.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-24 px-6 bg-sage-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-3">Meet The Team</p>
            <h2 className="font-serif text-4xl text-stone-900 font-semibold">Your Guides</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((inst, i) => (
              <AnimatedSection key={inst.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-sage-200 flex items-center justify-center">
                    <span className="text-sage-800 font-serif text-3xl font-semibold">{inst.name[0]}</span>
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mb-1">{inst.name}</h3>
                  <p className="text-sage-600 text-sm font-medium mb-3">{inst.role}</p>
                  <p className="text-stone-500 text-sm leading-relaxed">{inst.bio}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sage-600 text-sm font-medium uppercase tracking-[0.2em] mb-3">The Space</p>
            <h2 className="font-serif text-4xl text-stone-900 font-semibold mb-6">Our Studio</h2>
            <div className="bg-sage-50 rounded-3xl p-12 md:p-16">
              <p className="text-stone-600 text-lg leading-relaxed mb-6">
                Natural light fills our 2,000 sq ft studio through floor-to-ceiling windows.
                Bamboo floors, curated plants, and a minimalist design create a space that feels
                like a deep breath the moment you walk in.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-10">
                <div>
                  <p className="font-serif text-3xl text-sage-700 font-semibold">500+</p>
                  <p className="text-stone-500 text-sm mt-1">Active Members</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-sage-700 font-semibold">30+</p>
                  <p className="text-stone-500 text-sm mt-1">Weekly Classes</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-sage-700 font-semibold">6</p>
                  <p className="text-stone-500 text-sm mt-1">Years Strong</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
