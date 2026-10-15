/** Discreet marker for example figures that are illustrative, not measured. */
export function Illustrative({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs tracking-wide text-muted sm:text-sm ${className}`}>
      * Valores ilustrativos
    </p>
  )
}
