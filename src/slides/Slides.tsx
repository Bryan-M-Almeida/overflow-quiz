import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useCountUp } from '../hooks/useCountUp'
import { fmt } from '../lib/format'
import { QUIZ_URL } from '../lib/site'
import { QrCode } from '../components/QrCode'
import { Illustrative } from '../components/Illustrative'
import {
  ArrowRight,
  BookIcon,
  ChipIcon,
  FlaskIcon,
  PersonIcon,
  ScaleIcon,
  SearchIcon,
} from '../components/Icons'

export type SlideProps = { active: boolean }

/** Staggered entrance; only animates once the slide is active. */
function Reveal({
  active,
  delay = 0,
  className = '',
  children,
  as: Tag = 'div',
}: {
  active: boolean
  delay?: number
  className?: string
  children: ReactNode
  as?: 'div' | 'li' | 'p' | 'h1' | 'h2'
}) {
  const style: CSSProperties = { animationDelay: `${delay}ms` }
  return (
    <Tag className={`${active ? 'animate-enter' : 'opacity-0'} ${className}`} style={style}>
      {children}
    </Tag>
  )
}

/* 1 · Portada */
export function Cover({ active }: SlideProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:gap-[6vh]">
      <Reveal active={active} className="flex items-center gap-3">
        <span className="h-3 w-16 rounded-full bg-root" />
        <span className="h-3 w-10 rounded-full bg-pass1" />
        <span className="h-3 w-6 rounded-full bg-pass2" />
      </Reveal>
      <Reveal active={active} delay={100} as="h1" className="t-display">
        Overlay
      </Reveal>
      <Reveal active={active} delay={220} as="p" className="t-big max-w-[18ch] text-muted">
        Programas más grandes que la memoria
      </Reveal>
      <Reveal active={active} delay={380} className="mt-4 grid gap-1 text-sm text-muted sm:text-base lg:text-lg">
        <p className="font-semibold text-ink">Bryan Maciel de Almeida</p>
        <p>Ingeniería de Sistemas · UPDS</p>
        <p>Docente: Ing. Alex Escobar</p>
      </Reveal>
    </div>
  )
}

