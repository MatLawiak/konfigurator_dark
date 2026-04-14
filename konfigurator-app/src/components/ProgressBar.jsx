/**
 * ProgressBar – pasek postępu konfiguratora.
 * Pokazuje aktualny krok oraz procent wypełnienia.
 */
import React from 'react';
import { STEPS } from '../data/config.js';

// Kroki widoczne w pasku (pomijamy krok 1 – Start i krok 10 – Gotowe)
const PROGRESS_STEPS = STEPS.filter(s => s.id >= 2 && s.id <= 9);

export default function ProgressBar({ currentStep }) {
  // Liczymy postęp tylko dla kroków 2-9
  const progressIndex = currentStep - 2; // 0-based dla kroków 2-9
  const total = PROGRESS_STEPS.length;   // 8
  const percent = currentStep <= 1
    ? 0
    : currentStep >= 9
    ? 100
    : Math.round((progressIndex / total) * 100);

  const currentLabel = STEPS.find(s => s.id === currentStep)?.label ?? '';

  // Nie pokazuj paska na Step 1 (Start) i Step 10 (Gotowe)
  if (currentStep === 1 || currentStep === 10) return null;

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-header">
        <span className="progress-bar-label">{currentLabel}</span>
        <span className="progress-bar-count">
          Krok {currentStep - 1} z {total}
        </span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
