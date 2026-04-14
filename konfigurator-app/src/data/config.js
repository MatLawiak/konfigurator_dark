/**
 * Twisted Pixel – Konfigurator inwestycji
 * Plik konfiguracji: definicje kroków, opcji i logika rekomendacji.
 */

// ============================================================
// DEFINICJE KROKÓW
// ============================================================
export const STEPS = [
  { id: 1,  label: 'Start' },
  { id: 2,  label: 'Inwestycja' },
  { id: 3,  label: 'Strona' },
  { id: 4,  label: 'Branding' },
  { id: 5,  label: 'Domena' },
  { id: 6,  label: 'Styl' },
  { id: 7,  label: 'Wizualizacje' },
  { id: 8,  label: 'Szablon' },
  { id: 9,  label: 'Podsumowanie' },
  { id: 10, label: 'Gotowe' },
];

// Kroki z widocznym licznikiem paska postępu (Start i Gotowe nie liczą się)
export const VISIBLE_STEPS = STEPS.filter(s => s.id > 1 && s.id < 10);
export const TOTAL_VISIBLE = VISIBLE_STEPS.length; // 8

// ============================================================
// KROK 2 – Typ inwestycji
// ============================================================
export const INVESTMENT_STATUS_OPTIONS = [
  {
    value: 'w-trakcie',
    label: 'Tak – inwestycja jest w trakcie realizacji',
    icon: '🏗️',
    desc: 'Budowa trwa, potrzebuję marketingu już teraz',
  },
  {
    value: 'planowanie',
    label: 'Tak – inwestycja jest na etapie planowania',
    icon: '📋',
    desc: 'Mam projekt, zaczynam przygotowania',
  },
];

export const INVESTMENT_TYPE_OPTIONS = [
  {
    value: 'mieszkania',
    label: 'Inwestycja mieszkaniowa',
    icon: '🏢',
    desc: 'Osiedla, bloki, kamienice — mieszkania przeznaczone do sprzedaży lub wynajmu dla osób prywatnych.',
  },
  {
    value: 'domy',
    label: 'Domy jednorodzinne',
    icon: '🏠',
    desc: 'Domy wolnostojące, szeregowce, bliźniaki — inwestycje skierowane do klientów szukających własnego domu.',
  },
  {
    value: 'apartamenty',
    label: 'Apartamenty / lokale inwestycyjne',
    icon: '🏙️',
    desc: 'Apartamenty na wynajem krótko- lub długoterminowy, lokale inwestycyjne generujące pasywny dochód.',
  },
  {
    value: 'premium',
    label: 'Inwestycje o podwyższonym standardzie',
    icon: '💎',
    desc: 'Nieruchomości klasy premium — wysoka jakość wykończenia, prestiżowa lokalizacja, klient o wysokich wymaganiach.',
  },
  {
    value: 'mixed-use',
    label: 'Mixed-use',
    icon: '🏗️',
    desc: 'Wielofunkcyjne obiekty łączące funkcję mieszkalną z komercyjną — np. usługi, biura, handel na parterze.',
  },
];

// ============================================================
// KROK 3 – Strona internetowa
// ============================================================
export const WEBSITE_OPTIONS = [
  {
    value: 'tak',
    label: 'Chcę ulepszyć / poprawić / rozbudować aktualną stronę',
    icon: '🔧',
    desc: 'Masz już stronę, ale wymaga odświeżenia, dodania funkcji lub poprawy skuteczności sprzedażowej.',
  },
  {
    value: 'nie',
    label: 'Potrzebuję nowej strony',
    icon: '🚀',
    desc: 'Inwestycja nie ma jeszcze strony lub zaczynasz całkowicie od nowa.',
  },
];

// ============================================================
// KROK 4 – Identyfikacja wizualna
// ============================================================
export const LOGO_OPTIONS = [
  { value: 'tak', label: 'Tak, mam logo', icon: '✅' },
  { value: 'nie', label: 'Nie mam logo', icon: '❌' },
];

