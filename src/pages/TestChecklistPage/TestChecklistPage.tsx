import { useState, useMemo, useCallback } from 'react';
import { Button } from '../../components/Button/Button';
import { getTestChecklist, saveTestChecklist, resetTestChecklist, type TestChecklistItem } from '../../utils/storage';
import './TestChecklistPage.css';

export function TestChecklistPage() {
  const [checklist, setChecklist] = useState<TestChecklistItem[]>(getTestChecklist());
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  const passedCount = useMemo(() => checklist.filter(item => item.checked).length, [checklist]);
  const totalCount = checklist.length;
  const allPassed = passedCount === totalCount;

  const handleToggle = useCallback((id: string) => {
    setChecklist(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      saveTestChecklist(updated);
      return updated;
    });
  }, []);

  const handleReset = useCallback(() => {
    resetTestChecklist();
    setChecklist(getTestChecklist());
  }, []);

  return (
    <div className="test-checklist-page">
      <h1 className="test-checklist-page__title">Built-In Test Checklist</h1>

      {/* Summary */}
      <div className={`test-checklist-page__summary ${allPassed ? 'test-checklist-page__summary--passed' : ''}`}>
        <div className="test-checklist-page__count">
          Tests Passed: {passedCount} / {totalCount}
        </div>
        {!allPassed && (
          <div className="test-checklist-page__warning">
            Resolve all issues before shipping.
          </div>
        )}
        {allPassed && (
          <div className="test-checklist-page__success">
            All tests passed! Ready to ship.
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="test-checklist-page__list">
        {checklist.map((item) => (
          <div key={item.id} className="test-checklist-page__item">
            <label className="test-checklist-page__checkbox-label">
              <input
                type="checkbox"
                className="test-checklist-page__checkbox"
                checked={item.checked}
                onChange={() => handleToggle(item.id)}
              />
              <span className={`test-checklist-page__checkmark ${item.checked ? 'test-checklist-page__checkmark--checked' : ''}`}>
                {item.checked && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className={`test-checklist-page__label ${item.checked ? 'test-checklist-page__label--checked' : ''}`}>
                {item.label}
              </span>
            </label>
            
            <div className="test-checklist-page__tooltip-wrapper">
              <button
                className="test-checklist-page__tooltip-btn"
                onMouseEnter={() => setTooltipVisible(item.id)}
                onMouseLeave={() => setTooltipVisible(null)}
                onClick={() => setTooltipVisible(tooltipVisible === item.id ? null : item.id)}
              >
                How to test
              </button>
              {tooltipVisible === item.id && (
                <div className="test-checklist-page__tooltip">
                  {item.tooltip}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="test-checklist-page__actions">
        <Button variant="secondary" onClick={handleReset}>
          Reset Test Status
        </Button>
      </div>
    </div>
  );
}
