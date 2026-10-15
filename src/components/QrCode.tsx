import { QRCodeSVG } from 'qrcode.react'
import { QUIZ_URL } from '../lib/site'

/** Dark-on-white QR with a quiet zone so phone cameras read it reliably on a dark slide. */
export function QrCode({ className = '' }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Código QR hacia ${QUIZ_URL}`}
      className={`rounded-2xl bg-white p-[4%] shadow-[0_0_60px_-10px_rgba(56,189,248,0.45)] ${className}`}
    >
      <QRCodeSVG
        value={QUIZ_URL}
        size={512}
        level="M"
        bgColor="#ffffff"
        fgColor="#0b0f17"
        className="block h-full w-full"
        aria-hidden
      />
    </div>
  )
}
