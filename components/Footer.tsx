'use client'

import { ExternalLink, Globe, Mail } from 'lucide-react'

const LINKS = [
  {
    icon: ExternalLink,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aqeeljafar10/',
  },
  {
    icon: Globe,
    label: 'Meloc',
    href: '#',
  },
  {
    icon: Mail,
    label: 'Contact',
    href: '#engage',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <footer className="px-6 pb-16 max-w-5xl mx-auto" aria-label="Footer">
      <div className="w-full h-px bg-border mb-10" aria-hidden="true" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Name mark */}
        <span className="font-serif text-muted tracking-widest text-sm">
          AQEEL JAFAR
        </span>

        {/* Icon links */}
        <div className="flex items-center gap-5">
          {LINKS.map(({ icon: Icon, label, href }) => (
            <button
              key={label}
              onClick={() => handleClick(href)}
              aria-label={label}
              className="text-muted hover:text-fg transition-colors duration-200 group"
            >
              <Icon
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </button>
          ))}
        </div>

        {/* Right: tagline + year */}
        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/50">
            Physician · AI Pioneer · Venture Architect · Mentor
          </span>
          <span className="font-mono text-[9px] text-muted/30">
            © {year}
          </span>
        </div>
      </div>
    </footer>
  )
}
