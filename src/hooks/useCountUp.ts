import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useMediaQuery'

/** Tweens a number toward `target` while `active`; jumps instantly under reduced motion. */
export function useCountUp(target: number, active: boolean, duration = 1200, from = 0): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(from)
  const valueRef = useRef(from)

  useEffect(() => {
    if (!active) {
      valueRef.current = from
      setValue(from)
      return
    }
    if (reduced) {
      valueRef.current = target
      setValue(target)
      return
    }
    const start = valueRef.current
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = start + (target - start) * eased
      valueRef.current = v
      setValue(v)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration, from, reduced])

  return value
}
