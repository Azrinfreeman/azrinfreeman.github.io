import { ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/portfolio';
import type { Currency, EstimatorProjectType } from '../types';

interface ServicesSectionProps {
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
  onEstimateService: (estimateType: EstimatorProjectType) => void;
}

export function ServicesSection({
  currency,
  onChangeCurrency,
  onEstimateService,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="border-y py-16"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 60%, var(--bg-canvas))',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
              Services &amp; Starter Rates
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
              What I Can Build &amp; Fix For You
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              Focused engineering work you can scope in minutes — from quick bug &amp; store-publishing fixes to full prototypes.
            </p>
          </div>

          <div
            className="inline-flex self-start rounded-xl border p-1"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            role="group"
            aria-label="Select display currency"
          >
            {(['RM', 'USD'] as Currency[]).map((curr) => {
              const active = currency === curr;
              return (
                <button
                  key={curr}
                  type="button"
                  onClick={() => onChangeCurrency(curr)}
                  className="rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
                  style={
                    active
                      ? { backgroundColor: 'var(--accent-emerald)', color: '#ffffff' }
                      : { color: 'var(--text-secondary)' }
                  }
                >
                  {curr === 'RM' ? 'RM (MYR)' : 'USD ($)'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => {
            const priceLabel =
              currency === 'RM'
                ? `From RM ${service.starterRm.toLocaleString()}`
                : `From $${service.starterUsd.toLocaleString()}`;

            return (
              <div key={service.id} className="surface-card flex flex-col rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                  </h3>
                  <span
                    className="rounded-lg px-2.5 py-1 font-mono text-xs font-semibold"
                    style={{
                      backgroundColor: 'var(--accent-emerald-soft)',
                      color: 'var(--accent-emerald)',
                    }}
                  >
                    {priceLabel}
                  </span>
                </div>

                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {service.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent-emerald)' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-auto flex items-center justify-between border-t pt-4 text-xs"
                  style={{ borderColor: 'var(--border-subtle)', marginTop: '1.5rem' }}
                >
                  <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                    Typical: {service.turnaround}
                  </span>
                  <button
                    type="button"
                    onClick={() => onEstimateService(service.estimateType)}
                    className="inline-flex items-center gap-1 font-semibold transition-opacity hover:opacity-80"
                    style={{ color: 'var(--accent-emerald)' }}
                  >
                    Estimate this
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
