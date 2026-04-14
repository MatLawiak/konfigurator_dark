/**
 * sendNotification.js
 * Wysyła powiadomienie do webhooka n8n z danymi leada i plikami (base64).
 *
 * Konfiguracja:
 *   WEBHOOK_URL  – URL webhooka n8n.
 *   PHONE_NUMBER – Numer telefonu biura wyświetlany w przycisku "Zadzwoń".
 *
 * Limity plików:
 *   Logo:          max 3 MB  → base64 w payloadzie
 *   Wizualizacje:  max 5 MB każda (pomijamy większe, dołączamy tylko metadane)
 */

// ─── KONFIGURACJA ────────────────────────────────────────────
export const PHONE_NUMBER = '+48 XXX XXX XXX'; // TODO: wstaw numer TwistedPixel
export const PHONE_RAW    = '+48XXXXXXXXX';     // format tel: href

const WEBHOOK_URL  = 'https://n8n.srv1076230.hstgr.cloud/webhook/konfigurator-lead';
const MAX_LOGO_B   = 3 * 1024 * 1024;   // 3 MB
const MAX_VIZ_B    = 5 * 1024 * 1024;   // 5 MB na plik
// ─────────────────────────────────────────────────────────────

/** Konwertuje File do base64 (bez prefiksu data:...) */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Czytelny rozmiar pliku */
function fmtSize(bytes) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

/**
 * Wysyła POST do webhooka n8n z pełnymi danymi formularza.
 * Pliki spełniające limit rozmiaru dołączane są jako base64 (n8n odtwarza je
 * jako załączniki e-mail). Większe pliki przesyłane są tylko jako metadane.
 *
 * @param {object} formData    – stan formularza z App.jsx
 * @param {'zamow'|'kontakt'|'zadzwon'} action – akcja wyzwalająca
 * @param {object} contactInfo – dane kontaktowe klienta z formularza (imie, nazwisko,
 *                               telefon, email, faktura*, uwagi* | wiadomosc*)
 */
export async function sendLeadNotification(formData, action, contactInfo = {}) {

  // ── Przygotowanie pliku logo ──────────────────────────────
  let logoPayload = null;
  if (formData.logoFile) {
    const f = formData.logoFile;
    const meta = { name: f.name, mime: f.type, size: fmtSize(f.size) };
    if (f.size <= MAX_LOGO_B) {
      try {
        meta.data = await fileToBase64(f);
      } catch {
        // pomijamy base64 jeśli odczyt się nie powiódł
      }
    } else {
      meta.pominiety = true;
      meta.powod = `plik za duży (${fmtSize(f.size)}, limit 3 MB)`;
    }
    logoPayload = meta;
  }

  // ── Przygotowanie plików wizualizacji ─────────────────────
  const wizPayload = [];
  for (const f of (formData.wizualizacjeFiles ?? [])) {
    const meta = { name: f.name, mime: f.type, size: fmtSize(f.size) };
    if (f.size <= MAX_VIZ_B) {
      try {
        meta.data = await fileToBase64(f);
      } catch {
        // pomijamy
      }
    } else {
      meta.pominiety = true;
      meta.powod = `plik za duży (${fmtSize(f.size)}, limit 5 MB)`;
    }
    wizPayload.push(meta);
  }

  // ── GA4 client_id z cookie _ga ────────────────────────────
  let ga_client_id = '';
  try {
    const gaCookie = document.cookie.split(';').find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const parts = gaCookie.trim().split('.');
      if (parts.length >= 4) ga_client_id = parts[2] + '.' + parts[3];
    }
  } catch { /* ignoruj */ }

  // ── Payload ───────────────────────────────────────────────
  const payload = {
    timestamp:    new Date().toISOString(),
    action,                                           // zamow | kontakt | zadzwon
    ga_client_id,
    event_id: contactInfo.eventId || '',
    cena:         formData.autoDaneGov ? '4 500 PLN' : '2 200 PLN',
    addon_daneGov: formData.autoDaneGov ?? false,

    klient: {
      nazwaInwestycji:        formData.nazwaInwestycji       || '(nie podano)',
      statusInwestycji:       formData.statusInwestycji      || '—',
      typInwestycji:          formData.typInwestycji         || '—',
      maStrone:               formData.maStrone              || '—',
      adresStrony:            formData.adresStrony           || '—',
      maDomene:               formData.maDomene              || '—',
      maLogo:                 formData.maLogo                || '—',
      maIdentyfikacje:        formData.maIdentyfikacje        || '—',
      identyfikacjaCzesciowo: formData.identyfikacjaCzesciowo ?? [],
      maMaterialy:            formData.maMaterialy           || '—',
      maWizualizacje:         formData.maWizualizacje        || '—',
      stylStrony:             formData.stylStrony            || '—',
      wybranyTemplate:        formData.wybranaStrona         || '—',
      addonDaneGovData:       formData.addonDaneGovData      || {},
    },

    pliki: {
      logo:          logoPayload,
      wizualizacje:  wizPayload,
    },

    // Dane kontaktowe klienta (z formularza zamówienia lub modalu kontaktowego)
    kontakt: contactInfo,
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn('[TP Konfigurator] Webhook odpowiedział błędem:', res.status);
    }
  } catch (err) {
    console.warn('[TP Konfigurator] Nie udało się wysłać powiadomienia:', err.message);
  }
}