export const IDENTITY_OPTIONS = [
  {
    value: 'tak',
    label: 'Tak, mam gotową księgę znaków',
    icon: '✅',
    desc: 'Posiadam paletę kolorów, dobrane czcionki i elementy wizualne dla inwestycji.',
  },
  {
    value: 'czesciowo',
    label: 'Mam tylko część — logo lub kolory',
    icon: '🔶',
    desc: 'Coś jest, ale nie ma kompletnej spójnej identyfikacji.',
  },
  {
    value: 'nie',
    label: 'Nie — zaczniemy od zera',
    icon: '❌',
    desc: 'Nie ma żadnych ustalonych elementów wizualnych. Zajmiemy się tym kompleksowo.',
  },
];

export const MATERIALS_OPTIONS = [
  { value: 'tak', label: 'Tak, mam materiały', icon: '✅' },
  { value: 'nie', label: 'Nie mam materiałów', icon: '❌' },
];

// ============================================================
// KROK 5 – Domena
// ============================================================
export const DOMAIN_OPTIONS = [
  {
    value: 'tak',
    label: 'Tak, mam domenę',
    icon: '✅',
    desc: 'Zarejestrowana i gotowa do użycia',
  },
  {
    value: 'nie',
    label: 'Nie mam domeny',
    icon: '❌',
    desc: 'Trzeba będzie zarejestrować domenę dla inwestycji',
  },
  {
    value: 'nie-wiem',
    label: 'Nie wiem',
    icon: '❓',
    desc: 'Nie jestem pewien, czy inwestycja ma domenę',
  },
];

// ============================================================
// KROK 6 – Styl strony
// ============================================================
export const STYLE_OPTIONS = [
  {
    value: 'minimalizm',
    label: 'Nowoczesny minimalizm',
    desc: 'Czyste linie, przestrzeń, elegancja',
    cssClass: 'style-minimalizm',
    emoji: '◻️',
  },
  {
    value: 'premium',
    label: 'Luksusowy premium',
    desc: 'Ciemne tła, ekskluzywny charakter',
    cssClass: 'style-premium',
    emoji: '🌑',
  },
  {
    value: 'sprzedazowy',
    label: 'Sprzedażowy',
    desc: 'Skupiony na konwersji i leadach',
    cssClass: 'style-sprzedazowy',
    emoji: '🎯',
  },
  {
    value: 'architektoniczny',
    label: 'Architektoniczny',
    desc: 'Duże zdjęcia, rzuty, technika',
    cssClass: 'style-architektoniczny',
    emoji: '📐',
  },
];

// ============================================================
// KROK 7 – Wizualizacje
// ============================================================
export const VISUALIZATION_OPTIONS = [
  {
    value: 'tak',
    label: 'Tak, mam wizualizacje',
    icon: '✅',
    desc: 'Gotowe renderingi 3D lub fotografie inwestycji',
  },
  {
    value: 'nie',
    label: 'Nie mam wizualizacji',
    icon: '❌',
    desc: 'Inwestycja nie posiada wizualizacji architektonicznych',
  },
  {
    value: 'w-trakcie',
    label: 'Są w trakcie przygotowania',
    icon: '⏳',
    desc: 'Wizualizacje są zlecone lub w trakcie tworzenia',
  },
];

// ============================================================
// KROK 8 – Szablony stron
// ============================================================
export const TEMPLATE_EXAMPLES = [
  {
    id: 'malta',
    name: 'Malta View',
    desc: 'Luksusowy premium',
    style: 'premium',
    bgColor: 'linear-gradient(135deg, #1a1814 0%, #2d2820 100%)',
    emoji: '💫',
    previewUrl: 'https://maltaview.pl/',
  },
  {
    id: 'ogrody',
    name: 'Ogrody Potasze',
    desc: 'Nowoczesny minimalizm',
    style: 'minimalizm',
    bgColor: 'linear-gradient(135deg, #f5f5f0 0%, #ddddd8 100%)',
    emoji: '🌿',
    previewUrl: 'https://ogrodypotasze.pl/',
  },
  {
    id: 'atinwest',
    name: 'AT-Inwest',
    desc: 'Sprzedażowy',
    style: 'sprzedazowy',
    bgColor: 'linear-gradient(135deg, #fdf0e8 0%, #ffd4b5 100%)',
    emoji: '🎯',
    previewUrl: 'https://at-inwest.pl/',
  },
  {
    id: 'artbud',
    name: 'ArtBud Group',
    desc: 'Architektoniczny',
    style: 'architektoniczny',
    bgColor: 'linear-gradient(135deg, #e8eef2 0%, #b8cdd8 100%)',
    emoji: '📐',
    previewUrl: 'https://artbudgroup.pl/',
  },
];

