/**
 * Modal z pełną treścią Polityki Prywatności Twisted Pixel Sp. z o.o.
 * Otwierany linkiem z checkboxów zgód w formularzach.
 */
export default function PrivacyPolicyModal({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#fff', borderRadius: 12, maxWidth: 720, width: '100%',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Nagłówek */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', borderBottom: '1px solid #e5e7eb',
          flexShrink: 0,
        }}>
          <h2 style={{ margin: 0, fontSize: 18, color: '#1a1a2e' }}>Polityka Prywatności</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', fontSize: 24,
              cursor: 'pointer', color: '#6b7280', lineHeight: 1,
            }}
          >×</button>
        </div>

        {/* Treść — przewijalna */}
        <div style={{
          overflowY: 'auto', padding: '24px',
          fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13,
          lineHeight: 1.8, color: '#374151',
        }}>
          <p style={{ color: '#6b7280', marginBottom: 20 }}>Obowiązuje od: 2026 r.</p>

          <Section title="I. Administrator danych osobowych">
            <p>Administratorem Pana/Pani danych osobowych jest <strong>Twisted Pixel spółka z ograniczoną odpowiedzialnością</strong> z siedzibą w Poznaniu (61-806), ul. Święty Marcin 29/8, wpisana do Rejestru Przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS: 0001129097, NIP: 7831912954, REGON: 529741770 (dalej: „Spółka" lub „Administrator").</p>
            <p>W sprawach związanych z ochroną danych osobowych można kontaktować się z Administratorem:</p>
            <ul>
              <li>korespondencyjnie: ul. Święty Marcin 29/8, 61-806 Poznań</li>
              <li>e-mailowo: hello@twistedpixel.pl</li>
              <li>telefonicznie: +48 538 111 865</li>
            </ul>
          </Section>

          <Section title="II. Zakres zbieranych danych i cele przetwarzania">
            <p>Administrator zbiera i przetwarza dane osobowe w następujących celach i zakresach:</p>

            <h4>1. Formularz kontaktowy / konfigurator</h4>
            <p><strong>Zakres danych:</strong> imię, nazwisko, adres e-mail, numer telefonu, treść wiadomości oraz opcjonalnie inne dane podane dobrowolnie przez użytkownika.</p>
            <p><strong>Cel przetwarzania:</strong> udzielenie odpowiedzi na zapytanie, przedstawienie oferty usług marketingowych Administratora, nawiązanie kontaktu handlowego.</p>
            <p><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a) RODO (zgoda), art. 6 ust. 1 lit. b) RODO (podjęcie działań na żądanie osoby przed zawarciem umowy), art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes Administratora – marketing bezpośredni własnych usług).</p>

            <h4>2. Analityka internetowa</h4>
            <p><strong>Narzędzia:</strong> Google Analytics 4, Meta Pixel, Google Tag Manager.</p>
            <p><strong>Zakres danych:</strong> adres IP (anonimizowany), dane o urządzeniu i przeglądarce, aktywność na stronie, źródło ruchu, lokalizacja (przybliżona).</p>
            <p><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a) RODO (zgoda wyrażona za pośrednictwem banera cookie).</p>
          </Section>

          <Section title="III. Pliki cookies i technologie śledzące">
            <p>Serwis wykorzystuje pliki cookies (ciasteczka) oraz podobne technologie. Rodzaje wykorzystywanych plików cookies:</p>
            <ul>
              <li><strong>Niezbędne (techniczne)</strong> – zapewniają prawidłowe działanie strony, nie wymagają zgody użytkownika.</li>
              <li><strong>Analityczne (Google Analytics 4)</strong> – umożliwiają analizę ruchu na stronie i zachowań użytkowników. Wymagają zgody.</li>
              <li><strong>Marketingowe (Meta Pixel, Google Ads)</strong> – umożliwiają wyświetlanie spersonalizowanych reklam, mierzenie konwersji, remarketing. Wymagają zgody.</li>
            </ul>
          </Section>

          <Section title="IV. Odbiorcy danych osobowych">
            <p>Dane osobowe użytkowników mogą być przekazywane następującym kategoriom odbiorców:</p>
            <ul>
              <li>Meta Platforms Ireland Ltd. – w związku z prowadzeniem kampanii reklamowych Meta Ads.</li>
              <li>Google Ireland Ltd. – w związku z Google Analytics 4, Google Ads, Google Tag Manager.</li>
              <li>Podmioty świadczące usługi IT, hostingowe, CRM – na podstawie umów powierzenia przetwarzania danych.</li>
              <li>Organy państwowe – w przypadkach przewidzianych przepisami prawa.</li>
            </ul>
          </Section>

          <Section title="V. Przekazywanie danych poza EOG">
            <p>W związku z korzystaniem z usług Google i Meta dane osobowe mogą być przekazywane do Stanów Zjednoczonych na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony danych (EU-US Data Privacy Framework) lub standardowych klauzul umownych (SCC).</p>
          </Section>

          <Section title="VI. Okres przechowywania danych">
            <ul>
              <li>Dane z formularzy kontaktowych i leadów – przez okres prowadzenia korespondencji, następnie przez okres przedawnienia ewentualnych roszczeń (do 6 lat).</li>
              <li>Dane przetwarzane na podstawie zgody – do czasu cofnięcia zgody.</li>
              <li>Dane przetwarzane na podstawie uzasadnionego interesu – do czasu wniesienia skutecznego sprzeciwu.</li>
              <li>Dane wynikające z obowiązków prawnych (np. podatkowe, księgowe) – przez okres wymagany przepisami prawa.</li>
            </ul>
          </Section>

          <Section title="VII. Prawa osób, których dane dotyczą">
            <p>Każdej osobie, której dane są przetwarzane, przysługują następujące prawa:</p>
            <ul>
              <li>Prawo dostępu do danych (art. 15 RODO)</li>
              <li>Prawo do sprostowania danych (art. 16 RODO)</li>
              <li>Prawo do usunięcia danych (art. 17 RODO)</li>
              <li>Prawo do ograniczenia przetwarzania (art. 18 RODO)</li>
              <li>Prawo do przenoszenia danych (art. 20 RODO)</li>
              <li>Prawo sprzeciwu (art. 21 RODO)</li>
              <li>Prawo do cofnięcia zgody – w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed cofnięciem.</li>
              <li>Prawo do wniesienia skargi do organu nadzorczego – Prezes Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, https://uodo.gov.pl).</li>
            </ul>
            <p>W celu realizacji powyższych praw należy skontaktować się z Administratorem: hello@twistedpixel.pl</p>
          </Section>

          <Section title="VIII. Bezpieczeństwo danych">
            <p>Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo przetwarzanych danych osobowych, w szczególności zabezpiecza dane przed nieuprawnionym dostępem, utratą, zniszczeniem lub modyfikacją. Stosowane środki obejmują m.in.: szyfrowanie połączenia (SSL/TLS), kontrolę dostępu do systemów informatycznych, regularne kopie zapasowe oraz szkolenia personelu z zakresu ochrony danych osobowych.</p>
          </Section>

          <Section title="IX. Zmiany Polityki Prywatności">
            <p>Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. Aktualna wersja jest zawsze dostępna na stronie: <strong>twistedpixel.pl/polityka-prywatnosci</strong></p>
          </Section>

          <div style={{
            marginTop: 24, padding: '16px', background: '#f9fafb',
            borderRadius: 8, fontSize: 12, color: '#6b7280',
          }}>
            Twisted Pixel Sp. z o.o. · ul. Święty Marcin 29/8, 61-806 Poznań · KRS: 0001129097 · NIP: 7831912954
          </div>
        </div>

        {/* Stopka */}
        <div style={{
          padding: '16px 24px', borderTop: '1px solid #e5e7eb',
          flexShrink: 0, textAlign: 'right',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px', background: '#5B21B6', color: '#fff',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontWeight: 600, fontSize: 14,
            }}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{
        fontSize: 14, fontWeight: 700, color: '#1a1a2e',
        marginBottom: 10, paddingBottom: 6,
        borderBottom: '1px solid #e5e7eb',
      }}>{title}</h3>
      {children}
    </div>
  );
}
