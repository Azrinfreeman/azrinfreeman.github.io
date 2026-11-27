import { useState } from 'react';
import { Calculator, Check, Copy, Mail, MessageSquare } from 'lucide-react';
import { ESTIMATOR_OPTIONS, PROFILE } from '../data/portfolio';
import type { Currency, DesignReadiness, EstimatorProjectType, EstimatorTier } from '../types';

interface ScopeEstimatorProps {
  selectedType: EstimatorProjectType;
  onChangeType: (type: EstimatorProjectType) => void;
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
}

const TIER_LABELS: { id: EstimatorTier; label: string; hint: string }[] = [
  { id: 'quick', label: 'Quick Fix / Add-on', hint: '1–7 days' },
  { id: 'mvp', label: 'Prototype / MVP', hint: '1–3 weeks' },
  { id: 'full', label: 'Full Build', hint: '3–7 weeks' },
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
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="estimate" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
            Interactive Scope &amp; Estimate
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
            Scope Your Project in 30 Seconds
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            Pick what you need to see a realistic timeline and ballpark range, then send the pre-filled brief straight to WhatsApp or email.
          </p>
        </div>

        <div
          className="inline-flex self-start rounded-xl border p-1"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
          role="group"
          aria-label="Estimator currency"
        >
          {(['RM', 'USD'] as Currency[]).map((curr) => {
            const active = currency === curr;
            return (
              <button
                key={curr}
                type="button"
                aria-pressed={active}
                onClick={() => onChangeCurrency(curr)}
                className="rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
                style={
                  active
                    ? { backgroundColor: 'var(--accent-emerald)', color: '#ffffff' }
                    : { color: 'var(--text-secondary)' }
                }
              >
                {curr === 'RM' ? 'RM (Malaysia)' : 'USD (Global)'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Controls Column */}
        <div className="surface-card space-y-6 rounded-2xl p-5 sm:p-6 lg:col-span-7">
          <div>
            <label className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              1. What do you need built or fixed?
            </label>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {ESTIMATOR_OPTIONS.map((item) => {
                const active = item.id === selectedType;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChangeType(item.id)}
                    className="rounded-xl border p-3 text-left transition-all"
                    style={
                      active
                        ? {
                            backgroundColor: 'var(--accent-emerald-soft)',
                            borderColor: 'var(--accent-emerald)',
                          }
                        : {
                            backgroundColor: 'var(--bg-elevated)',
                            borderColor: 'var(--border-subtle)',
                          }
                    }
                  >
                    <p
                      className="text-sm font-semibold"
                      style={{ color: active ? 'var(--accent-emerald)' : 'var(--text-primary)' }}
                    >
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-snug" style={{ color: 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              2. How big is the scope?
            </label>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
              {TIER_LABELS.map((item) => {
                const active = tier === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTier(item.id)}
                    className="rounded-xl border px-3 py-2.5 text-left transition-all"
                    style={
                      active
                        ? {
                            backgroundColor: 'var(--accent-emerald-soft)',
                            borderColor: 'var(--accent-emerald)',
                          }
                        : {
                            backgroundColor: 'var(--bg-elevated)',
                            borderColor: 'var(--border-subtle)',
                          }
                    }
                  >
                    <p
                      className="text-xs font-bold sm:text-sm"
                      style={{ color: active ? 'var(--accent-emerald)' : 'var(--text-primary)' }}
                    >
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {item.hint}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              3. Designs &amp; requirements
            </label>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                aria-pressed={designReadiness === 'ready-specs'}
                onClick={() => setDesignReadiness('ready-specs')}
                className="rounded-xl border px-3 py-2.5 text-left text-xs font-semibold sm:text-sm"
                style={
                  designReadiness === 'ready-specs'
                    ? {
                        backgroundColor: 'var(--accent-emerald-soft)',
                        borderColor: 'var(--accent-emerald)',
                        color: 'var(--accent-emerald)',
                      }
                    : {
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }
                }
              >
                I have designs / clear specs
              </button>

              <button
                type="button"
                aria-pressed={designReadiness === 'need-prototype'}
                onClick={() => setDesignReadiness('need-prototype')}
                className="rounded-xl border px-3 py-2.5 text-left text-xs font-semibold sm:text-sm"
                style={
                  designReadiness === 'need-prototype'
                    ? {
                        backgroundColor: 'var(--accent-emerald-soft)',
                        borderColor: 'var(--accent-emerald)',
                        color: 'var(--accent-emerald)',
                      }
                    : {
                        backgroundColor: 'var(--bg-elevated)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }
                }
              >
                Clean functional UI / prototype
              </button>
            </div>
            {designReadiness === 'need-prototype' && (
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Note: I specialize in engineering, backend integration, and functional prototypes using clean component UI — not custom 2D/3D illustration or brand design.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="estimator-note" className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Optional note (included in your brief)
            </label>
            <input
              id="estimator-note"
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Stripe webhook bug on Laravel, or Unity quiz app for PhD study"
              className="mt-2 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-emerald-500"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        {/* Result Output Column */}
        <div className="surface-card flex flex-col justify-between rounded-2xl p-5 sm:p-6 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
                <Calculator className="h-4 w-4" />
                Estimated Range
              </span>
              <span className="rounded-md px-2 py-0.5 font-mono text-xs" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                {tierData.timeline}
              </span>
            </div>

            <p className="mt-3 font-display text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text-primary)' }} data-testid="estimator-price">
              {priceRange}
            </p>

            <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              Ballpark guide only — I confirm an exact fixed quote after a quick scope review.
            </p>

            <div className="elevated-card mt-5 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Typical Deliverable
                </p>
                <span
                  className="rounded px-2 py-0.5 font-mono text-[11px]"
                  style={{
                    backgroundColor: 'var(--accent-emerald-soft)',
                    color: 'var(--accent-emerald)',
                  }}
                >
                  {designReadiness === 'ready-specs' ? 'Specs / Designs Ready' : 'Includes Functional Prototype UI'}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {tierData.deliverableHint}
              </p>
              {designReadiness === 'need-prototype' && (
                <p className="mt-2 border-t pt-2 font-mono text-[11px]" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  + Includes clean component UI layout &amp; interactive flow setup (typically +1–3 days).
                </p>
              )}
            </div>

            <div className="mt-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Generated Brief Preview
              </p>
              <pre
                className="mt-2 whitespace-pre-wrap rounded-xl border p-3 font-mono text-xs leading-relaxed"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {briefText}
              </pre>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--accent-emerald)' }}
            >
              <MessageSquare className="h-4 w-4" />
              Send This Brief on WhatsApp
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={emailHref}
                className="flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold sm:text-sm"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                <Mail className="h-4 w-4" />
                Send via Email
              </a>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold sm:text-sm"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: copied ? 'var(--accent-emerald)' : 'var(--text-primary)',
                }}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Brief Copied!' : 'Copy Brief'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
