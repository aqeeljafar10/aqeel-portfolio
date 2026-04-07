'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Globe, Stethoscope, TrendingUp, Brain, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface TrackItemData {
  period: string
  role: string
  org: string
  geo?: string
  description: string
  icon?: string
}

interface TrackItem extends TrackItemData {
  iconComponent: React.ElementType
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Building2,
  Stethoscope,
  TrendingUp,
  Brain,
  Users,
}

const DEFAULT_TRACK: TrackItemData[] = [
  {
    period: '2022 — Present',
    role: 'Digital Infrastructure & Brand Lead',
    org: 'Medventure Group',
    icon: 'Globe',
    geo: 'Education · Travel · Residences',
    description: 'Built the entire digital footprint of Medventure Holdings — brand, marketing, and creative direction across three verticals.',
  },
  {
    period: '2023 — Present',
    role: 'Co-Founder & Managing Director',
    org: 'Meloc',
    icon: 'Building2',
    geo: 'Georgia · Azerbaijan · Uzbekistan · Armenia',
    description: 'Co-founded and run a smart home brand across 4 Caucasus/Central Asian markets — operations, entity management, and distribution.',
  },
  {
    period: '2024 — Present',
    role: 'Physician',
    org: 'Active Clinical Practice',
    icon: 'Stethoscope',
    geo: 'Georgia',
    description: 'MBBS. Emergency Department background. Maintained alongside all ventures as a live lens on operational friction.',
  },
]

interface TrackRecordProps {
  track?: TrackItemData[]
}

export default function TrackRecord({ track: trackProp }: TrackRecordProps = {}) {
  const sectionRef = useRef<HTMLElement>(null)

  const track: TrackItem[] = (trackProp ?? DEFAULT_TRACK).map((t) => ({
    ...t,
    iconComponent: ICON_MAP[t.icon ?? ''] ?? Globe,
  }))

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const header = section.querySelector('.track-header')
      const items = section.querySelectorAll('.track-item')

      if (reduced) {
        gsap.set([header, ...Array.from(items)], { opacity: 1, x: 0 })
        return
      }

      gsap.fromTo(
        header,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: section, start: 'top 72%' },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="track-record"
      className="section-pad px-6 max-w-5xl mx-auto"
      aria-label="Operational History"
    >
      {/* Header */}
      <div className="track-header mb-8 md:mb-14" style={{ opacity: 0 }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-border" aria-hidden="true" />
          Proof of Execution
        </div>
        <h2 className="font-serif text-h1 text-fg">
          Operational History
        </h2>
      </div>

      {/* Track items */}
      <div className="space-y-0">
        {track.map((item) => (
          <article
            key={item.org}
            className="track-item border-l border-border pl-5 md:pl-8 pb-8 md:pb-14 last:pb-0 group cursor-default relative"
            style={{ opacity: 0 }}
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border border-border bg-bg group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300"
              style={{
                boxShadow: '0 0 0 0 rgba(200,169,110,0)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 10px rgba(200,169,110,0.5)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 0 0 rgba(200,169,110,0)'
              }}
              aria-hidden="true"
            />

            {/* Period + icon */}
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <item.iconComponent size={10} strokeWidth={1.5} className="text-accent flex-shrink-0" />
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-muted">
                {item.period}
              </span>
            </div>

            {/* Role + Org */}
            <div className="mb-1">
              <h3 className="font-serif text-[clamp(1.1rem,3.5vw,2rem)] text-fg group-hover:text-accent transition-colors duration-300 leading-snug">
                {item.role}
              </h3>
            </div>

            {/* Org + Geo */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-3">
              <span className="font-mono text-[11px] md:text-xs text-accent tracking-wide">
                {item.org}
              </span>
              {item.geo && (
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                  · {item.geo}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="font-mono text-[11px] md:text-xs text-muted leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
