import logoUrl from '/logo.png'

// Full logo PNG — wings + 3D box with transparency.
// Pass height; width scales automatically to preserve aspect ratio.

export default function LogoIcon({ height = 32, style }) {
  // The PNG has ~35% transparent space at the bottom, so its visual center is
  // above the geometric center. Shift down proportionally to optically align
  // with adjacent text in a flex row.
  const offsetY = Math.round(height * 0.18)
  return (
    <img
      src={logoUrl}
      alt="BaseBox"
      height={height}
      style={{ flexShrink: 0, display: 'block', width: 'auto', transform: `translateY(${offsetY}px)`, ...style }}
    />
  )
}

// Alias for small UI mockup contexts — same PNG, smaller height.
export function BoxIcon({ height = 18, style }) {
  return (
    <img
      src={logoUrl}
      alt="BaseBox"
      height={height}
      style={{ flexShrink: 0, display: 'block', width: 'auto', ...style }}
    />
  )
}
