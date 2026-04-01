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
    title: 'Leading Meloc\'s Growth in Challenging Markets',
    description:
      'Meloc is a smart lock and home automation brand built for markets that most founders haven\'t considered — the Caucasus and Central Asia. As Co-Founder and Managing Director, driving expansion strategy, market entry, partnership development, and operational scaling across Georgia, Azerbaijan, Uzbekistan, and Armenia. Building brand equity and distribution in emerging markets where trust, localisation, and on-the-ground presence are the actual competitive advantages.',
    status: 'Active',
    icon: 'TrendingUp',
  },
  {
    index: '02',
    tag: 'Clinical AI · Workflow',
    title: 'AI in Clinical Practice',
    description:
      'Exploring how large language models and structured AI pipelines can eliminate administrative overhead in clinical environments — giving clinicians back the time that systems currently consume. An ongoing area of study at the intersection of medicine and applied AI.',
    status: 'In progress',
    icon: 'Brain',
  },
  {
    index: '03',
    tag: 'Mentorship · Advisory',
    title: 'Mentoring the Next Generation of Medical Entrepreneurs',
    description:
      'Working with medical students, junior doctors, and early-stage health-tech founders who are navigating the intersection of medicine and entrepreneurship. The focus: cutting through noise, developing commercial instincts, and building identity alongside a clinical career.',
    status: 'Active',
    icon: 'Users',
  },
  {
    index: '04',
    tag: 'Brand · Identity',
    title: 'Healthcare Brand Architecture',
    description:
      'Building recognised personal and company brands at the intersection of clinical authority and technology — establishing positioning that attracts the right operators, investors, and collaborators.',
    status: 'Active',
    icon: 'Megaphone',
  },
  {
    index: '05',
    tag: 'Medicine · Georgia',
    title: 'Practicing Medicine Amidst the Build',
    description:
      'Maintaining active clinical practice in Georgia — not as a career endpoint, but as a live intelligence source. Ground-floor proximity to the operational realities that the rest of this work is designed to address.',
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
      <div className="build-header mb-16" style={{ opacity: 0 }}>
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
            className="build-row group cursor-default"
            style={{ opacity: 0 }}
          >
            {/* Top rule */}
            <div className="w-full h-px bg-border mb-6" aria-hidden="true" />

            <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-x-8 gap-y-4 pb-10">
              {/* Index number */}
              <div className="font-serif text-[2.5rem] md:text-[3.5rem] leading-none text-border select-none group-hover:text-muted/30 transition-colors duration-500 self-start pt-1">
                {project.index}
              </div>

              {/* Main content */}
              <div className="flex flex-col gap-3">
                {/* Tag + icon */}
                <div className="flex items-center gap-2">
                  <project.iconComponent size={11} strokeWidth={1.5} className="text-muted flex-shrink-0" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    {project.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-h2 text-fg group-hover:text-accent transition-colors duration-300 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-mono text-xs text-muted leading-relaxed max-w-2xl">
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
