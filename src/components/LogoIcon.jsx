// Full logo PNG — wings + 3D box with transparency.
// Pass height; width scales automatically to preserve aspect ratio.

export default function LogoIcon({ height = 32, style }) {
  return (
    <img
      src="/logo.png"
      alt="BaseBox"
      height={height}
      style={{ flexShrink: 0, display: 'block', width: 'auto', ...style }}
    />
  )
}

// Alias for small UI mockup contexts — same PNG, smaller height.
export function BoxIcon({ height = 18, style }) {
  return (
    <img
      src="/logo.png"
      alt="BaseBox"
      height={height}
      style={{ flexShrink: 0, display: 'block', width: 'auto', ...style }}
    />
  )
}
