/**
 * NavigationButtons – przyciski Wstecz / Dalej widoczne pod każdym krokiem.
 */
import { ArrowRightIcon } from './Icons.jsx';

/**
 * @param {number}   currentStep  - aktualny krok
 * @param {number}   totalSteps   - łączna liczba kroków
 * @param {boolean}  canGoNext    - czy przycisk "Dalej" jest aktywny
 * @param {Function} onBack       - obsługa kliknięcia Wstecz
 * @param {Function} onNext       - obsługa kliknięcia Dalej
 * @param {string}   [nextLabel]  - własna etykieta przycisku Dalej
 */
export default function NavigationButtons({
  currentStep,
  totalSteps,
  canGoNext,
  onBack,
  onNext,
  nextLabel,
}) {
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="step-nav">
      {currentStep > 2 && (
        <button className="btn btn-back" onClick={onBack} type="button">
          ← Wstecz
        </button>
      )}
      {isLast ? (
        <button
          className="btn btn-next"
          onClick={onNext}
          disabled={!canGoNext}
          type="button"
          style={{ marginLeft: currentStep <= 2 ? 'auto' : undefined }}
        >
          {nextLabel ?? 'Przejdź do płatności'}
        </button>
      ) : (
        <button
          className="btn btn-next btn-next--arrow"
          onClick={onNext}
          disabled={!canGoNext}
          type="button"
          aria-label="Dalej"
          style={{ marginLeft: currentStep <= 2 ? 'auto' : undefined }}
        >
          <ArrowRightIcon size={24} color="#fff" />
        </button>
      )}
    </div>
  );
}
