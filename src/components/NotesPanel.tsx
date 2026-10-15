import { CloseIcon } from './Icons'
import type { SlideDef } from '../slides/deck'

const shortcuts: [string, string][] = [
  ['← →', 'Anterior / siguiente'],
  ['N', 'Notas'],
  ['Q', 'QR en pantalla completa'],
  ['F', 'Pantalla completa'],
  ['Esc', 'Cerrar'],
]

export function NotesPanel({
  open,
  slide,
  index,
  total,
  onClose,
}: {
  open: boolean
  slide: SlideDef
  index: number
  total: number
  onClose: () => void
}) {
  return (
    <aside
      aria-label="Notas del presentador"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-y-0 right-0 z-40 flex w-[min(26rem,92vw)] flex-col border-l border-line bg-surface/95 shadow-2xl backdrop-blur transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <p className="t-num text-xs text-muted">
            Pantalla {index + 1} / {total}
          </p>
          <h2 className="text-lg font-semibold">{slide.title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notas"
          className="flex size-11 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-ink"
        >
          <CloseIcon className="size-5" />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-4 text-base leading-relaxed text-ink/90">
          {slide.notes.map((n, i) => (
            <p key={i}>{n}</p>
          ))}
        </div>
      </div>
      <footer className="border-t border-line px-5 py-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-muted">
          {shortcuts.map(([k, v]) => (
            <div key={k} className="contents">
              <dt>
                <kbd className="t-num rounded border border-line bg-bg px-1.5 py-0.5 text-xs text-ink">{k}</kbd>
              </dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </footer>
    </aside>
  )
}
