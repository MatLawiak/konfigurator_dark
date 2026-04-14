/**
 * Krok 3 – Strona internetowa
 * Pytanie o posiadanie strony; warunkowo pokazuje pole URL.
 */
import React from 'react';
import CardOption from '../CardOption.jsx';
import NavigationButtons from '../NavigationButtons.jsx';
import { WEBSITE_OPTIONS, isStepValid } from '../../data/config.js';

export default function Step3Strona({ formData, onChange, onNext, onBack, currentStep }) {
  const valid = isStepValid(3, formData);
  const showUrlField = formData.maStrone === 'tak';

  return (
    <div className="step-content">
      <div className="section-header">
        <h2>Czy inwestycja posiada już stronę internetową?</h2>
        <p>Dzięki temu wiemy, czy potrzebujesz nowej strony czy optymalizacji istniejącej.</p>
      </div>

      <div className="card-grid card-grid--1col">
        {WEBSITE_OPTIONS.map(opt => (
          <CardOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            desc={opt.desc}
            icon={opt.icon}
            selected={formData.maStrone}
            onSelect={val => {
              onChange('maStrone', val);
              // Czyść adres przy zmianie wyboru
              if (val !== 'tak') onChange('adresStrony', '');
            }}
          />
        ))}
      </div>

      {/* Pole URL – widoczne tylko gdy "Tak, mam stronę" */}
      {showUrlField && (
        <div className="conditional-field">
          <label htmlFor="adresStrony">Podaj adres strony</label>
          <input
            id="adresStrony"
            type="url"
            placeholder="https://nazwainwestycji.pl"
            value={formData.adresStrony}
            onChange={e => onChange('adresStrony', e.target.value)}
          />
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
