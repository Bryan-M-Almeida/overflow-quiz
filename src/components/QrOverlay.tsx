import { useEffect, useRef } from 'react'
import { QrCode } from './QrCode'
import { CloseIcon } from './Icons'
import { QUIZ_URL } from '../lib/site'

export function QrOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Código QR del quiz"
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-[3vh] bg-bg/95 p-4 backdrop-blur animate-enter"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar código QR"
        className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink"
      >
        <CloseIcon className="size-6" />
      </button>
      <QrCode className="w-[min(90vw,78vh)] animate-pop" />
      <p className="text-center">
        <span className="t-big block text-root">Escanea y juega</span>
        <span className="t-num mt-1 block text-sm text-muted sm:text-base">{QUIZ_URL.replace(/^https?:\/\//, '')}</span>
      </p>
    </div>
  )
}
