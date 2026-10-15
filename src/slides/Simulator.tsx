import { useEffect, useState, type CSSProperties } from 'react'
import { useCountUp } from '../hooks/useCountUp'
import { fmt } from '../lib/format'
import { Illustrative } from '../components/Illustrative'
import { CheckIcon, XIcon } from '../components/Icons'

/* Illustrative example: root 60 KB, pass 1 = 60 KB, pass 2 = 70 KB. */
const ROOT = 60
const PASSES = { 1: 60, 2: 70 } as const
const AREA = Math.max(PASSES[1], PASSES[2]) // overlay area = largest module
const NEED_OVERLAY = ROOT + AREA // 130
const NEED_FULL = ROOT + PASSES[1] + PASSES[2] // 190
const CAPACITIES = [120, 130, 140, 190] as const
const SCALE = 200 // KB represented by the full track width

type Pass = 1 | 2
const pct = (kb: number) => `${(kb / SCALE) * 100}%`

const passColor: Record<Pass, string> = { 1: 'bg-pass1', 2: 'bg-pass2' }

function Block({
  start,
  size,
  className,
  label,
  kb,
  style,
}: {
  start: number
  size: number
  className: string
  label: string
  kb: number
  style?: CSSProperties
}) {
  return (
    <div
      className={`absolute inset-y-0 flex flex-col items-center justify-center overflow-hidden rounded-lg text-bg ${className}`}
      style={{ left: pct(start), width: pct(size), ...style }}
    >
      <span className="text-[11px] font-bold leading-tight sm:text-sm lg:text-base">{label}</span>
      <span className="t-num text-[11px] font-semibold leading-tight sm:text-sm lg:text-base">{kb} KB</span>
    </div>
  )
}

