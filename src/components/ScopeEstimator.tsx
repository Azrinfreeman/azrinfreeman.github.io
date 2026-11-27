import { useState } from 'react';
import { ESTIMATOR_OPTIONS, PROFILE } from '../data/portfolio';
import type { Currency, DesignReadiness, EstimatorProjectType, EstimatorTier } from '../types';

interface ScopeEstimatorProps {
  selectedType: EstimatorProjectType;
  onChangeType: (type: EstimatorProjectType) => void;
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
}

const TIER_LABELS: { id: EstimatorTier; label: string }[] = [
  { id: 'quick', label: 'Quick Fix / Add-on' },
  { id: 'mvp', label: 'Prototype / MVP' },
  { id: 'full', label: 'Full Build' },
];

export function ScopeEstimator({
  selectedType,
  onChangeType,
  currency,
  onChangeCurrency,
}: ScopeEstimatorProps) {
  const [tier, setTier] = useState<EstimatorTier>('mvp');
  const [designReadiness, setDesignReadiness] = useState<DesignReadiness>('ready-specs');
  const [customNote, setCustomNote] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const option = ESTIMATOR_OPTIONS.find((item) => item.id === selectedType) ?? ESTIMATOR_OPTIONS[0];
  const tierData = option.tiers[tier];

  const priceRange =
    currency === 'RM'
      ? `RM ${tierData.rmMin.toLocaleString()} – RM ${tierData.rmMax.toLocaleString()}`
      : `$${tierData.usdMin.toLocaleString()} – $${tierData.usdMax.toLocaleString()}`;

  const tierTitle = TIER_LABELS.find((t) => t.id === tier)?.label ?? 'Prototype / MVP';
  const designLabel =
    designReadiness === 'ready-specs'
      ? 'I already have designs / clear specs'
      : 'Functional UI / prototype template needed';

  const briefText = [
    `Hi Azrin, I used your portfolio estimator and want to discuss a project:`,
    `- Project type: ${option.label}`,
    `- Scope tier: ${tierTitle}`,
    `- Design / specs: ${designLabel}`,
    `- Ballpark shown: ${priceRange} (${tierData.timeline})`,
    customNote.trim() ? `- Details: ${customNote.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappHref = `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(briefText)}`;
  const emailHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${option.shortLabel} (${tierTitle})`
  )}&body=${encodeURIComponent(briefText)}`;

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopyStatus('Brief copied.');
      window.setTimeout(() => setCopyStatus(''), 3000);
    } catch {
      setCopyStatus('Could not copy the brief. Open the brief preview to copy it manually.');
    }
  };


  return (
    <section id="estimate" tabIndex={-1} className="page-width page-section">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="section-title">Project estimator</h2>
          <p className="supporting-text mt-2 max-w-xl">
            Choose a scope to see a price range and timeline. Add a note to include it in your project brief.
          </p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Estimator currency">
          <button type="button" className="choice" aria-pressed={currency === 'RM'} onClick={() => onChangeCurrency('RM')}>RM</button>
          <button type="button" className="choice" aria-pressed={currency === 'USD'} onClick={() => onChangeCurrency('USD')}>USD</button>
        </div>
      </div>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 space-y-5">
          <div>
            <label htmlFor="estimator-type" className="font-semibold">Project type</label>
            <select
              id="estimator-type"
              value={selectedType}
              onChange={(event) => {
                const selectedOption = ESTIMATOR_OPTIONS.find((item) => item.id === event.target.value);
                if (selectedOption) {
                  onChangeType(selectedOption.id);
                }
              }}
              aria-describedby="estimator-type-description"
              className="estimator-input mt-2 w-full"
            >
              {ESTIMATOR_OPTIONS.map((item) => (
                <option key={item.id} value={item.id}>{item.shortLabel}</option>
              ))}
            </select>
            <p id="estimator-type-description" className="supporting-text mt-2 text-sm">{option.description}</p>
          </div>

          <fieldset>
            <legend className="font-semibold">Scope</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {TIER_LABELS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === tier}
                  onClick={() => setTier(item.id)}
                  className="choice"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-semibold">Designs and requirements</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className="choice" aria-pressed={designReadiness === 'ready-specs'} onClick={() => setDesignReadiness('ready-specs')}>
                I have designs or specs
              </button>
              <button type="button" className="choice" aria-pressed={designReadiness === 'need-prototype'} onClick={() => setDesignReadiness('need-prototype')}>
                I need a functional prototype
              </button>
            </div>
            {designReadiness === 'need-prototype' && (
              <p className="supporting-text mt-2 text-sm">
                A component-based interface and interaction flow typically add 1–3 days. Custom illustration, 3D assets and brand design are outside this scope.
              </p>
            )}
          </fieldset>

          <div>
            <label htmlFor="estimator-note" className="font-semibold">Brief note <span className="supporting-text font-normal">(optional)</span></label>
            <textarea
              id="estimator-note"
              rows={3}
              value={customNote}
              onChange={(event) => setCustomNote(event.target.value)}
              className="estimator-input mt-2 w-full"
            />
          </div>
        </div>

        <section aria-labelledby="estimate-summary" className="panel min-w-0 p-4 sm:p-6">
          <h3 id="estimate-summary" className="text-xl font-bold">Project estimate</h3>
          <dl className="mt-4 grid gap-2" aria-live="polite" aria-atomic="true">
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <dt className="supporting-text">Scope</dt>
              <dd className="font-semibold">{tierTitle}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <dt className="supporting-text">Timeline</dt>
              <dd className="font-semibold">{tierData.timeline}</dd>
            </div>
            <div className="divider mt-2 border-t pt-3">
              <dt className="supporting-text text-sm">Estimated range</dt>
              <dd className="quote-amount mt-1 text-2xl leading-tight font-bold sm:text-3xl" data-testid="estimator-price">{priceRange}</dd>
            </div>
          </dl>
          <p className="supporting-text mt-2 text-sm">I confirm a fixed quote after reviewing your requirements.</p>

          <div className="divider mt-4 border-t pt-4">
            <h4 className="font-semibold">Typical deliverable</h4>
            <p className="supporting-text mt-1 text-sm leading-relaxed">{tierData.deliverableHint}</p>
          </div>

          <details className="divider mt-4 border-t">
            <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">Preview your brief</summary>
            <p className="supporting-text whitespace-pre-wrap [overflow-wrap:anywhere] text-sm leading-relaxed">{briefText}</p>
          </details>

          <div className="mt-4 flex flex-wrap gap-2">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="button button-primary">Send via WhatsApp</a>
            <a href={emailHref} className="button">Send via email</a>
            <button type="button" onClick={handleCopyBrief} className="button">Copy brief</button>
          </div>
          {copyStatus && <p className="supporting-text mt-2 text-sm" role="status">{copyStatus}</p>}
        </section>
      </div>
    </section>
  );
}
