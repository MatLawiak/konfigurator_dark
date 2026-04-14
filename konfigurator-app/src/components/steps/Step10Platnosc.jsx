/**
 * Krok 10 – Dziękujemy!
 * Strona pojawi się na hostingu w ciągu 24h.
 */
import { useState, useCallback, useEffect } from 'react';

// ── Sprawdzanie dostępności domeny ────────────────────────────
const CYBERFOLKS_REF = '71209554';
const TLD_LIST = ['.pl', '.eu', '.com', '.net'];

function buildCyberfolksUrl(domain) {
  return `https://cyberfolks.pl/domeny/wyszukaj/?domain=${encodeURIComponent(domain)}&ref=${CYBERFOLKS_REF}`;
}

function cleanDomainInput(raw) {
  return raw.trim().toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/\.[a-z]{2,}$/, '');
}

async function checkRdap(domain) {
  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, { signal: AbortSignal.timeout(6000) });
    return res.status === 404 ? 'available' : 'taken';
  } catch {
    return 'error';
  }
}

function DomainChecker() {
  const [query, setQuery]       = useState('');
  const [checking, setChecking] = useState(false);
  const [results, setResults]   = useState(null);
  const [chosen, setChosen]     = useState('');

  const handleCheck = useCallback(async () => {
    const base = cleanDomainInput(query);
    if (!base) return;
    setChecking(true);
    setResults(null);
    setChosen('');
    const entries = await Promise.all(
      TLD_LIST.map(async tld => {
        const full = base + tld;
        return [full, await checkRdap(full)];
      })
    );
    setResults(Object.fromEntries(entries));
    setChecking(false);
  }, [query]);

  return (
    <div className="domain-search-box" style={{ marginBottom: 16 }}>
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
              {status === 'available' && (
                <button
                  className={`btn-domain-buy${chosen === domain ? ' btn-domain-buy--chosen' : ''}`}
                  type="button"
                  onClick={() => {
                    setChosen(domain);
                    window.open(buildCyberfolksUrl(domain), '_blank', 'noopener noreferrer');
                  }}
                >
                  {chosen === domain ? '✓ Wybrano' : 'Kup na Cyberfolks →'}
                </button>
              )}
            </div>
          ))}
          <p className="domain-affiliate-note">
            Zakup odbywa się bezpośrednio na platformie Cyberfolks.pl.
            Umowa i faktura wystawiane przez Cyberfolks — TwistedPixel nie jest stroną transakcji.
          </p>
        </div>
      )}
    </div>
  );
}

const MAX_LOGO_MB = 3;
const MAX_VIZ_MB  = 5;

function fmtSize(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

function FileUploadBox({ icon, title, accept, multiple, maxMB, files, onChange }) {
  const [warnings, setWarnings] = useState([]);

  function handleChange(e) {
    const selected = Array.from(e.target.files);
    const maxBytes = maxMB * 1024 * 1024;
    const ok = selected.filter(f => f.size <= maxBytes);
    const bad = selected.filter(f => f.size > maxBytes);
    setWarnings(bad.map(f => `${f.name} (${fmtSize(f.size)}) przekracza limit ${maxMB} MB — plik zostanie pominięty.`));
    onChange(multiple ? ok : (ok[0] ?? null));
  }

  const fileCount = multiple
    ? (Array.isArray(files) ? files.length : 0)
    : (files ? 1 : 0);

  return (
    <div style={{
      border: '2px dashed var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px 24px',
      textAlign: 'center',
      background: 'var(--bg-body)',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
    }}>
      <label style={{ cursor: 'pointer', display: 'block' }}>
        <input type="file" accept={accept} multiple={multiple} onChange={handleChange} style={{ display: 'none' }} />
        <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontFamily: 'Alata, sans-serif', fontSize: 15, color: 'var(--tp-dark)', marginBottom: 4 }}>{title}</div>
        {fileCount > 0
          ? <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>✓ {fileCount} {fileCount === 1 ? 'plik wybrany' : 'pliki wybrane'}</div>
          : <div style={{ fontSize: 12, color: 'var(--tp-gray-mid)' }}>Kliknij aby wybrać pliki</div>
        }
        <div style={{ fontSize: 11, color: 'var(--tp-gray-mid)', marginTop: 6 }}>
          Maks. {maxMB} MB {multiple ? 'na plik' : 'na plik'}
        </div>
      </label>
      {warnings.map((w, i) => (
        <div key={i} style={{
          marginTop: 8, padding: '8px 12px',
          background: '#fef2f2', border: '1px solid #fecaca',
          borderRadius: 6, fontSize: 12, color: '#dc2626', textAlign: 'left',
        }}>
          ⚠️ {w}
        </div>
      ))}
    </div>
  );
}

