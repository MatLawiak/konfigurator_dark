/**
 * Krok 4 – Identyfikacja wizualna
 * - Logo: tak → pole upload (opcjonalne)
 * - Identyfikacja wizualna: częściowo → lista checkboxów co posiadasz
 * - Materiały sprzedażowe: tak/nie
 */
import { useState } from 'react';
import CardOption from '../CardOption.jsx';
import NavigationButtons from '../NavigationButtons.jsx';
import {
  LOGO_OPTIONS,
  IDENTITY_OPTIONS,
  isStepValid,
} from '../../data/config.js';

const PARTIAL_ITEMS = [
  'Logo inwestycji',
  'Paleta kolorów marki',
  'Typografia (czcionki)',
  'Szablony graficzne',
  'Wizytówki',
  'Materiały drukowane (ulotki, broszury)',
  'Bannery / reklamy online',
];


export default function Step4Identyfikacja({ formData, onChange, onNext, onBack, currentStep }) {
  const [partialChecks, setPartialChecks] = useState(formData.identyfikacjaCzesciowo ?? []);
  const valid = isStepValid(4, formData);

  function togglePartial(item) {
    const next = partialChecks.includes(item)
      ? partialChecks.filter(i => i !== item)
      : [...partialChecks, item];
    setPartialChecks(next);
    onChange('identyfikacjaCzesciowo', next);
  }

  return (
    <div className="step-content">

      {/* ── Logo ── */}
      <div className="section-header">
        <h2>Czy posiadasz logo inwestycji?</h2>
        <p>Logo to wizytówka każdej inwestycji – podstawa identyfikacji.</p>
      </div>

      <div className="card-grid card-grid--2col" style={{ marginBottom: 4 }}>
        {LOGO_OPTIONS.map(opt => (
          <CardOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            icon={opt.icon}
            selected={formData.maLogo}
            onSelect={val => onChange('maLogo', val)}
          />
        ))}
      </div>

      {formData.maLogo === 'tak' && (
        <div className="conditional-field" style={{ marginTop: 8 }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ display: 'block', marginBottom: 4 }}>Poprosimy o przesłanie logo na końcu.</strong>
            Po uzupełnieniu formularza będziesz mieć możliwość wgrania pliku logo — bez przerywania procesu.
          </p>
        </div>
      )}

      {/* ── Księga znaków / Identyfikacja wizualna ── */}
      <div className="section-header" style={{ marginTop: 32 }}>
        <h2>Czy masz już gotową księgę znaków dla inwestycji?</h2>
        <p>Dobrana paleta kolorów, czcionki i elementy wizualne — wszystko co tworzy spójny wizerunek marki.</p>
      </div>

      <div className="card-grid card-grid--1col" style={{ marginBottom: 4 }}>
        {IDENTITY_OPTIONS.map(opt => (
          <CardOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            desc={opt.desc}
            icon={opt.icon}
            selected={formData.maIdentyfikacje}
            onSelect={val => onChange('maIdentyfikacje', val)}
          />
        ))}
      </div>

      {formData.maIdentyfikacje === 'czesciowo' && (
        <div className="partial-checks">
          <div className="partial-checks-title">Wskaż co posiadasz:</div>
          {PARTIAL_ITEMS.map(item => (
            <label key={item} className="partial-check-item">
              <input
                type="checkbox"
                checked={partialChecks.includes(item)}
                onChange={() => togglePartial(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      )}


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
