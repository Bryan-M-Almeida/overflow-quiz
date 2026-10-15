/** Spanish number formatting: decimal comma, thin no-break space for thousands (e.g. "1 000", "0,9"). */
export function fmt(value: number, decimals = 0): string {
  const fixed = Math.abs(value).toFixed(decimals)
  const [int, dec] = fixed.split('.')
  const grouped = int.length >= 4 ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : int
  const sign = value < 0 ? '−' : ''
  return sign + grouped + (dec ? ',' + dec : '')
}