/* 2 · ¿Y si no cabe? */
export function DoesNotFit({ active }: SlideProps) {
  const PROGRAM = 190
  const MEMORY = 140
  const w = (kb: number) => `${(kb / PROGRAM) * 100}%`
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-[7vh]">
      <Reveal active={active} as="h2" className="t-title">
        ¿Y si no cabe?
      </Reveal>
      <div className="flex flex-col gap-8 lg:gap-[5vh]">
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-4 t-body">
            <span className="font-semibold text-pass1">Programa</span>
            <span className="t-num font-bold">{PROGRAM} KB</span>
          </div>
          <div className="relative h-12 sm:h-16 lg:h-[9vh]">
            <div
              className="absolute inset-y-0 left-0 rounded-xl bg-pass1 transition-[width] duration-1000 ease-out"
              style={{ width: active ? w(PROGRAM) : '0%' }}
            />
            <div
              className="stripes-bad absolute inset-y-0 right-0 flex items-center justify-center rounded-r-xl border-2 border-bad transition-opacity delay-1000 duration-500"
              style={{ width: `calc(100% - ${w(MEMORY)})`, opacity: active ? 1 : 0 }}
            >
              <span className="t-num rounded-md bg-bg/80 px-2 text-sm font-bold text-bad sm:text-lg">
                +{PROGRAM - MEMORY} KB
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between gap-4 t-body" style={{ width: w(MEMORY) }}>
            <span className="font-semibold text-root">Memoria</span>
            <span className="t-num font-bold">{MEMORY} KB</span>
          </div>
          <div className="relative h-12 sm:h-16 lg:h-[9vh]">
            <div
              className="absolute inset-y-0 left-0 rounded-xl border-2 border-root bg-root/20 transition-[width] delay-300 duration-1000 ease-out"
              style={{ width: active ? w(MEMORY) : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* 3 · Metodología */
export function Method({ active }: SlideProps) {
  const items = [
    { Icon: SearchIcon, text: 'Revisar fuentes', color: 'text-root' },
    { Icon: FlaskIcon, text: 'Hacer ejemplos', color: 'text-pass1' },
    { Icon: ScaleIcon, text: 'Comparar técnicas', color: 'text-pass2' },
  ]
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-[8vh]">
      <Reveal active={active} as="h2" className="t-title">
        Metodología
      </Reveal>
      <ol className="grid gap-5 sm:grid-cols-3 sm:gap-6">
        {items.map(({ Icon, text, color }, i) => (
          <Reveal
            key={text}
            as="li"
            active={active}
            delay={150 + i * 150}
            className="flex items-center gap-5 rounded-2xl border border-line bg-surface p-5 sm:flex-col sm:items-start sm:p-7 lg:p-[4vh]"
          >
            <Icon className={`size-12 shrink-0 sm:size-16 lg:size-[10vh] ${color}`} />
            <span className="t-big">{text}</span>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

/* 5 · Resultado */
export function Result({ active }: SlideProps) {
  const before = useCountUp(190, active, 900)
  const after = useCountUp(130, active, 1400, 190)
  const saved = useCountUp(60, active, 1600)
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:gap-[6vh]">
      <Reveal active={active} as="h2" className="t-title">
        Resultado
      </Reveal>
      <Reveal
        active={active}
        delay={120}
        className="t-num flex flex-wrap items-center gap-x-6 gap-y-2 text-[clamp(2.5rem,min(8vw,13vh),7.5rem)] font-bold leading-none"
      >
        <span className="text-muted line-through decoration-bad decoration-4">{fmt(before)}</span>
        <ArrowRight className="size-[0.7em] text-muted" />
        <span className="text-ok">
          {fmt(after)}
          <span className="text-[0.4em] text-muted"> KB</span>
        </span>
      </Reveal>
      <Reveal active={active} delay={260} className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="t-num rounded-2xl bg-ok/15 px-5 py-3 text-[clamp(1.75rem,min(4.5vw,7.5vh),4rem)] font-bold text-ok">
          {fmt(-saved)} KB
        </span>
        <span className="t-big">Ahorro</span>
      </Reveal>
      <Reveal active={active} delay={400} className="flex flex-col gap-2">
        <p className="t-body rounded-xl border border-line bg-surface px-5 py-4 font-semibold">
          <span className="text-root">Raíz</span> + <span className="text-pass2">módulo más grande</span>
          <span className="t-num text-muted"> = 60 + 70</span>
        </p>
        <Illustrative />
      </Reveal>
    </div>
  )
}

/* 6 · ¿Quién decide? */
export function WhoDecides({ active }: SlideProps) {
  const rows = [
    { tech: 'Overlay', who: 'Programador', Icon: PersonIcon, tone: 'text-pass2 border-pass2/60 bg-pass2/10' },
    { tech: 'Intercambio', who: 'Sistema', Icon: ChipIcon, tone: 'text-root border-root/60 bg-root/10' },
    { tech: 'Memoria virtual', who: 'Sistema', Icon: ChipIcon, tone: 'text-root border-root/60 bg-root/10' },
  ]
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:gap-[7vh]">
      <Reveal active={active} as="h2" className="t-title">
        ¿Quién decide?
      </Reveal>
      <ul className="flex flex-col gap-4 lg:gap-[2.5vh]">
        {rows.map(({ tech, who, Icon, tone }, i) => (
          <Reveal
            key={tech}
            as="li"
            active={active}
            delay={150 + i * 160}
            className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-6"
          >
            <span className="t-big">{tech}</span>
            <ArrowRight className="hidden size-8 text-muted sm:block" />
            <span className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-3 t-big ${tone}`}>
              <Icon className="size-[1.1em] shrink-0" />
              {who}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

/* 7 · Gana memoria, pierde tiempo */
const T = 10 // s, base run time (illustrative)
const LOAD = 0.5 // s per load (illustrative)
const SEQ_LOADS = 2
const ALT_LOADS = 200

function SwapSlot({ alternating }: { alternating: boolean }) {
  const anim = alternating ? ['swap-a', 'swap-b'] : ['once-a', 'once-b']
  const timing = alternating ? '0.5s steps(1) infinite' : '3s steps(1) infinite'
  return (
    <div className="relative h-10 w-24 shrink-0 overflow-hidden rounded-lg border-2 border-pass1/60 bg-pass1/10 sm:h-12 sm:w-28" aria-hidden>
      <span
        className="absolute inset-0.5 flex items-center justify-center rounded-md bg-pass1 text-sm font-bold text-bg"
        style={{ animation: `${anim[0]} ${timing}` }}
      >
        P1
      </span>
      <span
        className="absolute inset-0.5 flex items-center justify-center rounded-md bg-pass2 text-sm font-bold text-bg opacity-0"
        style={{ animation: `${anim[1]} ${timing}` }}
      >
        P2
      </span>
    </div>
  )
}

export function Tradeoff({ active }: SlideProps) {
  const seqPct = useCountUp(((SEQ_LOADS * LOAD) / T) * 100, active, 900)
  const altPct = useCountUp(((ALT_LOADS * LOAD) / T) * 100, active, 1800)
  const max = T + ALT_LOADS * LOAD
  const rows = [
    { label: 'En secuencia', loads: SEQ_LOADS, pct: seqPct, alt: false, tone: 'bg-ok', text: 'text-ok' },
    { label: 'Alternando', loads: ALT_LOADS, pct: altPct, alt: true, tone: 'bg-bad', text: 'text-bad' },
  ]
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:gap-[6vh]">
      <Reveal active={active} as="h2" className="t-title">
        Gana memoria, pierde tiempo
      </Reveal>
      <div className="flex flex-col gap-8 lg:gap-[5vh]">
        {rows.map((r, i) => (
          <Reveal key={r.label} active={active} delay={150 + i * 200} className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <div className="flex items-center gap-4">
                {active && <SwapSlot alternating={r.alt} />}
                <span className="t-big">{r.label}</span>
              </div>
              <span className={`t-num text-[clamp(2rem,min(5vw,8vh),4.25rem)] font-bold leading-none ${r.text}`}>
                +{fmt(r.pct)} %
              </span>
            </div>
            <div className="flex h-5 overflow-hidden rounded-full bg-surface-2 sm:h-6" aria-hidden>
              <div className="h-full bg-muted/50" style={{ width: `${(T / max) * 100}%` }} />
              <div
                className={`h-full ${r.tone} transition-[width] duration-[1500ms] ease-out`}
                style={{ width: active ? `${((r.loads * LOAD) / max) * 100}%` : '0%' }}
              />
            </div>
            <p className="t-num text-sm text-muted sm:text-base">
              {r.loads} cargas × {fmt(LOAD, 1)} s = +{fmt(r.loads * LOAD)} s
            </p>
          </Reveal>
        ))}
      </div>
      <p className="t-num text-xs text-muted sm:text-sm">
        * Valores ilustrativos · T = {T} s · {fmt(LOAD, 1)} s por carga
      </p>
    </div>
  )
}

/* 8 · NEXUS */
export function Nexus({ active }: SlideProps) {
  const saved = useCountUp(258, active, 1500)
  const ramNow = useCountUp(114, active, 1500, 372)
  const firstResp = useCountUp(1.3, active, 1700, 30.2)
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 lg:gap-[5vh]">
      <div className="flex flex-col gap-4">
        <Reveal active={active} className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-pass2/60 bg-pass2/10 px-3 py-1 text-sm font-semibold text-pass2 sm:text-base">
            <span className="size-2 rounded-full bg-pass2" style={{ animation: 'blink 1.6s ease-in-out infinite' }} />
            En desarrollo · pronto en pruebas
          </span>
          <span className="rounded-full border border-line px-3 py-1 text-sm text-muted sm:text-base">≠ overlay</span>
        </Reveal>
        <Reveal active={active} delay={100} as="h2" className="t-title">
          NEXUS: carga dinámica
        </Reveal>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
        <Reveal active={active} delay={220} className="rounded-2xl border border-line bg-surface p-5 lg:p-[3.5vh]">
          <p className="text-muted t-body">Whisper · RAM</p>
          <p className="t-num mt-2 text-[clamp(2.25rem,min(5vw,9vh),4.5rem)] font-bold leading-none text-ok">
            {fmt(-saved)} MB
          </p>
          <p className="t-num mt-3 text-muted t-body">
            372 → <span className="text-ink">{fmt(ramNow)}</span> MB
          </p>
        </Reveal>
        <Reveal active={active} delay={340} className="rounded-2xl border border-line bg-surface p-5 lg:p-[3.5vh]">
          <p className="text-muted t-body">Recarga</p>
          <p className="t-num mt-2 text-[clamp(2.25rem,min(5vw,9vh),4.5rem)] font-bold leading-none text-pass2">
            ≈ 0,9 s
          </p>
        </Reveal>
        <Reveal active={active} delay={460} className="rounded-2xl border border-line bg-surface p-5 lg:p-[3.5vh]">
          <p className="text-muted t-body">Primera respuesta</p>
          <p className="t-num mt-2 text-[clamp(2.25rem,min(5vw,9vh),4.5rem)] font-bold leading-none text-root">
            {fmt(firstResp, 1)} s
          </p>
          <p className="t-num mt-3 text-muted t-body">30,2 → 1,3 s</p>
        </Reveal>
      </div>
    </div>
  )
}

/* 9 · Ejes y ODS 9 */
export function Sdg({ active }: SlideProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:gap-[6vh]">
      <Reveal active={active} as="h2" className="t-title">
        Ejes y ODS 9
      </Reveal>
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <Reveal
          active={active}
          delay={150}
          className="flex aspect-square w-40 shrink-0 flex-col items-center justify-center rounded-3xl bg-[#fd6925] text-[#1a0d05] sm:w-52 lg:w-[30vh]"
        >
          <span className="text-lg font-bold sm:text-xl">ODS</span>
          <span className="t-num text-7xl font-extrabold leading-none sm:text-8xl lg:text-[13vh]">9</span>
        </Reveal>
        <div className="flex flex-col gap-6">
          <Reveal active={active} delay={260} as="p" className="t-big t-num">
            ODS 9 · Meta 9.5
          </Reveal>
          <Reveal active={active} delay={380} className="flex flex-wrap gap-3">
            <span className="rounded-full border-2 border-root bg-root/10 px-5 py-2.5 t-body font-semibold text-root">
              Tecnologías emergentes
            </span>
            <span className="rounded-full border-2 border-pass1 bg-pass1/10 px-5 py-2.5 t-body font-semibold text-pass1">
              Pensamiento crítico
            </span>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

/* 10 · Conclusiones */
export function Conclusions({ active }: SlideProps) {
  const items = [
    { text: 'Comparten área', tone: 'bg-pass1' },
    { text: 'Ahorran memoria', tone: 'bg-ok' },
    { text: 'Cuestan tiempo', tone: 'bg-pass2' },
  ]
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:gap-[7vh]">
      <Reveal active={active} as="h2" className="t-title">
        Conclusiones
      </Reveal>
      <ol className="flex flex-col gap-6 lg:gap-[4vh]">
        {items.map(({ text, tone }, i) => (
          <Reveal key={text} as="li" active={active} delay={180 + i * 220} className="flex items-center gap-5">
            <span className={`t-num flex size-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-bg sm:size-14 sm:text-2xl ${tone}`}>
              {i + 1}
            </span>
            <span className="t-big">{text}</span>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

/* 11 · ¿Preguntas? */
export function Questions({ active }: SlideProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
      <div className="flex flex-col gap-5 text-center md:text-left">
        <Reveal active={active} as="h2" className="t-display">
          ¿Preguntas?
        </Reveal>
        <Reveal active={active} delay={150} as="p" className="t-big text-root">
          Escanea y juega
        </Reveal>
        <Reveal active={active} delay={250} className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted md:justify-start">
          <a href={QUIZ_URL} className="t-num underline-offset-4 hover:text-ink hover:underline">
            {QUIZ_URL.replace(/^https?:\/\//, '')}
          </a>
          <Link to="/bibliografia" className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-ink hover:underline">
            <BookIcon className="size-4" />
            Bibliografía
          </Link>
        </Reveal>
      </div>
      <Reveal active={active} delay={200} className="w-[min(78vw,22rem)] shrink-0 md:w-[min(40vw,58vh)]">
        <QrCode className={active ? 'animate-pop' : ''} />
      </Reveal>
    </div>
  )
}
