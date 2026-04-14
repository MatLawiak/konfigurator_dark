/**
 * App.jsx – Główny komponent konfiguratora.
 *
 * Zarządza:
 * - stanem formularza (formData)
 * - nawigacją między krokami (currentStep)
 * - walidacją kroków przed przejściem dalej
 * - wizualnym shake'iem przy błędzie walidacji
 *
 * Architektura: multi-step wizard z 10 krokami.
 * Osadzenie w WordPress: <div id="root"></div> + załaduj bundle.
 */
import { useState, useRef, useEffect } from 'react';

// Komponenty wspólne
import ProgressBar         from './components/ProgressBar.jsx';
import AnimatedBackground  from './components/AnimatedBackground.jsx';
import TopBar              from './components/TopBar.jsx';

// Komponenty kroków
import Step1Start        from './components/steps/Step1Start.jsx';
import Step2Inwestycja   from './components/steps/Step2Inwestycja.jsx';
import Step3Strona       from './components/steps/Step3Strona.jsx';
import Step4Identyfikacja from './components/steps/Step4Identyfikacja.jsx';
import Step5Domena       from './components/steps/Step5Domena.jsx';
import Step6Styl         from './components/steps/Step6Styl.jsx';
import Step7Wizualizacje from './components/steps/Step7Wizualizacje.jsx';
import Step8Wybor        from './components/steps/Step8Wybor.jsx';
import Step9Podsumowanie from './components/steps/Step9Podsumowanie.jsx';
import Step10Platnosc    from './components/steps/Step10Platnosc.jsx';

import { isStepValid } from './data/config.js';

// ============================================================
// STAN POCZĄTKOWY FORMULARZA
// ============================================================
const INITIAL_FORM_DATA = {
  // Krok 2
  statusInwestycji: null,
  nazwaInwestycji:  '',
  typInwestycji:    null,

  // Krok 3
  maStrone:    null,
  adresStrony: '',

  // Krok 4
  maLogo:                  null,
  logoFile:                null,   // File object – wgrany plik logo (opcjonalne)
  maIdentyfikacje:         null,
  identyfikacjaCzesciowo:  [],     // string[] – lista posiadanych elementów (przy "częściowo")
  maMaterialy:             null,

  // Krok 5
  maDomene: null,

  // Krok 6
  stylStrony: null,

  // Krok 7
  maWizualizacje:     null,
  wizualizacjeFiles:  [],   // File[] – wgrane pliki wizualizacji (opcjonalne)
  autoDaneGov:        false, // bool – add-on automatyczne raportowanie do dane.gov.pl
  addonDaneGovData:   {},    // object – dane firmy do konfiguracji add-on

  // Krok 8
  wybranaStrona: null,
};

// ============================================================
// KOMPONENT GŁÓWNY
// ============================================================
export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData]       = useState(INITIAL_FORM_DATA);
  const [shaking, setShaking]         = useState(false);

  const containerRef = useRef(null);

  // URL + dataLayer events przy zmianie kroku
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    // Zdarzenie dla każdego kroku
    const stepNames = {
      1: 'start',
      2: 'inwestycja',
      3: 'strona',
      4: 'branding',
      5: 'domena',
      7: 'wizualizacje',
      8: 'szablon',
      9: 'podsumowanie',
      10: 'podziekowanie',
    };
    const stepName = stepNames[currentStep];
    if (stepName) {
      window.dataLayer.push({
        event: `step_${currentStep}_${stepName}`,
        step_number: currentStep,
      });
    }

    // URL przy Step 10
    if (currentStep === 10) {
      window.history.pushState({}, '', '/wiadomosc-wyslana');
    } else if (currentStep === 1) {
      window.history.replaceState({}, '', '/');
    }
  }, [currentStep]);

  // Aktualizuje pojedyncze pole w formData
  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  // Przewija do góry kontenera (dla mobile i embeddowanego widgetu)
  function scrollToTop() {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Przejście do następnego kroku z walidacją
  function goNext() {
    if (!isStepValid(currentStep, formData)) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    // Krok 4 → pomijamy krok 5 (domena) jeśli klient ma już stronę + pomijamy krok 6 (styl)
    if (currentStep === 4 && formData.maStrone === 'tak') {
      setCurrentStep(7); // pomijamy 5 i 6
    } else if (currentStep === 5) {
      setCurrentStep(7); // pomijamy krok 6 (styl)
    } else {
      setCurrentStep(s => s + 1);
    }
    scrollToTop();
  }

  // Powrót do poprzedniego kroku
  function goBack() {
    // Krok 7 → cofamy z pominięciem kroku 6 (styl)
    if (currentStep === 7 && formData.maStrone === 'tak') {
      setCurrentStep(4); // pomijamy 5 i 6
    } else if (currentStep === 7) {
      setCurrentStep(5); // pomijamy krok 6 (styl)
    } else {
      setCurrentStep(s => Math.max(1, s - 1));
    }
    scrollToTop();
  }

  // Reset konfiguratora do stanu początkowego
  function handleRestart() {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    scrollToTop();
  }

  // Przejście z kroku 9 (podsumowanie) do kroku 10 (płatność)
  function goToPayment() {
    setCurrentStep(10);
    scrollToTop();
  }

  // Wspólne propsy przekazywane do kroków
  const stepProps = {
    formData,
    onChange:    handleChange,
    onNext:      goNext,
    onBack:      goBack,
    currentStep,
    totalSteps:  10,
  };

  // ============================================================
  // RENDEROWANIE AKTYWNEGO KROKU
  // ============================================================
  function renderStep() {
    switch (currentStep) {
      case 1:  return <Step1Start onStart={goNext} />;
      case 2:  return <Step2Inwestycja   {...stepProps} />;
      case 3:  return <Step3Strona       {...stepProps} />;
      case 4:  return <Step4Identyfikacja {...stepProps} />;
      case 5:  return <Step5Domena       {...stepProps} />;
      case 6:  return <Step6Styl         {...stepProps} />;
      case 7:  return <Step7Wizualizacje  {...stepProps} />;
      case 8:  return <Step8Wybor        {...stepProps} />;
      case 9:
        return (
          <Step9Podsumowanie
            formData={formData}
            onChange={handleChange}
            onNext={goToPayment}
            onBack={goBack}
            currentStep={currentStep}
          />
        );
      case 10:
        return (
          <Step10Platnosc
            formData={formData}
            onChange={handleChange}
            onRestart={handleRestart}
          />
        );
      default: return null;
    }
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="konfigurator-app">
      {/* Ciemny pasek nagłówkowy – spójny z twistedpixel.pl */}
      <TopBar />

      {/* Ruchome romby – identyfikacja wizualna Twisted Pixel */}
      <AnimatedBackground />

      <div
        className={`konfigurator-container${shaking ? ' shake' : ''}`}
        ref={containerRef}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Pasek postępu (ukryty na Step 1 i Step 10) */}
        <ProgressBar currentStep={currentStep} />

        {/* Aktywny krok */}
        {renderStep()}
      </div>
    </div>
  );
}