// ============================================================
// LOGIKA REKOMENDACJI
// ============================================================

// ============================================================
// PAKIETY I CENNIK
// ============================================================

export const PACKAGES = {
  starter: {
    id:    'starter',
    name:  'Starter',
    price: 5999,
    desc:  'Gotowa strona sprzedażowa z wizualizacjami i dostępem do CMS.',
    items: [
      'Strona sprzedażowa inwestycji',
      '1 wizualizacja zewnątrz + 1 wewnątrz',
      'Dostęp do CMS — samodzielna edycja treści, w tym cen lokali',
      'Tabela cen lokali zgodna z ustawą deweloperską',
      'Rejestracja i konfiguracja domeny',
    ],
    notIncluded: [
      'Automatyzacja raportowania dane.gov.pl',
      'Analityka i śledzenie konwersji',
      'Identyfikacja wizualna / księga znaków',
    ],
  },
  standard: {
    id:    'standard',
    name:  'Standard',
    price: 7499,
    desc:  'Pełna strona sprzedażowa z automatyzacją danych i analityką.',
    items: [
      'Strona sprzedażowa inwestycji',
      '4 wizualizacje architektoniczne',
      'Dostęp do CMS — samodzielna edycja treści, w tym cen lokali',
      'Tabela cen lokali zgodna z ustawą deweloperską',
      'Automatyzacja raportowania do dane.gov.pl',
      'Podstawowa analityka GA4',
      'Rejestracja i konfiguracja domeny',
    ],
    notIncluded: [
      'Identyfikacja wizualna / księga znaków',
      'Animacje video z wizualizacji',
    ],
  },
  premium: {
    id:    'premium',
    name:  'Premium',
    price: 9999,
    desc:  'Kompletny pakiet — strona, branding, automatyzacja i produkcja wizualna.',
    items: [
      'Strona sprzedażowa inwestycji',
      'Do 8 wizualizacji architektonicznych',
      '2 animacje video z wizualizacji',
      'Pełna identyfikacja wizualna — księga znaków',
      'Dostęp do CMS — samodzielna edycja treści, w tym cen lokali',
      'Tabela cen lokali zgodna z ustawą deweloperską',
      'Pełna automatyzacja raportowania do dane.gov.pl',
      'Rozbudowana analityka GA4 + śledzenie konwersji',
      'Rejestracja i konfiguracja domeny',
    ],
    notIncluded: [],
  },
};

export const ADDONS = [
  {
    id:    'automatyzacja',
    label: 'Automatyzacja dane.gov.pl',
    desc:  'Codzienne generowanie pliku CSV/XML z cenami lokali — pełna zgodność z art. 19b.',
    price: 3000,
    icon:  '🏛️',
  },
  {
    id:    'wizualizacja',
    label: 'Wizualizacja architektoniczna 3D',
    desc:  'Profesjonalny rendering zewnętrza lub wnętrza inwestycji.',
    price: 999,
    icon:  '🏗️',
    unit:  'szt.',
  },
  {
    id:    'video',
    label: 'Animacja video z wizualizacji',
    desc:  'Film animowany tworzony na bazie gotowych wizualizacji 3D.',
    price: 750,
    icon:  '🎬',
    unit:  'szt.',
  },
  {
    id:    'ksiega',
    label: 'Księga znaków / identyfikacja wizualna',
    desc:  'Pełna identyfikacja marki inwestycji — logo, kolory, typografia, zasady użycia.',
    price: 2999,
    icon:  '📐',
  },
];

