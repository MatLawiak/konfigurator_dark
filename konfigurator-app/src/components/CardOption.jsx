/**
 * CardOption – reużywalny komponent karty do wyboru opcji (radio-style).
 * Wyświetla ikonę, tytuł, opis i wizualny wskaźnik zaznaczenia.
 */
import { DiamondIcon, CheckIcon } from './Icons.jsx';

/**
 * @param {string}   value      - wartość opcji
 * @param {string}   label      - tekst główny
 * @param {string}   [desc]     - opis pomocniczy (opcjonalny)
 * @param {string}   [icon]     - ignorowane (zastąpione przez DiamondIcon)
 * @param {string}   [selected] - aktualnie wybrana wartość
 * @param {Function} onSelect   - callback (value) => void
 */
export default function CardOption({ value, label, desc, selected, onSelect }) {
  const isSelected = selected === value;

  return (
    <button
      className={`card-option${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(value)}
      type="button"
      aria-pressed={isSelected}
    >
      <span className="card-option-icon" aria-hidden="true">
        <DiamondIcon size={18} color={isSelected ? '#FF6B00' : '#9CA3AF'} />
      </span>
      <span className="card-option-text">
        <span className="card-option-title">{label}</span>
        {desc && <span className="card-option-desc">{desc}</span>}
      </span>
      <span className="card-option-check" aria-hidden="true">
        {isSelected ? <CheckIcon size={14} color="#FF6B00" /> : ''}
      </span>
    </button>
  );
}
