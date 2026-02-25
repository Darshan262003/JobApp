import type { ProofFooterProps } from '../../types';
import './ProofFooter.css';

export function ProofFooter({ items }: ProofFooterProps) {
  return (
    <footer className="proof-footer">
      <div className="proof-footer__content">
        <span className="proof-footer__title">Proof of Work</span>
        <ul className="proof-footer__list">
          {items.map((item, index) => (
            <li
              key={index}
              className={`proof-footer__item ${item.checked ? 'proof-footer__item--checked' : ''}`}
            >
              <span className="proof-footer__checkbox">
                {item.checked && '✓'}
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
