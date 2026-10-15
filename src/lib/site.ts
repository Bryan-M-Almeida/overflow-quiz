/** Public base URL (no trailing slash). Falls back to the current origin in dev. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL?.trim() ||
  (typeof window !== 'undefined' ? window.location.origin : '')
).replace(/\/+$/, '')

export const QUIZ_URL = `${SITE_URL}/quiz`
