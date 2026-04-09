'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Update this to your real Tally form URL when ready: https://tally.so
const CONTACT_URL = 'mailto:aqeel@melocsmart.ge?subject=Inquiry%20via%20aqeeljafar.com'

export default function Engagement() {
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const headline = section.querySelector('.engage-headline')
      const sub = section.querySelector('.engage-sub')
      const cta = section.querySelector('.engage-cta')
      const qualifier = section.querySelector('.engage-qualifier')

      if (reduced) {
        gsap.set([headline, sub, cta, qualifier], { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 72%' },
        defaults: { ease: 'power3.out' },
      })
      tl.fromTo(headline, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85 })
        .fromTo(sub, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.75 }, '-=0.4')
        .fromTo(qualifier, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    },
    { scope: sectionRef }
  )

  // Magnetic button
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' })
  }
  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    setHovered(false)
  }

  const handleInquire = () => {
    window.open(CONTACT_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      ref={sectionRef}
      id="engage"
      className="section-pad px-6 max-w-5xl mx-auto"
      aria-label="Engagement"
    >
      <div className="w-full h-px bg-border mb-8 md:mb-16" aria-hidden="true" />

      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-8 flex items-center gap-3">
        <span className="w-8 h-px bg-border" aria-hidden="true" />
        Engagement
      </div>

      <div className="max-w-2xl">
        <h2
          className="engage-headline font-serif text-h1 text-fg leading-tight mb-6"
          style={{ opacity: 0 }}
        >
          Let&apos;s build
          <br />
          <span className="italic text-accent">something that matters.</span>
        </h2>

        <p
          className="engage-sub font-mono text-sm text-muted leading-relaxed mb-4"
          style={{ opacity: 0 }}
        >
          Connecting with technical operators, AI researchers, clinic networks, and health-tech founders.
          Open to advisory, investment, and collaboration.
        </p>

        <p
          className="engage-qualifier font-mono text-xs text-muted leading-relaxed mb-8 md:mb-10 border-l border-border pl-4"
          style={{ opacity: 0 }}
        >
          Three brief questions to keep conversations high-signal on both sides.
        </p>

        <div className="engage-cta flex flex-col gap-4" style={{ opacity: 0 }}>
          <button
            ref={btnRef}
            onClick={handleInquire}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative group inline-flex items-center gap-3 border border-accent/30 hover:border-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-fg overflow-hidden self-start"
            style={{ willChange: 'transform' }}
            aria-label="Open inquiry form"
          >
            {/* Gold fill animation */}
            <span
              className="absolute inset-0 transition-transform duration-400 ease-out origin-left"
              style={{
                transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                background: 'var(--accent)',
              }}
              aria-hidden="true"
            />
            <span className={`relative z-10 transition-colors duration-300 ${hovered ? 'text-bg' : 'text-fg'}`}>
              Inquire / Collaborate
            </span>
            <ArrowUpRight
              size={14}
              className={`relative z-10 transition-all duration-300 ${
                hovered ? 'text-bg translate-x-0.5 -translate-y-0.5' : 'text-muted'
              }`}
            />
          </button>

          {/* LinkedIn secondary link */}
          <a
            href="https://www.linkedin.com/in/aqeeljafar10/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors duration-200 self-start"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
