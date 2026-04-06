'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const NAME_WORDS = ['AQEEL', 'JAFAR']
const ROLES = ['Physician', 'AI Pioneer', 'Venture Architect', 'Mentor']
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const BADGES = ['Advisory', 'Investment', 'Speaking', 'Collaboration']

function scrambleText(el: HTMLElement, finalText: string, duration = 700) {
  const total = Math.floor(duration / 30)
  let frame = 0
  const interval = setInterval(() => {
    const progress = frame / total
    el.textContent = finalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (i / finalText.length < progress) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')
    frame++
    if (frame >= total) {
      clearInterval(interval)
      el.textContent = finalText
    }
  }, 30)
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const drEl = container.querySelector<HTMLElement>('.hero-dr')
      const nameWords = container.querySelectorAll<HTMLElement>('.hero-name-word')
      const divider = container.querySelector('.hero-divider')
      const roles = container.querySelectorAll('.hero-role')
      const thesis = container.querySelector('.hero-thesis')
      const badges = container.querySelectorAll('.hero-badge')
      const scrollCue = scrollCueRef.current
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduced) {
        gsap.set([drEl, ...Array.from(nameWords), divider, ...Array.from(roles), thesis, ...Array.from(badges), scrollCue], {
          opacity: 1, y: 0, scaleX: 1,
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(drEl, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(nameWords, { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: 0.08 }, '-=0.1')

      nameWords.forEach((word, i) => {
        const final = NAME_WORDS[i]
        tl.add(gsap.delayedCall(i * 0.15, () => { scrambleText(word, final, 600) }), '<')
      })

      tl.fromTo(
        divider,
        { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
        { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.inOut' },
        '+=0.1'
      )
      .fromTo(roles, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, '-=0.2')
      .fromTo(thesis, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.1')
      .fromTo(badges, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 }, '-=0.3')
      .fromTo(scrollCue, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '+=0.3')
    },
    { scope: containerRef }
  )

  useEffect(() => {
    const handleScroll = () => {
      if (scrollCueRef.current && window.scrollY > 50) {
        gsap.to(scrollCueRef.current, { opacity: 0, duration: 0.4 })
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="orb-1 absolute rounded-full"
          style={{
            width: 'clamp(400px, 60vw, 700px)',
            height: 'clamp(400px, 60vw, 700px)',
            background: 'radial-gradient(circle, rgba(200,169,110,0.09) 0%, transparent 68%)',
            top: '-15%',
            left: '-12%',
          }}
        />
        <div
          className="orb-2 absolute rounded-full"
          style={{
            width: 'clamp(300px, 50vw, 600px)',
            height: 'clamp(300px, 50vw, 600px)',
            background: 'radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 68%)',
            bottom: '-10%',
            right: '-8%',
          }}
        />
        <div
          className="orb-3 absolute rounded-full"
          style={{
            width: 'clamp(200px, 30vw, 380px)',
            height: 'clamp(200px, 30vw, 380px)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
            top: '35%',
            left: '55%',
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl w-full mx-auto">

        {/* Name — Dr. inline, small italic, then AQEEL JAFAR in display caps */}
        <h1
          className="font-serif text-display text-fg mb-6 tracking-[0.12em] uppercase leading-none"
          style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.18em', flexWrap: 'wrap' }}
        >
          <span
            className="hero-dr font-serif not-italic"
            style={{
              opacity: 0,
              fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)',
              fontStyle: 'italic',
              color: 'var(--muted)',
              letterSpacing: '0.06em',
              textTransform: 'none',
              alignSelf: 'baseline',
              lineHeight: 1,
              paddingBottom: '0.08em',
            }}
          >
            Dr.
          </span>

          {NAME_WORDS.map((word, i) => (
            <span
              key={word}
              className="hero-name-word inline-block"
              style={{ opacity: 0 }}
            >
              {word}
              {i < NAME_WORDS.length - 1 && (
                <span className="inline-block w-[0.3em]" aria-hidden="true" />
              )}
            </span>
          ))}
        </h1>

        {/* Divider */}
        <div
          className="hero-divider w-full h-px bg-border mb-8 mx-auto"
          style={{ opacity: 0, maxWidth: '640px', transformOrigin: 'left center' }}
          aria-hidden="true"
        />

        {/* Roles */}
        <div
          className="flex flex-wrap items-center justify-center mb-10"
          style={{ gap: '0 0' }}
        >
          {ROLES.map((role, i) => (
            <span key={role} className="hero-role flex items-center" style={{ opacity: 0 }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted whitespace-nowrap px-3">
                {role}
              </span>
              {i < ROLES.length - 1 && (
                <span
                  className="font-mono text-[10px] text-border select-none"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Thesis */}
        <p
          className="hero-thesis font-serif italic text-h2 text-accent max-w-2xl mx-auto leading-relaxed mb-8"
          style={{ opacity: 0 }}
        >
          Where clinical medicine, artificial intelligence,
          entrepreneurship, and brand building converge.
        </p>

        {/* Availability badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="hero-badge font-mono text-[9px] uppercase tracking-[0.22em] text-muted border border-border px-3 py-1.5 hover:border-accent/40 hover:text-accent transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-border to-transparent animate-bounce-gentle" />
      </div>
    </section>
  )
}
