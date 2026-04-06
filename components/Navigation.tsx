'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'thesis', label: 'Thesis' },
  { id: 'build', label: 'Build' },
  { id: 'track-record', label: 'History' },
  { id: 'engage', label: 'Engage' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      let current = ''
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Gold top accent line — always visible, frames the page */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.4) 30%, rgba(200,169,110,0.4) 70%, transparent)' }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-px left-0 right-0 z-50 px-6 md:px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'border-b border-border/40' : ''
        }`}
        style={{
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        }}
      >
        {/* Monogram — dim when at top, full opacity after scroll */}
        <button
          onClick={() => scrollTo('top')}
          aria-label="Back to top"
          className={`font-serif text-base tracking-widest hover:text-accent transition-all duration-500 ${
            scrolled ? 'text-fg opacity-100' : 'text-fg opacity-20'
          }`}
        >
          AJ
        </button>

        {/* Section dots — desktop only, after scroll */}
        <nav
          className={`hidden md:flex items-center gap-6 transition-all duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Sections"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group flex items-center gap-2"
              aria-label={`Go to ${s.label}`}
            >
              <span
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  active === s.id ? 'bg-accent scale-150' : 'bg-muted group-hover:bg-accent'
                }`}
              />
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === s.id ? 'text-accent' : 'text-muted group-hover:text-accent'
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Right actions — always visible */}
        <div className="flex items-center gap-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/aqeeljafar10/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          {/* Inquire — always visible */}
          <button
            onClick={() => scrollTo('engage')}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-accent border border-border hover:border-accent/40 transition-all duration-300 px-3 py-1.5"
            aria-label="Navigate to engagement section"
          >
            Inquire
          </button>
        </div>
      </header>
    </>
  )
}
