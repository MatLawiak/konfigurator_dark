/**
 * Krok 9 – Podsumowanie + Formularz zamówienia / Kontakt
 *
 * Przepływ "Zamów":
 *   CTA → formularz danych klienta (imię/naz/tel/email + opcja faktura + uwagi)
 *       → metoda płatności → "Przejdź do bramki płatności" → Step10
 *   Powiadomienie n8n: action='zamow' (subject: "Klient zamówił usługę")
 *   + email potwierdzający do klienta na jego adres email
 *
 * Przepływ "Skontaktuj się":
 *   CTA → modal (imię/naz/tel + wiadomość) → "Skontaktujemy się z Tobą"
 *   Powiadomienie n8n: action='kontakt' (subject: "Klient chce się skontaktować")
 */
import { useState, useRef } from 'react';
import {
  generateRecommendations,
  INVESTMENT_TYPE_OPTIONS,
  TEMPLATE_EXAMPLES,
  PACKAGES,
} from '../../data/config.js';
import { sendLeadNotification } from '../../utils/sendNotification.js';
import PrivacyPolicyModal from '../PrivacyPolicyModal.jsx';

function getLabel(options, value) {
  return options.find(o => o.value === value)?.label ?? value ?? '—';
}

function yesNo(value) {
  if (value === 'tak')        return { label: 'Tak',              cls: 'positive' };
  if (value === 'nie')        return { label: 'Nie',              cls: 'negative' };
  if (value === 'czesciowo')  return { label: 'Częściowo',        cls: '' };
  if (value === 'nie-wiem')   return { label: 'Nie wiem',         cls: '' };
  if (value === 'chce-nowa')  return { label: 'Chcę nową stronę', cls: 'negative' };
  if (value === 'w-trakcie')  return { label: 'W trakcie',        cls: '' };
  return { label: value ?? '—', cls: '' };
}


const EMPTY_ORDER = {
  imie: '', nazwisko: '', telefon: '', email: '',
  faktura: false,
  firma: '', nip: '', adres: '', miasto: '', kodPocztowy: '',
  uwagi: '',
  zgodaPrzetwarzanie: false,
  zgodaKlauzula: false,
};

const EMPTY_CONTACT = { imie: '', nazwisko: '', telefon: '', wiadomosc: '', zgodaPrzetwarzanie: false };

