/**
 * TopBar – ciemny pasek nagłówkowy konfiguratora.
 * Spójny z headerem strony głównej twistedpixel.pl.
 */
export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <a
          className="topbar-logo"
          href="https://twistedpixel.pl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/logo-twistedpixel.png"
            alt="TwistedPixel"
            className="topbar-logo-img"
          />
        </a>
        <div className="topbar-label">
          Konfigurator inwestycji
        </div>
      </div>
    </div>
  );
}
