'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.display = 'block'
    ring.style.display = 'block'

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      ring.style.width = '48px'
      ring.style.height = '48px'
      ring.style.borderColor = 'rgba(255,255,255,0.6)'
      dot.style.opacity = '0'
    }
    const onLeaveLink = () => {
      ring.style.width = '28px'
      ring.style.height = '28px'
      ring.style.borderColor = 'rgba(255,255,255,0.2)'
      dot.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(animate)

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    // Hide default cursor globally
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.style.cursor = ''
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-dot fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          display: 'none',
          width: '5px',
          height: '5px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          marginLeft: '-2.5px',
          marginTop: '-2.5px',
          willChange: 'transform',
        }}
      />
      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          display: 'none',
          width: '28px',
          height: '28px',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          marginLeft: '-14px',
          marginTop: '-14px',
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />
    </>
  )
}
