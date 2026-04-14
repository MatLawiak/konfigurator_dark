/**
 * Reużywalne ikony SVG dla konfiguratora Twisted Pixel.
 */
import React from 'react';

/** Pomarańczowy romb – zamiennik emoji ikonek */
export function DiamondIcon({ size = 18, color = '#FF6B00', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="2.5"
        width="13"
        height="13"
        fill={color}
        transform="rotate(45 9 9)"
      />
    </svg>
  );
}

/** Strzałka w prawo – przycisk Dalej */
export function ArrowRightIcon({ size = 22, color = '#fff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Ptaszek zaznaczenia */
export function CheckIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 7l4 4 6-7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
