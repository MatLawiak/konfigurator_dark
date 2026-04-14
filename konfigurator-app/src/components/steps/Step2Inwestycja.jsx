/**
 * Krok 2 – Informacje o inwestycji
 * 3 pytania: status inwestycji, nazwa, typ nieruchomości.
 */
import React from 'react';
import CardOption from '../CardOption.jsx';
import NavigationButtons from '../NavigationButtons.jsx';
import {
  INVESTMENT_STATUS_OPTIONS,
  INVESTMENT_TYPE_OPTIONS,
  isStepValid,
} from '../../data/config.js';

export default function Step2Inwestycja({ formData, onChange, onNext, onBack, currentStep }) {
  const valid = isStepValid(2, formData);

  return (
    <div className="step-content">
      {/* --- Pytanie 1: Status inwestycji --- */}
      <div className="section-header">
        <h2>Czy posiadasz już inwestycję deweloperską?</h2>
        <p>Powiedz nam, na jakim etapie jest Twój projekt.</p>
      </div>

      <div className="card-grid card-grid--1col" style={{ marginBottom: 32 }}>
        {INVESTMENT_STATUS_OPTIONS.map(opt => (
          <CardOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            desc={opt.desc}
            icon={opt.icon}
            selected={formData.statusInwestycji}
            onSelect={val => onChange('statusInwestycji', val)}
          />
        ))}
      </div>

      {/* --- Pytanie 2: Nazwa inwestycji (opcjonalne) --- */}
      <div className="section-header">
        <h2>Jak nazywa się inwestycja?</h2>
        <p>Podaj roboczą lub oficjalną nazwę. Możesz pominąć to pole.</p>
      </div>

      <div className="form-field" style={{ marginBottom: 32 }}>
        <label htmlFor="nazwaInwestycji">Nazwa inwestycji</label>
        <input
          id="nazwaInwestycji"
          type="text"
          placeholder="np. Zielone Wzgórza, Apartamenty Nova"
          value={formData.nazwaInwestycji}
          onChange={e => onChange('nazwaInwestycji', e.target.value)}
          maxLength={100}
        />
        <span className="field-hint">Opcjonalne – możesz wpisać później</span>
      </div>

      {/* --- Pytanie 3: Typ inwestycji --- */}
      <div className="section-header">
        <h2>Jaki typ inwestycji realizujesz?</h2>
        <p>Wybierz kategorię, która najlepiej opisuje Twój projekt.</p>
      </div>

      <div className="card-grid card-grid--1col" style={{ marginBottom: 8 }}>
        {INVESTMENT_TYPE_OPTIONS.map(opt => (
          <CardOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            desc={opt.desc}
            icon={opt.icon}
            selected={formData.typInwestycji}
            onSelect={val => onChange('typInwestycji', val)}
          />
        ))}
      </div>

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