export default function Step10Platnosc({ formData, onChange, onRestart }) {
  const nazwa = formData.nazwaInwestycji
    ? `inwestycji „${formData.nazwaInwestycji}"`
    : 'Twojej inwestycji';

  useEffect(() => {
    const eventId = 'cr_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    function getCookie(name) {
      const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return m ? m[2] : '';
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'complete_registration',
      package_name:  formData.packageName  || '',
      package_price: formData.packagePrice || 0,
      event_id:      eventId,
    });
    fetch('https://n8n.srv1076230.hstgr.cloud/webhook/konfigurator-complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id:      eventId,
        package_name:  formData.packageName  || '',
        package_price: formData.packagePrice || 0,
        package_id:    formData.packageId    || '',
        page_url:      window.location.href,
        fbp:           getCookie('_fbp'),
        fbc:           getCookie('_fbc'),
        user_agent:    navigator.userAgent,
      }),
    }).catch(() => {});
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="step-content step-done">
      <div className="step-done-icon">✓</div>

      <h2>Dziękujemy za zamówienie!</h2>

      <p>
        Zamówienie dla {nazwa} zostało przyjęte.
        Nasz zespół skontaktuje się z Tobą w ciągu kilku godzin.
      </p>

      <div className="step-done-info-card">
        <p style={{ fontFamily: 'IBM Plex Sans', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
          Co się teraz dzieje?
        </p>
        <ul>
          <li>Nasz specjalista przegląda Twoje odpowiedzi</li>
          <li>Przygotowujemy projekt i konfigurację strony</li>
          <li>Skontaktujemy się telefonicznie lub mailowo</li>
          <li>Po akceptacji – wdrożenie i uruchomienie strony</li>
        </ul>
      </div>

      {/* 24h obietnica */}
      <div className="step-done-24h">
        <span style={{ fontSize: 22 }}>🚀</span>
        Twoja strona wkrótce będzie gotowa — skontaktujemy się w celu ustalenia szczegółów.
      </div>

      <div
        style={{
          marginTop: 20,
          padding: '14px 20px',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-sm)',
          maxWidth: 460,
          margin: '20px auto 0',
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: 13,
          color: '#166534',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ display: 'block', marginBottom: 4 }}>🛡️ Gwarancja zwrotu</strong>
        Jeśli z jakiegoś powodu zrezygnujesz przed rozpoczęciem prac –
        zwrócimy pełną kwotę bez pytań.
      </div>

      {/* ── Sekcja uploadu plików ── */}
      <div style={{
        marginTop: 32,
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        textAlign: 'left',
      }}>
        <div style={{ fontFamily: 'Alata, sans-serif', fontSize: 17, color: 'var(--tp-dark)', marginBottom: 6 }}>
          📎 Wgraj potrzebne pliki
        </div>
        <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: 'var(--tp-gray-mid)', lineHeight: 1.6, marginBottom: 20 }}>
          Możesz teraz wgrać posiadane materiały — przyspieszy to realizację projektu.
          Jeśli nie masz ich pod ręką, prześlemy Ci przypomnienie mailowe.
        </p>

        <div style={{ display: 'grid', gap: 16 }}>
          {/* Logo */}
          {formData.maLogo === 'tak' && (
            <FileUploadBox
              icon="🎨"
              title="Logo inwestycji"
              accept="image/*,.pdf,.svg,.ai,.eps,.zip"
              multiple={false}
              maxMB={MAX_LOGO_MB}
              files={formData.logoFile}
              onChange={file => {
                onChange('logoFile', file);
                if (file) { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'logo_uploaded', file_name: file.name }); }
              }}
            />
          )}

          {/* Wizualizacje */}
          {formData.maWizualizacje === 'tak' && (
            <FileUploadBox
              icon="🖼️"
              title="Wizualizacje 3D / zdjęcia architektoniczne"
              accept="image/*,video/*,.pdf,.zip"
              multiple={true}
              maxMB={MAX_VIZ_MB}
              files={formData.wizualizacjeFiles}
              onChange={files => {
                onChange('wizualizacjeFiles', files);
                if (files?.length) { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'wizualizacje_uploaded', files_count: files.length }); }
              }}
            />
          )}
        </div>

        {/* Info o limitach */}
        <div style={{
          marginTop: 16,
          padding: '12px 14px',
          background: '#fafafa',
          border: '1px solid var(--border)',
          borderRadius: 8,
          fontFamily: 'IBM Plex Sans, sans-serif',
          fontSize: 12,
          color: 'var(--tp-gray-mid)',
          lineHeight: 1.8,
        }}>
          <strong style={{ color: 'var(--tp-dark)' }}>Obsługiwane formaty i limity:</strong><br />
          🎨 <strong>Logo:</strong> PNG, SVG, PDF, AI, EPS, ZIP — maks. {MAX_LOGO_MB} MB<br />
          🖼️ <strong>Wizualizacje:</strong> JPG, PNG, MP4, PDF, ZIP — maks. {MAX_VIZ_MB} MB na plik<br />
          <span style={{ color: '#dc2626' }}>⚠️ Pliki przekraczające limit zostaną automatycznie pominięte.</span>
        </div>
      </div>

      {/* ── Linki do Cyberfolks — po finalizacji zlecenia ── */}
      {(formData.maDomene === 'nie' || formData.maDomene === 'nie-wiem') && (
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: 'Alata, sans-serif', fontSize: 15, color: 'var(--tp-dark)', marginBottom: 4 }}>
            🌐 Następny krok: domena i hosting
          </div>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: 'var(--tp-gray-mid)', lineHeight: 1.6, margin: 0 }}>
            Gdy strona będzie gotowa, skonfigurujemy ją na Twoim hostingu. Możesz zakupić domenę i hosting już teraz — link aktywuj po otrzymaniu od nas gotowej strony.
          </p>
          <DomainChecker />
          <a
            href="https://cyberfolks.pl/domeny/?ref=71209554"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px',
              background: '#5B21B6', color: '#fff',
              borderRadius: 'var(--radius-sm)', textDecoration: 'none',
              fontWeight: 600, fontSize: 14, width: 'fit-content',
            }}
          >
            🌐 Zarejestruj domenę na Cyberfolks.pl →
          </a>
          <a
            href="https://cyberfolks.pl/hosting-www/hosting-cyber_run/?period=3&ref=71209554"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px',
              background: 'var(--tp-orange)', color: '#fff',
              borderRadius: 'var(--radius-sm)', textDecoration: 'none',
              fontWeight: 600, fontSize: 14, width: 'fit-content',
            }}
          >
            🖥️ Kup hosting cyber_RUN na Cyberfolks.pl →
          </a>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: 'var(--tp-gray-mid)', margin: 0 }}>
            Zakup odbywa się bezpośrednio na platformie Cyberfolks.pl. Umowa i faktura wystawiane przez Cyberfolks.
          </p>
        </div>
      )}

      <button
        className="btn btn-back"
        onClick={onRestart}
        type="button"
        style={{ marginTop: 16 }}
      >
        ← Zacznij od nowa
      </button>
    </div>
  );
}
