/**
 * Krok 8 – Wybór stylu strony inwestycji
 * Miniaturki przez thum.io (fallback: emoji + gradient).
 * Brak linków wychodzących — pełny podgląd po zamówieniu.
 */
import { useState } from 'react';
import NavigationButtons from '../NavigationButtons.jsx';
import { TEMPLATE_EXAMPLES, isStepValid } from '../../data/config.js';

const STYLE_LABELS = {
  premium:      { label: 'Premium',         color: '#1a1814', bg: '#f9e8c8' },
  minimalizm:   { label: 'Minimalizm',      color: '#2d4a2d', bg: '#e8f0e8' },
  sprzedazowy:  { label: 'Sprzedażowy',     color: '#7c2d12', bg: '#fde8d8' },
  architektura: { label: 'Architektoniczny', color: '#1e3a5f', bg: '#dce8f8' },
};

function thumbUrl(url) {
  return `https://image.thum.io/get/width/600/crop/400/noanimate/${url}`;
}

function TemplateCard({ tpl, isSelected, onSelect }) {
  const styleTag = STYLE_LABELS[tpl.style] ?? { label: tpl.style, color: '#333', bg: '#eee' };
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`template-card${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(tpl.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(tpl.id)}
      aria-pressed={isSelected}
    >
      <div className="template-thumbnail">
        {!imgError ? (
          <img
            src={thumbUrl(tpl.previewUrl)}
            alt={`Podgląd szablonu ${styleTag.label}`}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
              borderRadius: 'inherit',
            }}
          />
        ) : (
          <div
            className="template-thumbnail-fallback"
            style={{ background: tpl.bgColor }}
          >
            <span style={{ fontSize: 48 }}>{tpl.emoji}</span>
          </div>
        )}
        <span
          className="template-thumbnail-label"
          style={{ background: styleTag.bg, color: styleTag.color }}
        >
          {styleTag.label}
        </span>
      </div>

      <div className="template-info">
        <div className="template-info-desc">{tpl.desc}</div>
      </div>

      <div className="template-selected-badge">✓ Wybrany szablon</div>
    </div>
  );
}

export default function Step8Wybor({ formData, onChange, onNext, onBack, currentStep }) {
  const valid = isStepValid(8, formData);

  return (
    <div className="step-content">
      <div className="section-header">
        <h2>Wybierz kierunek wizualny strony</h2>
        <p>
          Wskaż styl, który najlepiej odpowiada charakterowi Twojej inwestycji.
          Pełny podgląd każdego szablonu otrzymasz po złożeniu zamówienia.
        </p>
      </div>

      <div className="template-grid">
        {TEMPLATE_EXAMPLES.map(tpl => (
          <TemplateCard
            key={tpl.id}
            tpl={tpl}
            isSelected={formData.wybranaStrona === tpl.id}
            onSelect={id => onChange('wybranaStrona', id)}
          />
        ))}
      </div>

      <div className="template-note">
        <strong>Każda strona spełnia wymogi ustawy deweloperskiej.</strong>{' '}
        Tabela cen, integracja z dane.gov.pl i zgodność z art. 19b są wbudowane w każdy szablon.
        Finalna strona jest zawsze dostosowywana indywidualnie do Twojej inwestycji.
      </div>

      <NavigationButtons
        currentStep={currentStep}
        totalSteps={10}
        canGoNext={valid}
        onBack={onBack}
        onNext={onNext}
        nextLabel="Zobacz podsumowanie →"
      />
    </div>
  );
}
