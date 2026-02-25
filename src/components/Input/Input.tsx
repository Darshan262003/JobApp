import type { InputProps } from '../../types';
import './Input.css';

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = 'text'
}: InputProps) {
  return (
    <div className="input-wrapper">
      {label && <label className="input-wrapper__label">{label}</label>}
      <input
        type={type}
        className={`input-wrapper__field ${error ? 'input-wrapper__field--error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {error && <span className="input-wrapper__error">{error}</span>}
    </div>
  );
}
