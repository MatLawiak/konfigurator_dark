/**
 * AnimatedBackground – ruchome romby zgodne z identyfikacją Twisted Pixel.
 *
 * Wzorzec z twistedpixel.pl:
 *  - kształt: kwadrat obrócony o 45° (romb)
 *  - animacja wejścia: rotateToRomb (od -200deg do 45deg + opacity 0→1, 0.75s ease)
 *  - ciągły ruch: powolny float + lekka rotacja (pętla)
 *  - kolory: Crazy Orange #eb5d1c, Fresh Peach #f6b090, Dark Night #1d1d1b
 *  - rozmiary: od 45px (mini) do 650px (duże)
 *  - pozycja: fixed, częściowo poza ekranem – efekt dekoracyjny
 */
import React from 'react';

const SHAPES = [
  // Lewy górny róg – duży ciemny romb
  {
    id: 'tl-large',
    size: 620,
    color: '#1d1d1b',
    opacity: 0.06,
    top: -280,
    left: -260,
    entryDelay: 0,
    floatDuration: 18,
    floatDelta: 22,
    rotateDelta: 8,
  },
  // Lewy środek – średni pomarańczowy
  {
    id: 'ml-mid',
    size: 480,
    color: '#eb5d1c',
    opacity: 0.08,
    top: '30%',
    left: -200,
    entryDelay: 0.2,
    floatDuration: 22,
    floatDelta: 18,
    rotateDelta: -6,
  },
  // Prawy górny – średni peach
  {
    id: 'tr-mid',
    size: 420,
    color: '#f6b090',
    opacity: 0.10,
    top: -180,
    right: -160,
    entryDelay: 0.35,
    floatDuration: 20,
    floatDelta: 26,
    rotateDelta: 10,
  },
  // Prawy dolny – duży ciemny
  {
    id: 'br-large',
    size: 580,
    color: '#1d1d1b',
    opacity: 0.05,
    bottom: -240,
    right: -220,
    entryDelay: 0.1,
    floatDuration: 26,
    floatDelta: 16,
    rotateDelta: -8,
  },
  // Prawy środek – mały pomarańczowy
  {
    id: 'mr-small',
    size: 80,
    color: '#eb5d1c',
    opacity: 0.25,
    top: '55%',
    right: -30,
    entryDelay: 0.5,
    floatDuration: 14,
    floatDelta: 30,
    rotateDelta: 15,
  },
  // Lewy dolny – mini romb
  {
    id: 'bl-mini',
    size: 48,
    color: '#eb5d1c',
    opacity: 0.30,
    bottom: 120,
    left: 20,
    entryDelay: 0.6,
    floatDuration: 12,
    floatDelta: 20,
    rotateDelta: -20,
    borderRadius: 5,
  },
  // Środkowy prawy – peach średni
  {
    id: 'cr-peach',
    size: 300,
    color: '#f6b090',
    opacity: 0.07,
    top: '65%',
    right: -120,
    entryDelay: 0.4,
    floatDuration: 24,
    floatDelta: 20,
    rotateDelta: 5,
  },
];

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {SHAPES.map(s => {
        // Nazwa unikatowej animacji float dla każdego kształtu
        const floatName = `float-${s.id}`;

        const posStyle = {
          position: 'absolute',
          width:  s.size,
          height: s.size,
        };
        if (s.top    !== undefined) posStyle.top    = s.top;
        if (s.left   !== undefined) posStyle.left   = s.left;
        if (s.right  !== undefined) posStyle.right  = s.right;
        if (s.bottom !== undefined) posStyle.bottom = s.bottom;

        return (
          <React.Fragment key={s.id}>
            {/* Keyframes wstrzykiwane inline przez <style> */}
            <style>{`
              @keyframes romb-entry-${s.id} {
                from { transform: rotate(-200deg); opacity: 0; }
                to   { transform: rotate(45deg);   opacity: ${s.opacity}; }
              }
              @keyframes ${floatName} {
                0%   { transform: rotate(45deg) translateY(0px); }
                33%  { transform: rotate(${45 + s.rotateDelta}deg) translateY(${-s.floatDelta}px); }
                66%  { transform: rotate(${45 - s.rotateDelta * 0.5}deg) translateY(${s.floatDelta * 0.6}px); }
                100% { transform: rotate(45deg) translateY(0px); }
              }
            `}</style>

            <div
              style={{
                ...posStyle,
                backgroundColor: s.color,
                borderRadius: s.borderRadius ?? 4,
                opacity: s.opacity,
                animation: [
                  `romb-entry-${s.id} 0.75s ease ${s.entryDelay}s both`,
                  `${floatName} ${s.floatDuration}s ease-in-out ${s.entryDelay + 0.75}s infinite`,
                ].join(', '),
                willChange: 'transform, opacity',
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
