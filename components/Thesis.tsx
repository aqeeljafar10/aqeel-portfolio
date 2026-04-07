'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Thesis() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const headLine = section.querySelector('.thesis-headline')
      const body = section.querySelector('.thesis-body')
      const tag = section.querySelector('.thesis-tag')

      if (reduced) {
        gsap.set([tag, headLine, body], { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        tag,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        headLine,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      )

      gsap.fromTo(
        body,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 65%' },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="thesis"
      className="section-pad px-6 max-w-5xl mx-auto"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 100% 50%, rgba(200,169,110,0.03) 0%, transparent 70%)' }}
      aria-label="Core Thesis"
    >
      {/* Tag */}
      <div
        className="thesis-tag font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-4 md:mb-8 flex items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="w-8 h-px bg-border" aria-hidden="true" />
        Core Thesis
      </div>

      {/* Headline */}
      <div className="overflow-hidden mb-6 md:mb-12">
        <h2
          className="thesis-headline font-serif text-h1 text-fg leading-tight"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          Healthcare is an
          <br />
          <span className="italic text-accent">Engineering Problem.</span>
        </h2>
      </div>

      {/* Body — trimmed to 2 focused paragraphs */}
      <div
        className="thesis-body max-w-2xl space-y-5"
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-sm text-accent leading-relaxed">
          Clinical medicine suffers from structural friction — not from a shortage of talent,
          but from absent infrastructure. Admin overhead consumes the clinician before they reach the patient.
        </p>
        <p className="font-mono text-sm text-muted leading-relaxed">
          The fix is AI at the infrastructure layer — automating admin, routing diagnostic data intelligently,
          and building the operational rails healthcare has never had.
        </p>
      </div>
    </section>
  )
}
