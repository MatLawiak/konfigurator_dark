/**
 * Krok 7 – Wizualizacje inwestycji
 * - "tak" → pole upload plików (opcjonalne)
 * - Blok edukacyjny: ustawa deweloperska / jawność cen (art. 19b)
 * - Toggle add-on: Automatyczne raportowanie do dane.gov.pl (+2300 PLN → łącznie 4500 PLN)
 */
import { useState } from 'react';
import CardOption from '../CardOption.jsx';
import NavigationButtons from '../NavigationButtons.jsx';
import { VISUALIZATION_OPTIONS, isStepValid } from '../../data/config.js';

// ── Blok z gwarancjami technicznymi ──────────────────────────────────
const LEGAL_GUARANTEES = [
  'Tabela cen ofertowych z wymaganymi polami (powierzchnia, piętro, pokoje, cena)',
  'Publiczny adres URL do pliku CSV — dostępny 24/7 bez logowania',
  'Format zgodny ze schematem ministerialnym (dane.gov.pl)',
  'Obsługa pliku XML i sumy kontrolnej MD5 dla Importera XML',
  'Aktualizacja codziennie — bez Twojego udziału',
];

// ── Pola formularza add-on (jednorazowa konfiguracja) ─────────────────
const ADDON_FIELDS = [
  { id: 'firmaName',   label: 'Nazwa firmy / dewelopera', placeholder: 'np. XYZ Development Sp. z o.o.' },
  { id: 'firmaNip',    label: 'NIP firmy',                placeholder: '0000000000' },
  { id: 'firmaEmail',  label: 'E-mail kontaktowy',         placeholder: 'biuro@twojafirma.pl' },
  { id: 'firmaOsoba',  label: 'Imię i nazwisko osoby zgłaszającej', placeholder: 'Jan Kowalski' },
];