/**
 * Na podstawie odpowiedzi użytkownika dobiera pakiet i dodatki.
 *
 * Logika:
 * - Premium  → brak identyfikacji wizualnej (potrzebna księga znaków)
 * - Standard → potrzeba automatyzacji dane.gov lub brak wizualizacji
 * - Starter  → wszystko gotowe, potrzebna tylko strona
 *
 * @param {Object} data - formData z App.jsx
 * @returns {{ package: Object, upgradeFrom: Object|null, addons: Array, services: Array }}
 */
export function generateRecommendations(data) {
  const services = [];

  // --- Branding ---
  if (data.maLogo === 'nie') {
    services.push({ id: 'logo', label: 'Logo inwestycji', icon: '🎨', category: 'branding' });
  }
  if (data.maIdentyfikacje === 'nie') {
    services.push({ id: 'identyfikacja', label: 'Pełna identyfikacja wizualna — księga znaków', icon: '📐', category: 'branding' });
  } else if (data.maIdentyfikacje === 'czesciowo') {
    services.push({ id: 'identyfikacja-rozbudowa', label: 'Rozbudowa identyfikacji wizualnej', icon: '🖌️', category: 'branding' });
  }

  // --- Web ---
  if (data.maStrone === 'nie') {
    services.push({ id: 'strona', label: 'Nowa strona sprzedażowa inwestycji', icon: '🌐', category: 'web' });
  } else if (data.maStrone === 'tak') {
    services.push({ id: 'strona-rozbudowa', label: 'Rozbudowa i optymalizacja istniejącej strony', icon: '🔧', category: 'web' });
  }
  if (data.maDomene === 'nie' || data.maDomene === 'nie-wiem') {
    services.push({ id: 'domena', label: 'Rejestracja i konfiguracja domeny', icon: '🔗', category: 'web' });
  }

  // --- Wizualizacje ---
  if (data.maWizualizacje === 'nie') {
    services.push({ id: 'wizualizacje', label: 'Wizualizacje architektoniczne 3D', icon: '🏗️', category: 'content' });
  } else if (data.maWizualizacje === 'w-trakcie') {
    services.push({ id: 'wizualizacje-wsparcie', label: 'Integracja wizualizacji po ich dostarczeniu', icon: '🏗️', category: 'content' });
  }

  // --- Dobór pakietu ---
  const needsBranding   = data.maIdentyfikacje === 'nie';
  const needsAutomation = data.autoDaneGov || data.maWizualizacje === 'nie';

  let pkg;
  let upgradeFrom = null;

  if (needsBranding) {
    pkg = PACKAGES.premium;
    upgradeFrom = null;
  } else if (needsAutomation) {
    pkg = PACKAGES.standard;
    upgradeFrom = PACKAGES.starter;
  } else {
    pkg = PACKAGES.starter;
    upgradeFrom = null;
  }

  // --- Sugerowane dodatki (poza pakietem) ---
  const suggestedAddons = [];
  if (pkg.id === 'starter' && (data.autoDaneGov)) {
    suggestedAddons.push(ADDONS.find(a => a.id === 'automatyzacja'));
  }
  if (data.maWizualizacje === 'nie' && pkg.id !== 'premium') {
    suggestedAddons.push(ADDONS.find(a => a.id === 'wizualizacja'));
  }
  if (data.maIdentyfikacje !== 'nie' && pkg.id !== 'premium') {
    suggestedAddons.push(ADDONS.find(a => a.id === 'ksiega'));
  }

  return {
    package:     pkg,
    upgradeFrom,
    addons:      suggestedAddons.filter(Boolean),
    services,
  };
}

// ============================================================
// WALIDACJA KROKÓW
// ============================================================

/**
 * Sprawdza czy dany krok ma wypełnione wymagane pola.
 * @param {number} step
 * @param {Object} formData
 * @returns {boolean}
 */
export function isStepValid(step, formData) {
  switch (step) {
    case 2:
      return !!formData.statusInwestycji && !!formData.typInwestycji;
    case 3:
      return !!formData.maStrone;
    case 4:
      return !!formData.maLogo && !!formData.maIdentyfikacje;
    case 5:
      return !!formData.maDomene;
    case 6:
      return !!formData.stylStrony;
    case 7:
      return !!formData.maWizualizacje;
    case 8:
      return !!formData.wybranaStrona;
    default:
      return true;
  }
}