function TemplateThumb({ tpl }) {
  const [err, setErr] = useState(false);
  const url = `https://image.thum.io/get/width/600/crop/400/noanimate/${tpl.previewUrl}`;
  if (err) {
    return (
      <div className="summary-template-preview-fallback" style={{ background: tpl.bgColor }}>
        <span>{tpl.emoji}</span>
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={tpl.desc}
      onError={() => setErr(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', borderRadius: 'inherit' }}
    />
  );
}

const MAX_LOGO_MB = 3;
const MAX_VIZ_MB  = 5;

function fmtSize(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

function FileUploadBox({ icon, title, accept, multiple, maxMB, files, onChange: onChangeProp }) {
  const [warnings, setWarnings] = useState([]);
  function handleChange(e) {
    const selected = Array.from(e.target.files);
    const maxBytes = maxMB * 1024 * 1024;
    const ok  = selected.filter(f => f.size <= maxBytes);
    const bad = selected.filter(f => f.size > maxBytes);
    setWarnings(bad.map(f => `${f.name} (${fmtSize(f.size)}) przekracza limit ${maxMB} MB — plik zostanie pominięty.`));
    onChangeProp(multiple ? ok : (ok[0] ?? null));
  }
  const fileCount = multiple ? (Array.isArray(files) ? files.length : 0) : (files ? 1 : 0);
  return (
    <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px', textAlign: 'center', background: 'var(--bg-body)', cursor: 'pointer' }}>
      <label style={{ cursor: 'pointer', display: 'block' }}>
        <input type="file" accept={accept} multiple={multiple} onChange={handleChange} style={{ display: 'none' }} />
        <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontFamily: 'Alata, sans-serif', fontSize: 14, color: 'var(--tp-dark)', marginBottom: 4 }}>{title}</div>
        {fileCount > 0
          ? <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>✓ {fileCount} {fileCount === 1 ? 'plik wybrany' : 'pliki wybrane'}</div>
          : <div style={{ fontSize: 12, color: 'var(--tp-gray-mid)' }}>Kliknij aby wybrać pliki</div>}
        <div style={{ fontSize: 11, color: 'var(--tp-gray-mid)', marginTop: 4 }}>Maks. {maxMB} MB na plik</div>
      </label>
      {warnings.map((w, i) => (
        <div key={i} style={{ marginTop: 6, padding: '6px 10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, fontSize: 12, color: '#dc2626', textAlign: 'left' }}>⚠️ {w}</div>
      ))}
    </div>
  );
}

function ConsentCheckbox({ checked, onChange, hasError, onPrivacy, type }) {
  const texts = {
    przetwarzanie: (
      <>
        Wyrażam zgodę na przetwarzanie przez <strong>Twisted Pixel Sp. z o.o.</strong> z siedzibą
        w Święty Marcin 29/8, 61-806 Poznań, moich danych osobowych zawartych w niniejszym
        formularzu w celu i zakresie koniecznym do realizacji zgłoszenia. *
      </>
    ),
    klauzula: (
      <>
        Administratorem Państwa danych osobowych jest firma <strong>Twisted Pixel Sp. z o.o.</strong>{' '}
        z siedzibą w Święty Marcin 29/8, 61-806 Poznań. Dane wpisane w formularzu będą
        przetwarzane w celu udzielenia odpowiedzi na przesłane zapytanie zgodnie z{' '}
        <button
          type="button"
          onClick={e => { e.preventDefault(); onPrivacy(); }}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--tp-purple)', textDecoration: 'underline', fontSize: 'inherit', fontFamily: 'inherit' }}
        >
          Polityką Prywatności
        </button>. *
      </>
    ),
  };

  return (
    <label style={{
      display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer',
      padding: '10px 12px',
      background: hasError ? '#fef2f2' : '#fafafa',
      border: `1px solid ${hasError ? '#fecaca' : 'var(--border)'}`,
      borderRadius: 8,
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ marginTop: 3, flexShrink: 0, accentColor: 'var(--tp-purple)', width: 16, height: 16 }}
      />
      <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: hasError ? '#dc2626' : 'var(--tp-gray-mid)', lineHeight: 1.6 }}>
        {texts[type]}
        {hasError && <span style={{ display: 'block', color: '#dc2626', fontWeight: 600, marginTop: 2 }}>Zgoda jest wymagana</span>}
      </span>
    </label>
  );
}

export default function Step9Podsumowanie({ formData, onChange, onNext, onBack }) {
  const { package: pkg } = generateRecommendations(formData);
  const [selectedPkg, setSelectedPkg]     = useState(pkg.id);
  const [showComparison, setShowComparison] = useState(false);
  const comparisonRef = useRef(null);

  const activePkg  = PACKAGES[selectedPkg] ?? pkg;
  const priceLabel = `${activePkg.price.toLocaleString('pl-PL')} PLN`;
  const selectedTemplate = TEMPLATE_EXAMPLES.find(t => t.id === formData.wybranaStrona);

  // Formularz zamówienia
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [order, setOrder]                 = useState(EMPTY_ORDER);
  const [orderErrors, setOrderErrors]     = useState({});

  // Modal kontaktowy
  const [showContact, setShowContact] = useState(false);
  const [contact, setContact]         = useState(EMPTY_CONTACT);
  const [contactSent, setContactSent] = useState(false);

  // Modal polityki prywatności
  const [showPrivacy, setShowPrivacy] = useState(false);

  function upOrder(field, val) { setOrder(p => ({ ...p, [field]: val })); }
  function upContact(field, val) { setContact(p => ({ ...p, [field]: val })); }

  function validateOrder() {
    const e = {};
    if (!order.imie.trim())                                 e.imie               = true;
    if (!order.nazwisko.trim())                             e.nazwisko           = true;
    if (!order.telefon.trim())                              e.telefon            = true;
    if (!order.email.trim() || !order.email.includes('@'))  e.email              = true;
    if (order.faktura && !order.firma.trim())               e.firma              = true;
    if (order.faktura && !order.nip.trim())                 e.nip                = true;
    if (!order.zgodaPrzetwarzanie)                          e.zgodaPrzetwarzanie = true;
    if (!order.zgodaKlauzula)                               e.zgodaKlauzula      = true;
    setOrderErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleOrderSubmit() {
    if (!validateOrder()) return;
    const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_submitted',
      package_name:  activePkg.name,
      package_price: activePkg.price,
      value:         activePkg.price,
      currency:      'PLN',
      event_id:      eventId,
    });
    sendLeadNotification(formData, 'zamow', {
      ...order,
      packageId:    activePkg.id,
      packageName:  activePkg.name,
      packagePrice: activePkg.price,
      eventId,
    });
    onChange('packageName',  activePkg.name);
    onChange('packagePrice', activePkg.price);
    onChange('packageId',    activePkg.id);
    onNext();
  }

  function handleContactSubmit() {
    if (!contact.imie.trim() || !contact.telefon.trim()) return;
    sendLeadNotification(formData, 'kontakt', contact);
    setContactSent(true);
  }

  function openContact() {
    setContactSent(false);
    setContact(EMPTY_CONTACT);
    setShowContact(true);
  }

  return (
    <div className="step-content">

      {/* ══ MODAL POLITYKI PRYWATNOŚCI ══════════════════════════════════ */}
      {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}

      {/* ══ MODAL KONTAKTOWY ═══════════════════════════════════════════ */}
      {showContact && (
        <div className="contact-modal-overlay">
          <div className="contact-modal">
            {!contactSent ? (
              <>
                <div className="contact-modal-header">
                  <h3>Zostaw swoje dane</h3>
                  <button
                    className="contact-modal-close"
                    onClick={() => setShowContact(false)}
                    aria-label="Zamknij"
                  >×</button>
                </div>
                <p style={{ color: 'var(--tp-gray-mid)', fontSize: 14, marginBottom: 20 }}>
                  Oddzwonimy lub odpiszemy w ciągu jednego dnia roboczego.
                </p>

                <div className="order-form-grid">
                  <div className="order-field">
                    <label>Imię *</label>
                    <input
                      type="text"
                      className="order-input"
                      value={contact.imie}
                      onChange={e => upContact('imie', e.target.value)}
                      placeholder="Jan"
                    />
                  </div>
                  <div className="order-field">
                    <label>Nazwisko</label>
                    <input
                      type="text"
                      className="order-input"
                      value={contact.nazwisko}
                      onChange={e => upContact('nazwisko', e.target.value)}
                      placeholder="Kowalski"
                    />
                  </div>
                </div>

                <div className="order-field">
                  <label>Numer telefonu *</label>
                  <input
                    type="tel"
                    className="order-input"
                    value={contact.telefon}
                    onChange={e => upContact('telefon', e.target.value)}
                    placeholder="+48 500 000 000"
                  />
                </div>

                <div className="order-field" style={{ marginTop: 10 }}>
                  <label>Wiadomość (opcjonalnie)</label>
                  <textarea
                    className="order-input"
                    value={contact.wiadomosc}
                    onChange={e => upContact('wiadomosc', e.target.value)}
                    placeholder="Napisz czego potrzebujesz lub kiedy możemy zadzwonić…"
                    rows={3}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <ConsentCheckbox
                  checked={contact.zgodaPrzetwarzanie}
                  onChange={v => upContact('zgodaPrzetwarzanie', v)}
                  hasError={false}
                  onPrivacy={() => setShowPrivacy(true)}
                  type="przetwarzanie"
                />

                <button
                  className="btn btn-cta"
                  type="button"
                  onClick={handleContactSubmit}
                  disabled={!contact.zgodaPrzetwarzanie}
                  style={{ width: '100%', justifyContent: 'center', marginTop: 12, opacity: contact.zgodaPrzetwarzanie ? 1 : 0.5 }}
                >
                  Wyślij →
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
                <h3 style={{ color: 'var(--tp-dark)', marginBottom: 8 }}>Dziękujemy!</h3>
                <p style={{ color: 'var(--tp-gray-mid)', marginBottom: 24 }}>
                  Skontaktujemy się z Tobą wkrótce.
                </p>
                <button
                  className="btn btn-next"
                  type="button"
                  onClick={() => setShowContact(false)}
                >
                  Zamknij
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ NAGŁÓWEK ═══════════════════════════════════════════════════ */}
      <div className="section-header">
        <h2>Twoje podsumowanie</h2>
        <p>Na podstawie odpowiedzi przygotowaliśmy spersonalizowaną rekomendację.</p>
      </div>

      <div className="summary-section">

        {/* ── Podgląd szablonu ── */}
        {selectedTemplate && (
          <div className="summary-card">
            <h3>🌐 Wybrany szablon strony</h3>
            <div className="summary-template-preview">
              <TemplateThumb tpl={selectedTemplate} />
            </div>
            <div className="summary-template-caption">
              <span>{selectedTemplate.desc}</span>
              <span style={{ fontSize: 12, color: 'var(--tp-gray-mid)', fontStyle: 'italic' }}>
                Pełny podgląd dostępny po zamówieniu
              </span>
            </div>
          </div>
        )}

        {/* ── Inwestycja ── */}
        <div className="summary-card">
          <h3>🏗️ Inwestycja</h3>
          <div className="summary-row">
            <span className="summary-row-label">Status</span>
            <span className="summary-row-value">
              {formData.statusInwestycji === 'w-trakcie'  && 'W trakcie realizacji'}
              {formData.statusInwestycji === 'planowanie' && 'Na etapie planowania'}
            </span>
          </div>
          {formData.nazwaInwestycji && (
            <div className="summary-row">
              <span className="summary-row-label">Nazwa</span>
              <span className="summary-row-value">{formData.nazwaInwestycji}</span>
            </div>
          )}
          <div className="summary-row">
            <span className="summary-row-label">Typ</span>
            <span className="summary-row-value">
              {getLabel(INVESTMENT_TYPE_OPTIONS, formData.typInwestycji)}
            </span>
          </div>
        </div>

        {/* ── Strona i domena ── */}
        <div className="summary-card">
          <h3>🌐 Strona i domena</h3>
          <div className="summary-row">
            <span className="summary-row-label">Posiada stronę www</span>
            <span className={`summary-row-value ${yesNo(formData.maStrone).cls}`}>
              {yesNo(formData.maStrone).label}
            </span>
          </div>
          {formData.adresStrony && (
            <div className="summary-row">
              <span className="summary-row-label">Adres strony</span>
              <span className="summary-row-value">
                <a href={formData.adresStrony} target="_blank" rel="noreferrer"
                   style={{ color: 'var(--tp-orange)' }}>
                  {formData.adresStrony}
                </a>
              </span>
            </div>
          )}
          <div className="summary-row">
            <span className="summary-row-label">Posiada domenę</span>
            <span className={`summary-row-value ${yesNo(formData.maDomene).cls}`}>
              {yesNo(formData.maDomene).label}
            </span>
          </div>

        </div>

        {/* ── Identyfikacja wizualna ── */}
        <div className="summary-card">
          <h3>🎨 Identyfikacja wizualna</h3>
          <div className="summary-row">
            <span className="summary-row-label">Logo</span>
            <span className={`summary-row-value ${yesNo(formData.maLogo).cls}`}>
              {yesNo(formData.maLogo).label}
              {formData.logoFile && ` (${formData.logoFile.name})`}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-row-label">Identyfikacja wizualna</span>
            <span className={`summary-row-value ${yesNo(formData.maIdentyfikacje).cls}`}>
              {yesNo(formData.maIdentyfikacje).label}
            </span>
          </div>
          {formData.identyfikacjaCzesciowo?.length > 0 && (
            <div className="summary-row">
              <span className="summary-row-label">Posiadane elementy</span>
              <span className="summary-row-value" style={{ fontSize: 12 }}>
                {formData.identyfikacjaCzesciowo.join(', ')}
              </span>
            </div>
          )}
          <div className="summary-row">
            <span className="summary-row-label">Wizualizacje</span>
            <span className={`summary-row-value ${yesNo(formData.maWizualizacje).cls}`}>
              {yesNo(formData.maWizualizacje).label}
              {formData.wizualizacjeFiles?.length > 0 &&
                ` (${formData.wizualizacjeFiles.length} pliki)`}
            </span>
          </div>
        </div>

        {/* ── Rekomendowany pakiet + CTA ── */}
        <div className="recommendation-card">
          <div className="rec-badge">Rekomendacja Twisted Pixel</div>
          <h3>Pakiet {activePkg.name}</h3>
          <p>{activePkg.desc}</p>

          {/* Co zawiera pakiet */}
          <ul className="recommendation-services">
            {activePkg.items.map((item, i) => (
              <li key={i} style={{ color: '#16a34a' }}>✓ {item}</li>
            ))}
            {activePkg.notIncluded.map((item, i) => (
              <li key={`n-${i}`} style={{ color: 'var(--tp-gray-mid)', opacity: 0.7 }}>✗ {item}</li>
            ))}
          </ul>

          {/* Selektor pakietów — zawsze widoczny */}
          <div style={{ margin: '16px 0', padding: '14px 16px', background: 'var(--bg-body)', border: '2px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, fontWeight: 700, color: 'var(--tp-gray-mid)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
              Wybierz pakiet
            </div>
            {Object.values(PACKAGES).map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                    setSelectedPkg(p.id);
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ event: 'package_selected', package_name: p.name, package_price: p.price, currency: 'PLN' });
                  }}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 12px', marginBottom: 6,
                  background: selectedPkg === p.id ? 'var(--bg-selected)' : 'var(--bg-card)',
                  border: `2px solid ${selectedPkg === p.id ? 'var(--tp-orange)' : 'var(--border)'}`,
                  borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: 'var(--tp-dark)', fontWeight: 600 }}>
                  Pakiet {p.name}{p.id === pkg.id ? ' (rekomendowany)' : ''}
                </span>
                <span style={{ fontSize: 13, color: 'var(--tp-orange)', fontWeight: 700 }}>
                  {p.price.toLocaleString('pl-PL')} PLN
                </span>
              </button>
            ))}
          </div>


          {/* Cena */}
          <div className="price-block">
            <div>
              <div className="price-block-label">Cena wdrożenia</div>
              <div className="price-block-note">jednorazowa opłata, bez ukrytych kosztów</div>
            </div>
            <div className="price-block-amount">{priceLabel}</div>
          </div>

          {/* Porównaj pakiety */}
          <button
            type="button"
            onClick={() => {
              setShowComparison(s => !s);
              setTimeout(() => comparisonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
            }}
            style={{
              width: '100%', marginTop: 12, padding: '11px',
              background: 'none', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
              fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            {showComparison ? '▲ Ukryj porównanie' : '⊞ Porównaj pakiety →'}
          </button>

          {/* Tabela porównawcza */}
          {showComparison && (
            <div ref={comparisonRef} style={{ marginTop: 16 }}>
              {Object.values(PACKAGES).map(p => {
                const isActive = selectedPkg === p.id;
                const isRec    = p.id === pkg.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                    setSelectedPkg(p.id);
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ event: 'package_selected', package_name: p.name, package_price: p.price, currency: 'PLN' });
                  }}
                    style={{
                      marginBottom: 10, padding: '14px 16px',
                      border: `2px solid ${isActive ? 'var(--tp-orange)' : 'rgba(255,255,255,0.15)'}`,
                      borderRadius: 10, cursor: 'pointer',
                      background: isActive ? 'rgba(249,115,22,0.1)' : 'rgba(255,255,255,0.04)',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: '50%',
                          border: `2px solid ${isActive ? 'var(--tp-orange)' : 'rgba(255,255,255,0.3)'}`,
                          background: isActive ? 'var(--tp-orange)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, color: '#fff', flexShrink: 0,
                        }}>{isActive ? '✓' : ''}</span>
                        <span style={{ fontFamily: 'Alata, sans-serif', fontSize: 15, color: '#fff' }}>
                          Pakiet {p.name}
                          {isRec && <span style={{ marginLeft: 8, fontSize: 10, background: 'var(--tp-orange)', color: '#fff', padding: '2px 7px', borderRadius: 20, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700 }}>rekomendowany</span>}
                        </span>
                      </div>
                      <span style={{ fontFamily: 'Alata, sans-serif', fontSize: 16, color: 'var(--tp-orange)', fontWeight: 700 }}>
                        {p.price.toLocaleString('pl-PL')} PLN
                      </span>
                    </div>
                    <ul style={{ listStyle: 'none', margin: 0, paddingLeft: 26, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {p.items.map((item, i) => (
                        <li key={i} style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: '#16a34a' }}>✓ {item}</li>
                      ))}
                      {p.notIncluded.map((item, i) => (
                        <li key={`n${i}`} style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>✗ {item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {/* Gwarancja zwrotu */}
          <div className="money-back-badge" style={{ marginTop: 16 }}>
            <span className="money-back-icon">🛡️</span>
            <div className="money-back-text">
              <strong>Gwarancja zwrotu pieniędzy</strong>
              Jeśli z jakiegoś powodu zrezygnujesz przed rozpoczęciem prac —
              zwrócimy pełną kwotę bez pytań.
            </div>
          </div>

          {/* ── Upload plików ── */}
          {(formData.maLogo === 'tak' || formData.maWizualizacje === 'tak') && (
            <div style={{
              marginTop: 20, padding: '16px 18px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10,
            }}>
              <div style={{ fontFamily: 'Alata, sans-serif', fontSize: 14, color: '#fff', marginBottom: 4 }}>
                📎 Wgraj materiały (opcjonalne)
              </div>
              <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 14, lineHeight: 1.5 }}>
                Możesz wgrać pliki teraz — przyspieszy to realizację. Możliwość wgrania będzie też po zamówieniu.
              </p>
              <div style={{ display: 'grid', gap: 12 }}>
                {formData.maLogo === 'tak' && (
                  <FileUploadBox
                    icon="🎨" title="Logo inwestycji"
                    accept="image/*,.pdf,.svg,.ai,.eps,.zip"
                    multiple={false} maxMB={MAX_LOGO_MB}
                    files={formData.logoFile}
                    onChange={file => onChange('logoFile', file)}
                  />
                )}
                {formData.maWizualizacje === 'tak' && (
                  <FileUploadBox
                    icon="🖼️" title="Wizualizacje 3D / zdjęcia"
                    accept="image/*,video/*,.pdf,.zip"
                    multiple={true} maxMB={MAX_VIZ_MB}
                    files={formData.wizualizacjeFiles}
                    onChange={files => onChange('wizualizacjeFiles', files)}
                  />
                )}
              </div>
            </div>
          )}

          {/* ── CTA: przyciski LUB formularz zamówienia ── */}
          {!showOrderForm ? (
            <>
              <button
                className="btn btn-cta"
                type="button"
                onClick={() => setShowOrderForm(true)}
                style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
              >
                Zamów za {priceLabel} →
              </button>

              <div
                className="contact-banner"
                onClick={openContact}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openContact()}
              >
                <p className="contact-banner-text">
                  Masz pytania? Skontaktuj się z naszym zespołem.
                </p>
                <p className="office-hours" style={{ color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                  Działamy <strong>pon.–pt., godz. 10:00–16:00</strong>
                </p>
              </div>
            </>
          ) : (
            /* ── FORMULARZ KONTAKTOWY (zamów) ───────────────────────── */
            <div className="order-form-section">
              <h3 style={{ color: 'var(--tp-dark)', fontSize: 16, marginBottom: 4, marginTop: 16 }}>
                Zostaw nam swoje dane
              </h3>
              <p style={{ color: '#fff', fontSize: 13, marginBottom: 18 }}>
                Skontaktujemy się z Tobą, aby omówić szczegóły i uruchomić projekt. Pola oznaczone * są wymagane.
              </p>

              {/* Imię + Nazwisko */}
              <div className="order-form-grid">
                <div className="order-field">
                  <label>Imię *</label>
                  <input
                    type="text"
                    className={`order-input${orderErrors.imie ? ' error' : ''}`}
                    value={order.imie}
                    onChange={e => upOrder('imie', e.target.value)}
                    placeholder="Jan"
                  />
                  {orderErrors.imie && <span className="field-error">Pole wymagane</span>}
                </div>
                <div className="order-field">
                  <label>Nazwisko *</label>
                  <input
                    type="text"
                    className={`order-input${orderErrors.nazwisko ? ' error' : ''}`}
                    value={order.nazwisko}
                    onChange={e => upOrder('nazwisko', e.target.value)}
                    placeholder="Kowalski"
                  />
                  {orderErrors.nazwisko && <span className="field-error">Pole wymagane</span>}
                </div>
              </div>

              {/* Telefon + Email */}
              <div className="order-form-grid">
                <div className="order-field">
                  <label>Telefon *</label>
                  <input
                    type="tel"
                    className={`order-input${orderErrors.telefon ? ' error' : ''}`}
                    value={order.telefon}
                    onChange={e => upOrder('telefon', e.target.value)}
                    placeholder="+48 500 000 000"
                  />
                  {orderErrors.telefon && <span className="field-error">Pole wymagane</span>}
                </div>
                <div className="order-field">
                  <label>Adres e-mail *</label>
                  <input
                    type="email"
                    className={`order-input${orderErrors.email ? ' error' : ''}`}
                    value={order.email}
                    onChange={e => upOrder('email', e.target.value)}
                    placeholder="jan@firma.pl"
                  />
                  {orderErrors.email && <span className="field-error">Podaj poprawny adres</span>}
                </div>
              </div>

              {/* Zgody RODO */}
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <ConsentCheckbox
                  checked={order.zgodaPrzetwarzanie}
                  onChange={v => upOrder('zgodaPrzetwarzanie', v)}
                  hasError={orderErrors.zgodaPrzetwarzanie}
                  onPrivacy={() => setShowPrivacy(true)}
                  type="przetwarzanie"
                />
                <ConsentCheckbox
                  checked={order.zgodaKlauzula}
                  onChange={v => upOrder('zgodaKlauzula', v)}
                  hasError={orderErrors.zgodaKlauzula}
                  onPrivacy={() => setShowPrivacy(true)}
                  type="klauzula"
                />
              </div>

              {/* Submit */}
              <button
                className="btn btn-cta"
                type="button"
                onClick={handleOrderSubmit}
                style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
              >
                Wyślij →
              </button>

              <button
                type="button"
                onClick={() => setShowOrderForm(false)}
                style={{
                  width: '100%', marginTop: 8, padding: '10px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--tp-gray-mid)', fontSize: 13,
                }}
              >
                ← Wróć do podsumowania
              </button>
            </div>
          )}
        </div>

        {/* ── Dlaczego to dobry wybór ── */}
        <div className="summary-card">
          <h3>✅ Dlaczego to dobry wybór</h3>
          <ul className="benefits-list">
            {[
              'Zgodność z nową ustawą deweloperską',
              'Integracja z danymi GOV – automatyczne aktualizacje regulacji',
              'Szybkie działanie i optymalizacja SEO',
              'Gotowy system generowania leadów sprzedażowych',
              'Nowoczesny design dopasowany do sprzedaży inwestycji',
              'Wsparcie techniczne i marketingowe po wdrożeniu',
              'Gwarancja zwrotu pieniędzy – zero ryzyka',
            ].map((b, i) => (
              <li key={i}>
                <span className="benefit-check">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {(formData.maDomene === 'nie' || formData.maDomene === 'nie-wiem') && (
        <div style={{
          marginTop: 24, padding: '12px 16px',
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: '#166534',
        }}>
          <span style={{ fontSize: 16 }}>ℹ️</span>
          <span>Domenę i hosting zamówisz w kolejnym kroku — po realizacji zamówienia.</span>
        </div>
      )}

      <div className="step-nav" style={{ borderTop: '1px solid var(--border)', marginTop: 32 }}>
        <button className="btn btn-back" onClick={onBack} type="button">← Wstecz</button>
      </div>
    </div>
  );
}
