/**
 * Krok 6 – Styl strony
 * Wybór wizualnego charakteru strony inwestycji.
 * Karty z podglądem kolorystycznym każdego stylu.
 */
import React from 'react';
import NavigationButtons from '../NavigationButtons.jsx';
import { STYLE_OPTIONS, isStepValid } from '../../data/config.js';

export default function Step6Styl({ formData, onChange, onNext, onBack, currentStep }) {
  const valid = isStepValid(6, formData);

  return (
    <div className="step-content">
      <div className="section-header">
        <h2>Który styl strony pasuje do Twojej inwestycji?</h2>
        <p>
          Wybierz charakter wizualny, który najlepiej oddaje charakter projektu.
          Możemy też połączyć elementy kilku stylów.
        </p>
      </div>

      <div className="style-card-grid">
        {STYLE_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`style-card${formData.stylStrony === opt.value ? ' selected' : ''}`}
            onClick={() => onChange('stylStrony', opt.value)}
            aria-pressed={formData.stylStrony === opt.value}
          >
            {/* Podgląd kolorystyczny */}
            <div className={`style-card-preview ${opt.cssClass}`}>
              <span style={{ fontSize: 28 }}>{opt.emoji}</span>
            </div>

            <div className="style-card-title">{opt.label}</div>
            <div className="style-card-desc">{opt.desc}</div>

            {formData.stylStrony === opt.value && (
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--tp-purple)',
                }}
              >
                ✓ Wybrany
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Nota informacyjna */}
      <p
        style={{
          marginTop: 16,
          fontSize: 13,
          color: 'var(--tp-gray-400)',
          textAlign: 'center',
        }}
      >
        Możemy pokazać Ci przykładowe realizacje każdego stylu po wypełnieniu konfiguratora.
      </p>

      <NavigationButtons
        currentStep={currentStep}
        totalSteps={10}
        canGoNext={valid}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
}
