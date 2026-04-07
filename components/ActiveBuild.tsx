'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Megaphone, Stethoscope, TrendingUp, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface ProjectData {
  index: string
  tag: string
  title: string
  description: string
  status: 'Active' | 'In progress'
  icon?: string
}

interface Project extends ProjectData {
  iconComponent: React.ElementType
}

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Brain,
  Users,
  Megaphone,
  Stethoscope,
}

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    index: '01',
    tag: 'Smart Home · Caucasus & Central Asia',
    title: 'Scaling Meloc Across New Markets',
    description: 'Co-Founder scaling Meloc smart home automation across Georgia, Azerbaijan, Uzbekistan & Armenia.',
    status: 'Active',
    icon: 'TrendingUp',
  },
  {
    index: '02',
    tag: 'Clinical AI · Workflow',
    title: 'AI in Clinical Practice',
    description: 'Researching how AI pipelines eliminate admin overhead in clinical environments — giving clinicians time back.',
    status: 'In progress',
    icon: 'Brain',
  },
  {
    index: '03',
    tag: 'Mentorship · Advisory',
    title: 'Mentoring Medical Entrepreneurs',
    description: 'Guiding medical students, junior doctors, and early health-tech founders through medicine and entrepreneurship.',
    status: 'Active',
    icon: 'Users',
  },
  {
    index: '04',
    tag: 'Brand · Identity',
    title: 'Healthcare Brand Architecture',
    description: 'Building clinical authority brands that attract the right operators, investors, and collaborators.',
    status: 'Active',
    icon: 'Megaphone',
  },
  {
    index: '05',
    tag: 'Medicine · Georgia',
    title: 'Active Clinical Practice',
    description: 'Maintaining clinical practice in Georgia — a live lens on the operational friction this work addresses.',
    status: 'Active',
    icon: 'Stethoscope',
  },
]

const STATUS_COLORS: Record<string, string> = {
  Active: '#4ade80',
  'In progress': '#facc15',
}

interface ActiveBuildProps {
  projects?: ProjectData[]
}

export default function ActiveBuild({ projects: projectsProp }: ActiveBuildProps = {}) {
  const sectionRef = useRef<HTMLElement>(null)

  const projects: Project[] = (projectsProp ?? DEFAULT_PROJECTS).map((p) => ({
    ...p,
    iconComponent: ICON_MAP[p.icon ?? ''] ?? TrendingUp,
  }))

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const header = section.querySelector('.build-header')
      const rows = section.querySelectorAll('.build-row')

      if (reduced) {
        gsap.set([header, ...Array.from(rows)], { opacity: 1, y: 0 })
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
        rows,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 74%' },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="build"
      className="section-pad px-6 max-w-5xl mx-auto"
      aria-label="Active Architecture"
    >
      {/* Header */}
      <div className="build-header mb-8 md:mb-16" style={{ opacity: 0 }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-border" aria-hidden="true" />
          Current Focus
        </div>
        <h2 className="font-serif text-h1 text-fg">
          Where the Work Is
        </h2>
      </div>

      {/* Rows */}
      <div>
        {projects.map((project, i) => (
          <article
            key={project.index}
            className="build-row group cursor-default relative overflow-hidden"
            style={{ opacity: 0 }}
          >
            {/* Top rule */}
            <div className="w-full h-px bg-border mb-6" aria-hidden="true" />

            <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-x-4 md:gap-x-8 gap-y-3 pb-6 md:pb-10 pl-3 md:pl-4">
              {/* Index number */}
              <div className="font-serif text-[1.8rem] md:text-[3.5rem] leading-none text-border select-none group-hover:text-muted/30 transition-colors duration-500 self-start pt-1">
                {project.index}
              </div>

              {/* Main content */}
              <div className="flex flex-col gap-2 md:gap-3">
                {/* Tag + icon + status pill (mobile) */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <project.iconComponent size={10} strokeWidth={1.5} className="text-accent flex-shrink-0" />
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-muted">
                      {project.tag}
                    </span>
                  </div>
                  {/* Status — mobile visible */}
                  <span className="md:hidden flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: STATUS_COLORS[project.status] }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
                      {project.status}
                    </span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-[clamp(1.1rem,3.5vw,2rem)] text-fg group-hover:text-accent transition-colors duration-300 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-mono text-[11px] md:text-xs text-muted leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Status — right col, desktop only */}
              <div className="hidden md:flex flex-col items-end justify-start pt-1 gap-2 self-start">
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[project.status] }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted whitespace-nowrap">
                    {project.status}
                  </span>
                </span>
              </div>
            </div>

            {/* Bottom rule on last item */}
            {i === projects.length - 1 && (
              <div className="w-full h-px bg-border" aria-hidden="true" />
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
