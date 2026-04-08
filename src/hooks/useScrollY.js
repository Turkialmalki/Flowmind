// Single global RAF-based scroll listener shared by all consumers.
// Prevents N separate scroll handlers for N components.

const subscribers = new Set()
let _scrollY = typeof window !== 'undefined' ? window.scrollY : 0
let _raf = null

if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      if (!_raf) {
        _raf = requestAnimationFrame(() => {
          _scrollY = window.scrollY
          subscribers.forEach((fn) => fn(_scrollY))
          _raf = null
        })
      }
    },
    { passive: true }
  )
}

import { useEffect, useState } from 'react'

export function useScrollY() {
  const [y, setY] = useState(_scrollY)
  useEffect(() => {
    subscribers.add(setY)
    setY(_scrollY) // sync in case scroll happened before mount
    return () => subscribers.delete(setY)
  }, [])
  return y
}