export function Simulator({ active }: { active: boolean }) {
  const [cap, setCap] = useState<number>(140)
  const [overlay, setOverlay] = useState(true)
  const [loaded, setLoaded] = useState<{ current: Pass | null; prev: Pass | null; key: number }>({
    current: null,
    prev: null,
    key: 0,
  })

  // Drop the outgoing module after its exit animation.
  useEffect(() => {
    if (loaded.prev === null) return
    const id = window.setTimeout(() => setLoaded((s) => ({ ...s, prev: null })), 450)
    return () => window.clearTimeout(id)
  }, [loaded.key, loaded.prev])

  const load = (p: Pass) => {
    setOverlay(true)
    setLoaded((s) => (s.current === p ? s : { current: p, prev: s.current, key: s.key + 1 }))
  }

  const used = overlay ? ROOT + (loaded.current ? PASSES[loaded.current] : 0) : NEED_FULL
  const need = overlay ? NEED_OVERLAY : NEED_FULL
  const fits = cap >= need
  const usedAnim = useCountUp(used, active, 600, ROOT)
  const free = cap - need
  const over = need - cap

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6 lg:gap-[3vh]">
      {/* Header row: title, capacity control, live counter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="t-title">Simulador</h2>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <div>
            <p id="cap-label" className="mb-1.5 text-sm text-muted">
              Memoria disponible (KB)
            </p>
            <div role="group" aria-labelledby="cap-label" className="flex rounded-xl border border-line bg-surface p-1">
              {CAPACITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cap === c}
                  onClick={() => setCap(c)}
                  className={`t-num min-h-11 min-w-11 rounded-lg px-2.5 text-sm font-semibold transition-colors sm:px-3.5 sm:text-base ${
                    cap === c ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm text-muted">Memoria usada</p>
            <p className="t-num text-3xl font-bold sm:text-4xl">
              {fmt(usedAnim)}
              <span className="text-lg text-muted sm:text-xl"> / {cap} KB</span>
            </p>
          </div>
        </div>
      </div>

      {/* Memory track */}
      <div className="rounded-2xl border border-line bg-surface px-3 pt-4 pb-3 sm:px-5 sm:pt-5">
        <div
          className="relative h-24 sm:h-28 lg:h-[clamp(5.5rem,15vh,9rem)]"
          role="img"
          aria-label={
            overlay
              ? `Raíz ${ROOT} KB y área de overlay ${AREA} KB${loaded.current ? ` con la pasada ${loaded.current}` : ''}; memoria de ${cap} KB`
              : `Programa completo de ${NEED_FULL} KB en memoria de ${cap} KB`
          }
        >
          {/* capacity frame */}
          <div
            className="absolute -inset-y-1.5 left-0 rounded-xl border-2 border-dashed border-muted/70 transition-[width] duration-500"
            style={{ width: pct(cap) }}
          />
          <Block start={0} size={ROOT} className="bg-root" label="Raíz" kb={ROOT} />

          {overlay ? (
            <>
              {/* reserved overlay area */}
              <div
                className="absolute inset-y-0 rounded-lg border-2 border-pass1/60 bg-pass1/10"
                style={{ left: pct(ROOT), width: pct(AREA) }}
              />
              {loaded.prev && (
                <Block
                  key={`prev-${loaded.key}`}
                  start={ROOT}
                  size={PASSES[loaded.prev]}
                  className={`${passColor[loaded.prev]} animate-drop-out`}
                  label={`Pasada ${loaded.prev}`}
                  kb={PASSES[loaded.prev]}
                />
              )}
              {loaded.current && (
                <Block
                  key={`cur-${loaded.key}`}
                  start={ROOT}
                  size={PASSES[loaded.current]}
                  className={`${passColor[loaded.current]} animate-drop-in`}
                  label={`Pasada ${loaded.current}`}
                  kb={PASSES[loaded.current]}
                />
              )}
              {!loaded.current && !loaded.prev && (
                <div
                  className="absolute inset-y-0 flex flex-col items-center justify-center text-[11px] font-semibold leading-tight text-pass1 sm:text-sm lg:text-base"
                  style={{ left: pct(ROOT), width: pct(AREA) }}
                >
                  <span>Overlay</span>
                  <span className="t-num">{AREA} KB</span>
                </div>
              )}
            </>
          ) : (
            <>
              <Block start={ROOT} size={PASSES[1]} className="bg-pass1 animate-enter" label="Pasada 1" kb={PASSES[1]} />
              <Block
                start={ROOT + PASSES[1]}
                size={PASSES[2]}
                className="bg-pass2 animate-enter"
                label="Pasada 2"
                kb={PASSES[2]}
                style={{ animationDelay: '120ms' }}
              />
            </>
          )}

          {/* overflow beyond capacity */}
          {over > 0 && (
            <div
              key={`over-${cap}-${overlay}`}
              className="stripes-bad absolute -inset-y-1.5 rounded-r-lg border-2 border-bad animate-pop"
              style={{ left: pct(cap), width: pct(over) }}
            />
          )}
        </div>

        {/* scale */}
        <div className="t-num relative mt-3 h-9 text-[11px] text-muted sm:text-xs" aria-hidden>
          <span className="absolute left-0">0</span>
          <span className="absolute -translate-x-1/2" style={{ left: pct(ROOT) }}>
            {ROOT}
          </span>
          <span className="absolute -translate-x-1/2" style={{ left: pct(need) }}>
            {need}
          </span>
          <span
            className={`absolute top-4 -translate-x-1/2 whitespace-nowrap font-bold transition-[left] duration-500 ${fits ? 'text-ok' : 'text-bad'}`}
            style={{ left: pct(cap) }}
          >
            ▲ {cap}
          </span>
        </div>
      </div>

      {/* Controls + verdict */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={() => load(1)}
            aria-pressed={overlay && loaded.current === 1}
            className="min-h-12 rounded-xl border-2 border-pass1 px-4 font-semibold text-pass1 transition-colors hover:bg-pass1/15 aria-pressed:bg-pass1 aria-pressed:text-bg sm:text-lg"
          >
            Cargar Pasada 1
          </button>
          <button
            type="button"
            onClick={() => load(2)}
            aria-pressed={overlay && loaded.current === 2}
            className="min-h-12 rounded-xl border-2 border-pass2 px-4 font-semibold text-pass2 transition-colors hover:bg-pass2/15 aria-pressed:bg-pass2 aria-pressed:text-bg sm:text-lg"
          >
            Cargar Pasada 2
          </button>
          <button
            type="button"
            onClick={() => setOverlay((o) => !o)}
            aria-pressed={!overlay}
            className="col-span-2 min-h-12 rounded-xl border-2 border-bad px-4 font-semibold text-bad transition-colors hover:bg-bad/15 aria-pressed:bg-bad aria-pressed:text-bg sm:text-lg"
          >
            Sin overlay
          </button>
        </div>

        <div
          role="status"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold sm:text-lg ${
            fits ? 'bg-ok/15 text-ok' : 'bg-bad/15 text-bad'
          }`}
        >
          {fits ? <CheckIcon className="size-6 shrink-0" /> : <XIcon className="size-6 shrink-0" />}
          <span>
            {fits ? 'Cabe' : 'No cabe'}
            <span className="t-num font-normal">
              {' · '}
              {fits ? `${free} KB libres` : `necesita ${need} KB`}
            </span>
          </span>
        </div>
      </div>

      <Illustrative />
    </div>
  )
}
