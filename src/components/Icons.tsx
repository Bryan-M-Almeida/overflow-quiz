import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const ChevronLeft = (p: P) => (
  <svg {...base(p)}><path d="m15 18-6-6 6-6" /></svg>
)
export const ChevronRight = (p: P) => (
  <svg {...base(p)}><path d="m9 18 6-6-6-6" /></svg>
)
export const NotesIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 5h16M4 10h16M4 15h10M4 20h7" /></svg>
)
export const QrIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
  </svg>
)
export const BookIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2.5Z" />
    <path d="M8 7h7M8 11h5" />
  </svg>
)
export const GameIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="7" width="19" height="11" rx="5" />
    <path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 14h.01" />
  </svg>
)
export const ExpandIcon = (p: P) => (
  <svg {...base(p)}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
)
export const CloseIcon = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const SearchIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="3" width="12" height="16" rx="2" />
    <path d="M7.5 8h5M7.5 11.5h3" />
    <circle cx="16" cy="16" r="3.5" />
    <path d="m18.6 18.6 2.9 2.9" />
  </svg>
)
export const FlaskIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 3h6M10 3v6.5L4.6 18.4A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.4-2.6L14 9.5V3" />
    <path d="M7.5 15h9" />
  </svg>
)
export const ScaleIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3v18M7 21h10M5 7h14M12 4.5 5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7M19 7l-3 7a3.5 3.5 0 0 0 6 0l-3-7" />
  </svg>
)
export const PersonIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="7.5" r="3.5" />
    <path d="M5 20.5a7 7 0 0 1 14 0" />
  </svg>
)
export const ChipIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
    <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
  </svg>
)
export const CheckIcon = (p: P) => (
  <svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
)
export const XIcon = CloseIcon
export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
)
