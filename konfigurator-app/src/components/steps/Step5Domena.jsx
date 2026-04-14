/**
 * Krok 5 – Domena internetowa
 * - Sprawdzanie dostępności przez RDAP (darmowe, bez klucza API)
 * - Afiliacja Cyberfolks: wstaw kod po rejestracji w programie partnerskim
 *   https://cyberfolks.pl/program-partnerski/
 */
import React, { useState, useCallback } from 'react';
import CardOption from '../CardOption.jsx';
import NavigationButtons from '../NavigationButtons.jsx';
import { DOMAIN_OPTIONS, isStepValid } from '../../data/config.js';

// ─── KONFIGURACJA ─────────────────────────────────────────────────────────
// Po rejestracji w programie partnerskim Cyberfolks wstaw swój kod ref:
const CYBERFOLKS_REF = '71209554';   // kod partnerski cyber_Profit TwistedPixel

const TLD_LIST = ['.pl', '.eu', '.com', '.net'];



function cleanInput(raw) {
  return raw.trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/\.[a-z]{2,}$/, '');   // usuń TLD jeśli ktoś je wpisał
}

// Sprawdza dostępność domeny przez RDAP – 404 = wolna, 200 = zajęta
async function checkRdap(domain) {
  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      signal: AbortSignal.timeout(6000),
    });
    return res.status === 404 ? 'available' : 'taken';
  } catch {
    return 'error';
  }
}

export default function Step5Domena({ formData, onChange, onNext, onBack, currentStep }) {
  const valid = isStepValid(5, formData);
  const [query, setQuery]       = useState('');
  const [checking, setChecking] = useState(false);
  const [results, setResults]   = useState(null);

  const showSearch = formData.maDomene === 'nie' || formData.maDomene === 'nie-wiem';

  const handleCheck = useCallback(async () => {
    const base = cleanInput(query);
    if (!base) return;
    setChecking(true);
    setResults(null);

    const entries = await Promise.all(
      TLD_LIST.map(async tld => {
        const full = base + tld;
        const status = await checkRdap(full);
        return [full, status];
      })
    );

    setResults(Object.fromEntries(entries));
    setChecking(false);
  }, [query]);

  return (
    <div className="step-content">
      <div className="section-header">
        <h2>Czy posiadasz domenę internetową?</h2>
        <p>
          Domena to adres Twojej inwestycji w sieci.{' '}
          Przykład: <strong>nazwainwestycji.pl</strong>
        </p>
      </div>

      <div className="card-grid card-grid--1col">
        {DOMAIN_OPTIONS.map(opt => (
          <CardOption
            key={opt.value}
            value={opt.value}
            label={opt.label}
            desc={opt.desc}
            icon={opt.icon}
            selected={formData.maDomene}
            onSelect={val => {
              onChange('maDomene', val);
              setResults(null);
            }}
          />
        ))}
      </div>

      {showSearch && (
        <div className="domain-search-box">
          <div className="domain-search-box-title">Sprawdź dostępność domeny</div>
          <div className="domain-search-box-subtitle">
            Wpisz nazwę inwestycji — sprawdzimy dostępność dla najpopularniejszych rozszerzeń.
          </div>

          <div className="domain-search-row">
            <input
              type="text"
              placeholder="np. zielone-wzgorza, apartamenty-nova"
              value={query}
              onChange={e => { setQuery(e.target.value); setResults(null); }}
              onKeyDown={e => { if (e.key === 'Enter') handleCheck(); }}
              disabled={checking}
            />
            <button
              className="btn-domain-search"
              type="button"
              onClick={handleCheck}
              disabled={!query.trim() || checking}
            >
              {checking ? 'Sprawdzam…' : 'Sprawdź →'}
            </button>
          </div>

          {results && (
            <div className="domain-results">
              {Object.entries(results).map(([domain, status]) => (
                <div key={domain} className={`domain-result-row domain-result--${status}`}>
                  <div className="domain-result-info">
                    <span className="domain-result-icon">
                      {status === 'available' ? '✅' : status === 'taken' ? '❌' : '⚠️'}
                    </span>
                    <strong className="domain-result-name">{domain}</strong>
                    <span className="domain-result-label">
                      {status === 'available' ? 'wolna' : status === 'taken' ? 'zajęta' : 'błąd'}
                    </span>
                  </div>

                </div>
              ))}

              <p className="domain-affiliate-note">
                Zakup odbywa się bezpośrednio na platformie Cyberfolks.pl.
                Umowa i faktura są wystawiane przez Cyberfolks — TwistedPixel nie jest stroną transakcji.
              </p>
            </div>
          )}

          <div className="domain-provider-note">
            <span>Powered by</span>
            <a
              href={`https://cyberfolks.pl/domeny/${CYBERFOLKS_REF ? '?ref=' + CYBERFOLKS_REF : ''}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cyberfolks.pl
            </a>
            <span>— rejestracja domen od 29 zł/rok</span>
          </div>
        </div>
      )}

      {showSearch && (
        <div style={{
          marginTop: 12,
          padding: '12px 16px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: 13,
          color: '#166534',
        }}>
          <span style={{ fontSize: 16 }}>ℹ️</span>
          <span>Domenę oraz hosting zamówisz na końcu — po wypełnieniu formularza.</span>
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
