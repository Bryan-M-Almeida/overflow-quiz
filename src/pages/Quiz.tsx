import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { questions } from '../data/quiz'
import { CheckIcon, ChevronLeft, XIcon } from '../components/Icons'

const STORAGE_KEY = 'overlay-quiz:last'
type Stored = { score: number; total: number; at: string }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Per-attempt option order; each option keeps its original index (0 = correct). */
const buildRound = () => questions.map((q) => shuffle(q.options.map((text, i) => ({ text, correct: i === 0 }))))

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Stored) : null
  } catch {
    return null
  }
}

function writeStored(v: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  } catch {
    /* storage unavailable (private mode, blocked) — result just isn't kept */
  }
}

const letters = ['A', 'B', 'C', 'D']

export default function Quiz() {
  const [attempt, setAttempt] = useState(0)
  const round = useMemo(buildRound, [attempt])
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [previous] = useState(readStored)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const total = questions.length
  const done = step >= total
  const q = questions[step]
  const options = round[step]

  useEffect(() => {
    document.title = 'Quiz · Overlay'
    return () => {
      document.title = 'La Técnica de Overlay'
    }
  }, [])

  // Move focus to the new question so screen readers and keyboards follow along.
  useEffect(() => {
    headingRef.current?.focus()
  }, [step, attempt])

  useEffect(() => {
    if (done) writeStored({ score, total, at: new Date().toISOString() })
  }, [done, score, total])

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (options[i].correct) setScore((s) => s + 1)
  }

  const next = () => {
    setPicked(null)
    setStep((s) => s + 1)
  }

  const restart = () => {
    setAttempt((a) => a + 1)
    setStep(0)
    setPicked(null)
    setScore(0)
  }

  const answered = picked !== null
  const wasRight = answered && options[picked].correct
  const progress = ((done ? total : step + (answered ? 1 : 0)) / total) * 100

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <header className="sticky top-0 z-10 border-b border-line/60 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Link to="/" className="-ml-2 flex size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink" aria-label="Volver a la presentación">
            <ChevronLeft className="size-6" />
          </Link>
          <p className="font-bold">Quiz · Overlay</p>
          <p className="t-num ml-auto text-sm text-muted" aria-live="polite">
            {done ? `${total} / ${total}` : `${step + 1} / ${total}`}
          </p>
        </div>
        <div
          className="h-1.5 bg-surface-2"
          role="progressbar"
          aria-label="Progreso"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done ? total : step}
        >
          <div className="h-full rounded-r-full bg-accent transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-6 sm:py-10">
        {!done ? (
          <div key={`${attempt}-${step}`} className="flex flex-1 flex-col gap-6 animate-enter">
            <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-bold leading-snug outline-none sm:text-3xl">
              {q.prompt}
            </h1>

            <ul className="flex flex-col gap-3">
              {options.map((o, i) => {
                const state = !answered ? 'idle' : o.correct ? 'right' : i === picked ? 'wrong' : 'dim'
                const tone = {
                  idle: 'border-line bg-surface hover:border-accent active:scale-[0.99]',
                  right: 'border-ok bg-ok/15',
                  wrong: 'border-bad bg-bad/15',
                  dim: 'border-line bg-surface opacity-55',
                }[state]
                return (
                  <li key={o.text}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      aria-disabled={answered}
                      className={`flex min-h-16 w-full items-center gap-4 rounded-2xl border-2 px-4 py-3 text-left text-base font-medium transition sm:text-lg ${tone}`}
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                          state === 'right' ? 'bg-ok text-bg' : state === 'wrong' ? 'bg-bad text-bg' : 'bg-surface-2 text-muted'
                        }`}
                        aria-hidden
                      >
                        {state === 'right' ? <CheckIcon className="size-5" /> : state === 'wrong' ? <XIcon className="size-5" /> : letters[i]}
                      </span>
                      <span className="min-w-0 flex-1">{o.text}</span>
                      {state === 'right' && <span className="sr-only">(correcta)</span>}
                      {state === 'wrong' && <span className="sr-only">(tu respuesta, incorrecta)</span>}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div aria-live="polite" className="flex flex-col gap-4">
              {answered && (
                <div className={`rounded-2xl border-l-4 px-4 py-3 animate-enter ${wasRight ? 'border-ok bg-ok/10' : 'border-bad bg-bad/10'}`}>
                  <p className={`font-bold ${wasRight ? 'text-ok' : 'text-bad'}`}>{wasRight ? '¡Correcto!' : 'Incorrecto'}</p>
                  <p className="mt-1 leading-relaxed text-ink/90">{q.explanation}</p>
                </div>
              )}
            </div>

            {answered && (
              <button
                type="button"
                onClick={next}
                className="mt-auto min-h-14 w-full rounded-2xl bg-accent px-6 text-lg font-bold text-bg transition hover:brightness-110 active:scale-[0.99] animate-enter"
              >
                {step === total - 1 ? 'Ver resultado' : 'Siguiente'}
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center animate-enter">
            <h1 ref={headingRef} tabIndex={-1} className="text-xl font-semibold text-muted outline-none">
              Tu puntaje
            </h1>
            <p className="t-num text-7xl font-extrabold sm:text-8xl">
              <span className={score >= Math.ceil(total * 0.6) ? 'text-ok' : 'text-pass2'}>{score}</span>
              <span className="text-4xl text-muted sm:text-5xl"> / {total}</span>
            </p>
            <p className="text-lg">
              {score === total ? '¡Perfecto! Dominas el overlay.' : score >= Math.ceil(total * 0.6) ? '¡Muy bien!' : 'Repasa el simulador y vuelve a intentarlo.'}
            </p>
            {previous && attempt === 0 && (
              <p className="t-num text-sm text-muted">
                Intento anterior en este navegador: {previous.score} / {previous.total}
              </p>
            )}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={restart}
                className="min-h-14 rounded-2xl bg-accent px-8 text-lg font-bold text-bg transition hover:brightness-110 active:scale-[0.99]"
              >
                Intentar de nuevo
              </button>
              <Link
                to="/bibliografia"
                className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-line px-8 text-lg font-semibold hover:border-ink"
              >
                Bibliografía
              </Link>
            </div>
            <p className="max-w-sm text-xs text-muted">Tu resultado se guarda solo en este navegador. No se recopilan datos personales.</p>
          </div>
        )}
      </main>
    </div>
  )
}
