'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '6', label: 'Countries', sub: 'Active operations', numeric: 6, from: 0, suffix: '' },
  { value: '5+', label: 'Ventures', sub: 'Across 5+ companies', numeric: 5, from: 0, suffix: '+' },
  { value: '2021', label: 'Since', sub: 'Entrepreneurial track record', numeric: 2021, from: 2018, suffix: '' },
  { value: '∞', label: 'Domains', sub: 'Medicine · AI · Brand · Ops', numeric: null, from: 0, suffix: '' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = section.querySelectorAll('.stat-item')
    const valueEls = section.querySelectorAll<HTMLElement>('.stat-value')

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 82%' },
      }
    )

    // Count-up for each stat
    STATS.forEach((stat, i) => {
      if (stat.numeric === null) return
      const el = valueEls[i]
      if (!el) return
      const obj = { val: stat.from }
      gsap.to(obj, {
        val: stat.numeric,
        duration: 1.4,
        ease: 'power2.out',
        delay: i * 0.1,
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + stat.suffix
        },
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="px-6 max-w-5xl mx-auto py-8 md:py-16" aria-label="Stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="stat-item bg-bg px-4 py-6 md:px-8 md:py-10 flex flex-col gap-1.5 group hover:bg-subtle transition-colors duration-300"
            style={{ opacity: 0 }}
          >
            <span
              className="stat-value font-serif text-[2.4rem] md:text-[3.5rem] leading-none text-fg group-hover:text-accent transition-colors duration-300"
            >
              {s.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg/70">
              {s.label}
            </span>
            <span className="font-mono text-[10px] text-muted leading-snug">
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
