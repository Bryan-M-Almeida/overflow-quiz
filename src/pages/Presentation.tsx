import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { deck } from '../slides/deck'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { NotesPanel } from '../components/NotesPanel'
import { QrOverlay } from '../components/QrOverlay'
import {
  BookIcon,
  ChevronLeft,
  ChevronRight,
  ExpandIcon,
  GameIcon,
  NotesIcon,
  QrIcon,
} from '../components/Icons'

const total = deck.length

function indexFromHash(): number {
  const n = parseInt(window.location.hash.replace('#', ''), 10)
  return Number.isFinite(n) && n >= 1 && n <= total ? n - 1 : 0
}

function isTypingTarget(t: EventTarget | null) {
  return t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))
}

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen?.()
  else void document.documentElement.requestFullscreen?.().catch(() => {})
}

const iconBtn =
  'flex size-11 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent'

export default function Presentation() {
  // Slide mode needs a wide-enough and tall-enough viewport; otherwise sections stack and scroll.
  const slideMode = useMediaQuery('(min-width: 1024px) and (min-height: 600px)')
  const [index, setIndex] = useState(indexFromHash)
  const [dir, setDir] = useState<1 | -1>(1)
  const [notesOpen, setNotesOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([indexFromHash()]))
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const go = useCallback((to: number) => {
    const next = Math.max(0, Math.min(total - 1, to))
    setIndex((cur) => {
      if (next !== cur) setDir(next > cur ? 1 : -1)
      return next
    })
  }, [])

  // Keep the URL hash in sync so a reload returns to the same screen.
  useEffect(() => {
    const hash = `#${index + 1}`
    if (window.location.hash !== hash) history.replaceState(null, '', hash)
  }, [index])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || isTypingTarget(e.target)) return
      const onButton = e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement
      const key = e.key
      if (key === 'Escape') {
        if (qrOpen) setQrOpen(false)
        else if (notesOpen) setNotesOpen(false)
        return
      }
      if (key === 'n' || key === 'N') return setNotesOpen((o) => !o)
      if (key === 'q' || key === 'Q') return setQrOpen((o) => !o)
      if (key === 'f' || key === 'F') return toggleFullscreen()
      if (qrOpen) return

      let target: number | null = null
      if (key === 'ArrowRight' || key === 'PageDown' || (key === ' ' && !onButton && !e.shiftKey)) target = index + 1
      else if (key === 'ArrowLeft' || key === 'PageUp' || (key === ' ' && !onButton && e.shiftKey)) target = index - 1
      else if (key === 'Home') target = 0
      else if (key === 'End') target = total - 1
      if (target === null) return

      e.preventDefault()
      if (slideMode) go(target)
      else sectionRefs.current[Math.max(0, Math.min(total - 1, target))]?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, slideMode, go, qrOpen, notesOpen])

  // Scroll mode: track which section is centered and which have been seen (to trigger animations).
  useEffect(() => {
    if (slideMode) return
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[]
    const current = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setIndex(Number((en.target as HTMLElement).dataset.index))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    const reveal = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((en) => en.isIntersecting).map((en) => Number((en.target as HTMLElement).dataset.index))
        if (hits.length) setSeen((s) => new Set([...s, ...hits]))
      },
      { threshold: 0.2 },
    )
    els.forEach((el) => {
      current.observe(el)
      reveal.observe(el)
    })
    // Jump to the hashed section when entering scroll mode.
    const start = indexFromHash()
    if (start > 0) els[start]?.scrollIntoView()
    return () => {
      current.disconnect()
      reveal.disconnect()
    }
  }, [slideMode])

  const slide = deck[index]

  return (
    <div className="min-h-dvh bg-bg text-ink">
      {slideMode ? (
        <main className="relative flex h-dvh flex-col overflow-hidden">
          <section
            key={slide.id}
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${total}: ${slide.title}`}
            className={`flex min-h-0 flex-1 items-center overflow-y-auto px-[6vw] py-[5vh] ${
              dir === 1 ? 'animate-slide-next' : 'animate-slide-prev'
            }`}
          >
            <slide.Component active />
          </section>

          {/* Bottom bar */}
          <nav aria-label="Navegación de la presentación" className="relative flex h-16 shrink-0 items-center gap-2 px-[2vw]">
            <div className="absolute inset-x-0 top-0 h-1 bg-surface-2" aria-hidden>
              <div
                className="h-full bg-accent transition-[width] duration-500"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
            <button type="button" className={iconBtn} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Pantalla anterior" title="Anterior (←)">
              <ChevronLeft className="size-6" />
            </button>
            <p className="t-num min-w-16 text-center text-sm text-muted" aria-live="polite">
              {index + 1} / {total}
            </p>
            <button type="button" className={iconBtn} onClick={() => go(index + 1)} disabled={index === total - 1} aria-label="Pantalla siguiente" title="Siguiente (→)">
              <ChevronRight className="size-6" />
            </button>
            <div className="ml-auto flex items-center gap-1">
              <button type="button" className={iconBtn} onClick={() => setNotesOpen((o) => !o)} aria-pressed={notesOpen} aria-label="Notas (N)" title="Notas (N)">
                <NotesIcon className="size-5" />
              </button>
              <button type="button" className={iconBtn} onClick={() => setQrOpen(true)} aria-label="Código QR (Q)" title="Código QR (Q)">
                <QrIcon className="size-5" />
              </button>
              <Link to="/quiz" className={iconBtn} aria-label="Quiz" title="Quiz">
                <GameIcon className="size-5" />
              </Link>
              <Link to="/bibliografia" className={iconBtn} aria-label="Bibliografía" title="Bibliografía">
                <BookIcon className="size-5" />
              </Link>
              <button type="button" className={iconBtn} onClick={toggleFullscreen} aria-label="Pantalla completa (F)" title="Pantalla completa (F)">
                <ExpandIcon className="size-5" />
              </button>
            </div>
          </nav>
        </main>
      ) : (
        <>
          <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/85 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
              <a href="#1" className="mr-auto font-bold tracking-tight">
                Overlay
              </a>
              <Link to="/quiz" className="flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-root hover:bg-surface">
                <GameIcon className="size-5" />
                Quiz
              </Link>
              <Link to="/bibliografia" className={iconBtn} aria-label="Bibliografía" title="Bibliografía">
                <BookIcon className="size-5" />
              </Link>
              <button type="button" className={iconBtn} onClick={() => setNotesOpen((o) => !o)} aria-pressed={notesOpen} aria-label="Notas" title="Notas (N)">
                <NotesIcon className="size-5" />
              </button>
            </div>
            <div className="h-0.5 bg-surface-2" aria-hidden>
              <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${((index + 1) / total) * 100}%` }} />
            </div>
          </header>
          <main>
            {deck.map((s, i) => (
              <section
                key={s.id}
                id={String(i + 1)}
                data-index={i}
                ref={(el) => {
                  sectionRefs.current[i] = el
                }}
                aria-label={s.title}
                className="flex min-h-[calc(100svh-3.5rem)] scroll-mt-14 items-center border-b border-line/40 px-4 py-16 sm:px-8"
              >
                <s.Component active={seen.has(i)} />
              </section>
            ))}
          </main>
        </>
      )}

      <NotesPanel open={notesOpen} slide={slide} index={index} total={total} onClose={() => setNotesOpen(false)} />
      <QrOverlay open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  )
}
