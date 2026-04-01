'use client'

const ITEMS = [
  'Clinical AI',
  'Healthcare Infrastructure',
  'Cross-border Operations',
  'Brand Architecture',
  'Smart Home · Caucasus',
  'AI Workflow Automation',
  'Venture Architecture',
  'Physician · Mentor',
  'Georgia · Azerbaijan · Uzbekistan · Armenia',
  'Medventure Holdings',
]

export default function Marquee() {
  const all = [...ITEMS, ...ITEMS]

  return (
    <div
      className="w-full overflow-hidden border-y border-border py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee flex gap-12 whitespace-nowrap">
        {all.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {item}
            </span>
            <span className="text-border text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
