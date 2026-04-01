'use client'

import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'thesis', label: 'Thesis' },
  { id: 'build', label: 'Build' },
  { id: 'track-record', label: 'History' },
  { id: 'engage', label: 'Engage' },
]

export default function Navigation() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 80)

      // Determine active section
      let current = ''
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.4) current = s.id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = id === 'top' ? null : document.getElementById(id)
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)',
      }}
    >
      {/* Monogram */}
      <button
        onClick={() => scrollTo('top')}
        aria-label="Back to top"
        className="font-serif text-lg text-fg tracking-widest hover:text-accent transition-colors duration-200"
      >
        AJ
      </button>

      {/* Section dots — desktop only */}
      <nav className="hidden md:flex items-center gap-6" aria-label="Sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-2"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                active === s.id ? 'bg-fg scale-150' : 'bg-muted group-hover:bg-accent'
              }`}
            />
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === s.id ? 'text-fg' : 'text-muted group-hover:text-accent'
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Inquire CTA */}
      <button
        onClick={() => scrollTo('engage')}
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-fg transition-colors duration-300 group flex items-center gap-2"
        aria-label="Navigate to engagement section"
      >
        Inquire
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </header>
  )
}
