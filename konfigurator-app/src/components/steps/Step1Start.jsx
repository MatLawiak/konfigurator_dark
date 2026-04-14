/**
 * Krok 1 – Start
 * Ekran powitalny z informacją o zgodności z ustawą deweloperską.
 */
import { DiamondIcon } from '../Icons.jsx';

export default function Step1Start({ onStart }) {
  return (
    <div className="step-content step-start">
      {/* Badge */}
      <div className="step-start-badge">
        <DiamondIcon size={14} />
        Twisted Pixel – marketing dla deweloperów
      </div>

      {/* Heading */}
      <h1>
        Sprawdź czego potrzebuje{' '}
        <em>Twoja inwestycja</em>{' '}
        deweloperska
      </h1>

      {/* Description */}
      <p>
        Odpowiedz na kilka pytań, a przygotujemy dla Ciebie spersonalizowaną
        rekomendację strony internetowej i pakietu usług marketingowych.
      </p>

      {/* Feature tags */}
      <div className="step-start-features">
        <div className="start-feature-tag">
          <DiamondIcon size={14} /> Zajmuje 3 minuty
        </div>
        <div className="start-feature-tag">
          <DiamondIcon size={14} /> Spersonalizowane rekomendacje
        </div>
        <div className="start-feature-tag">
          <DiamondIcon size={14} /> Gotowe podsumowanie
        </div>
      </div>

      {/* Baner: zgodność z ustawą deweloperską */}
      <div className="info-box" style={{ width: '100%', maxWidth: 520, margin: '0 auto 32px', textAlign: 'left' }}>
        <div className="info-box-header">
          <span className="info-box-icon"><DiamondIcon size={22} /></span>
          <div>
            <div className="info-box-title">
              Nasze strony są zgodne z nową ustawą deweloperską
            </div>
            <p className="info-box-text">
              Każda strona stworzona przez TwistedPixel jest gotowa na wymogi
              <strong> art. 19b ustawy z dnia 20.05.2021 r.</strong> — pełna
              jawność cen ofertowych, integracja z dane.gov.pl i automatyczna
              aktualizacja danych. Bezpieczeństwo prawne bez dodatkowego wysiłku.
            </p>
          </div>
        </div>
        <div className="info-box-tags">
          {[
            'Jawność cen ofertowych',
            'Integracja dane.gov.pl',
            'Codzienne aktualizacje',
            'Pełna zgodność prawna',
          ].map(t => (
            <span key={t} className="info-box-tag">
              <DiamondIcon size={10} color="#FF6B00" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button className="btn btn-cta" onClick={onStart} type="button">
        Rozpocznij konfigurację
      </button>
    </div>
  );
}
