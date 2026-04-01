import type { gsap as GSAPType } from 'gsap'

// ─── Reusable animation configs ──────────────────────────────────────────────

export const fadeUp = {
  from: { y: 40, opacity: 0 },
  to: { y: 0, opacity: 1 },
}

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
}

export const clipReveal = {
  from: { clipPath: 'inset(100% 0 0 0)' },
  to: { clipPath: 'inset(0% 0 0 0)' },
}

export const scaleXReveal = {
  from: { scaleX: 0, transformOrigin: 'left center' },
  to: { scaleX: 1 },
}

// ─── ScrollTrigger defaults ───────────────────────────────────────────────────

export const scrollTriggerDefaults = {
  start: 'top 82%',
  end: 'top 40%',
  toggleActions: 'play none none reverse' as const,
}

// ─── Stagger presets ──────────────────────────────────────────────────────────

export const staggerFast = 0.07
export const staggerMedium = 0.12
export const staggerSlow = 0.18

// ─── Easing presets ───────────────────────────────────────────────────────────

export const easeOut = 'power3.out'
export const easeInOut = 'power2.inOut'
export const easeElastic = 'elastic.out(1, 0.75)'

// ─── Helper: check reduced motion ────────────────────────────────────────────

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ─── Helper: register ScrollTrigger plugin ────────────────────────────────────

export async function registerScrollTrigger() {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  return { gsap, ScrollTrigger }
}

// ─── Hero load sequence ───────────────────────────────────────────────────────
// Used by Hero.tsx for the initial page load animation

export function animateHero(gsap: typeof GSAPType, elements: {
  nameWords: NodeListOf<Element> | Element[]
  divider: Element | null
  roles: NodeListOf<Element> | Element[]
  thesis: Element | null
  scrollCue: Element | null
}) {
  if (prefersReducedMotion()) {
    // Instantly show everything without animation
    gsap.set([...Array.from(elements.nameWords), elements.divider, ...Array.from(elements.roles), elements.thesis, elements.scrollCue], {
      opacity: 1,
      y: 0,
      scaleX: 1,
    })
    return
  }

  const tl = gsap.timeline({ defaults: { ease: easeOut } })

  // 1. Name words cascade up
  tl.fromTo(
    elements.nameWords,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: staggerFast }
  )
  // 2. Divider scaleX reveal
  .fromTo(
    elements.divider,
    { scaleX: 0, transformOrigin: 'left center' },
    { scaleX: 1, duration: 0.7, ease: easeInOut },
    '-=0.3'
  )
  // 3. Role tags stagger up
  .fromTo(
    elements.roles,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: staggerFast },
    '-=0.2'
  )
  // 4. Thesis line fade in
  .fromTo(
    elements.thesis,
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    '-=0.1'
  )
  // 5. Scroll cue
  .fromTo(
    elements.scrollCue,
    { opacity: 0 },
    { opacity: 1, duration: 0.5 },
    '+=0.4'
  )

  return tl
}

// ─── Section entry animation ──────────────────────────────────────────────────
// Used by all scroll-triggered sections

export function animateSectionEntry(
  gsap: typeof GSAPType,
  ScrollTrigger: { create: (vars: object) => void },
  trigger: Element,
  targets: Element | Element[] | NodeListOf<Element>,
  options: { stagger?: number; delay?: number; y?: number } = {}
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 })
    return
  }

  gsap.fromTo(
    targets,
    { y: options.y ?? 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: easeOut,
      stagger: options.stagger ?? 0,
      delay: options.delay ?? 0,
      scrollTrigger: {
        trigger,
        ...scrollTriggerDefaults,
      },
    }
  )
}