export default function Step7Wizualizacje({ formData, onChange, onNext, onBack, currentStep }) {
  const valid = isStepValid(7, formData);
  const [addonOpen, setAddonOpen] = useState(!!formData.autoDaneGov);
  const [addonData, setAddonData] = useState(formData.addonDaneGovData ?? {});

  function handleAddonToggle() {
    const next = !formData.autoDaneGov;
    onChange('autoDaneGov', next);
    setAddonOpen(next);
  }

  function handleAddonField(id, val) {
    const next = { ...addonData, [id]: val };
    setAddonData(next);
    onChange('addonDaneGovData', next);
  }

  return (
    <div className="step-content">

      {/* ── Główne pytanie ── */}
      <div className="section-header">
        <h2>Czy posiadasz wizualizacje inwestycji?</h2>
        <p>
          Renderingi 3D, zdjęcia architektoniczne lub materiały wideo znacząco
          podnoszą skuteczność strony sprzedażowej.
        </p>
      </div>

      <div className="card-grid card-grid--1col">
        {VISUALIZATION_OPTIONS.map(opt => (
          <CardOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            desc={opt.desc}
            icon={opt.icon}
            selected={formData.maWizualizacje}
            onSelect={val => onChange('maWizualizacje', val)}
          />
        ))}
      </div>

      {formData.maWizualizacje === 'tak' && (
        <div className="conditional-field" style={{ marginTop: 14 }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ display: 'block', marginBottom: 4 }}>Poprosimy o przesłanie wizualizacji na końcu.</strong>
            Po uzupełnieniu formularza będziesz mieć możliwość wgrania plików — bez przerywania procesu.
          </p>
        </div>
      )}

      {formData.maWizualizacje === 'nie' && (
        <div className="conditional-field" style={{ marginTop: 14 }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
            <strong style={{ display: 'block', marginBottom: 4 }}>Wizualizacje 3D to kluczowy element sprzedaży inwestycji.</strong>
            Przygotujemy profesjonalne renderingi architektoniczne dopasowane do Twojego projektu.
            Tworzymy również animacje 3D na bazie gotowych wizualizacji — materiał, który wyróżni inwestycję na tle konkurencji.
          </p>
        </div>
      )}

      {formData.maWizualizacje === 'w-trakcie' && (
        <div className="conditional-field" style={{ marginTop: 14 }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
            <strong style={{ display: 'block', marginBottom: 4 }}>Strona nie musi czekać na wizualizacje.</strong>
            Wdrożymy pełną stronę sprzedażową i uzupełnimy ją o renderingi natychmiast po ich dostarczeniu.
            Inwestycja sprzedaje się od pierwszego dnia — bez opóźnień.
          </p>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          BLOK: Ustawa deweloperska – jawność cen (art. 19b)
          ═══════════════════════════════════════════════════════ */}
      <div style={{
        marginTop: 32,
        padding: '20px 22px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        borderLeft: '4px solid var(--tp-orange)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>🏛️</span>
          <div>
            <div style={{ fontFamily: 'Alata, sans-serif', fontSize: 16, color: 'var(--tp-dark)', marginBottom: 4 }}>
              Obowiązek prawny: jawność cen ofertowych
            </div>
            <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: 'var(--tp-gray-mid)', lineHeight: 1.6, margin: 0 }}>
              Na podstawie <strong style={{ color: 'var(--tp-dark)' }}>art. 19b ust. 1 ustawy deweloperskiej
              z dnia 20.05.2021 r.</strong> każdy deweloper prowadzący sprzedaż mieszkań
              jest zobowiązany codziennie publikować aktualne ceny ofertowe w portalu
              dane.gov.pl — w formacie CSV lub XML, pod publicznym adresem URL.
            </p>
          </div>
        </div>

        {/* Gwarancje techniczne */}
        <div style={{
          background: 'var(--bg-body)',
          borderRadius: 8,
          padding: '14px 16px',
          marginBottom: 0,
        }}>
          <div style={{
            fontFamily: 'IBM Plex Sans, sans-serif',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--tp-dark)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 10,
          }}>
            Nasza strona zawiera gotową tabelę ze wszystkimi wymaganymi danymi:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {LEGAL_GUARANTEES.map((g, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{
                  width: 18,
                  height: 18,
                  minWidth: 18,
                  borderRadius: '50%',
                  background: '#dcfce7',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  marginTop: 1,
                }}>✓</span>
                <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: 'var(--tp-gray-mid)', lineHeight: 1.45 }}>
                  {g}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          ADD-ON: Automatyczne raportowanie do dane.gov.pl
          ═══════════════════════════════════════════════════════ */}
      <div style={{
        marginTop: 16,
        border: formData.autoDaneGov
          ? '2px solid var(--tp-orange)'
          : '2px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}>
        {/* Toggle header */}
        <button
          type="button"
          onClick={handleAddonToggle}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 20px',
            background: formData.autoDaneGov ? 'var(--bg-selected)' : 'var(--bg-card)',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            gap: 12,
            transition: 'background 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Checkbox wizualny */}
            <span style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              border: `2px solid ${formData.autoDaneGov ? 'var(--tp-orange)' : 'var(--border)'}`,
              background: formData.autoDaneGov ? 'var(--tp-orange)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'white',
              fontSize: 13,
              fontWeight: 700,
              transition: 'all 0.2s ease',
            }}>
              {formData.autoDaneGov ? '✓' : ''}
            </span>
            <div>
              <div style={{ fontFamily: 'Alata, sans-serif', fontSize: 15, color: 'var(--tp-dark)' }}>
                Włącz automatyczne raportowanie do dane.gov.pl
              </div>
              <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--tp-gray-mid)', marginTop: 2 }}>
                Opcjonalny dodatek — my zajmujemy się całą techniczną stroną obowiązku
              </div>
            </div>
          </div>

        </button>

        {/* Rozwinięcie po włączeniu */}
        {addonOpen && (
          <div style={{
            padding: '0 20px 20px',
            background: 'var(--bg-selected)',
            borderTop: '1px solid rgba(235,93,28,0.15)',
          }}>

            {/* Co zawiera add-on */}
            <div style={{
              padding: '14px 0 16px',
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 13,
              color: 'var(--tp-gray-mid)',
              lineHeight: 1.6,
            }}>
              Po włączeniu opcji nasz system będzie <strong style={{ color: 'var(--tp-dark)' }}>codziennie automatycznie</strong>{' '}
              generował i publikował plik CSV/XML z cenami mieszkań pod stałym adresem URL.
              Ty wykonujesz tylko <strong style={{ color: 'var(--tp-dark)' }}>jednorazową rejestrację</strong> w portalu dane.gov.pl
              — resztą zajmuje się nasz system.
            </div>

            {/* Kroki jednorazowe */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '14px 16px',
              marginBottom: 16,
            }}>
              <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--tp-dark)', marginBottom: 10 }}>
                3 kroki, które wykonujesz jednorazowo:
              </div>
              {[
                { n: '1', text: 'Zarejestruj konto na dane.gov.pl i złóż wniosek o profil dostawcy danych' },
                { n: '2', text: <>Wyślij e-mail na <strong>kontakt@dane.gov.pl</strong> z URL pliku XML i .md5 ze swojej strony (my go przygotujemy)</> },
                { n: '3', text: 'Po aktywacji przez portal — system działa w pełni automatycznie. Gotowe.' },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 22,
                    height: 22,
                    minWidth: 22,
                    borderRadius: '50%',
                    background: 'var(--tp-orange)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Alata, sans-serif',
                    fontSize: 12,
                  }}>{s.n}</span>
                  <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: 'var(--tp-gray-mid)', lineHeight: 1.5, paddingTop: 2 }}>{s.text}</span>
                </div>
              ))}
            </div>

            {/* Formularz danych do konfiguracji */}
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--tp-dark)', marginBottom: 12 }}>
              Dane do konfiguracji (uzupełnij teraz lub po wdrożeniu):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {ADDON_FIELDS.map(f => (
                <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 700, color: 'var(--tp-gray-mid)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {f.label}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={addonData[f.id] ?? ''}
                    onChange={e => handleAddonField(f.id, e.target.value)}
                    style={{
                      padding: '10px 12px',
                      fontFamily: 'IBM Plex Sans, sans-serif',
                      fontSize: 13,
                      color: 'var(--tp-dark)',
                      background: 'var(--bg-card)',
                      border: '2px solid var(--border)',
                      borderRadius: 8,
                      outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'var(--tp-gray-mid)', marginTop: 10, fontStyle: 'italic' }}>
              Opcjonalne — możesz uzupełnić po wdrożeniu strony. Pola potrzebne do rejestracji w portalu dane.gov.pl.
            </p>
          </div>
        )}
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
