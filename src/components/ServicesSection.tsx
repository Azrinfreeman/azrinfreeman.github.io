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
    <section id="services" className="divider page-section border-y bg-[var(--bg-surface)]">
      <div className="page-width">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="section-title">Services and starting rates</h2>
          <div className="flex gap-2" role="group" aria-label="Service rates currency">
            <button type="button" className="choice" aria-pressed={currency === 'RM'} onClick={() => onChangeCurrency('RM')}>RM</button>
            <button type="button" className="choice" aria-pressed={currency === 'USD'} onClick={() => onChangeCurrency('USD')}>USD</button>
          </div>
        </div>

        <ul className="mt-5">
          {SERVICES.map((service) => {
            const priceLabel = currency === 'RM'
              ? `From RM ${service.starterRm.toLocaleString()}`
              : `From $${service.starterUsd.toLocaleString()}`;

            return (
              <li key={service.id} className="divider grid gap-3 border-t py-5 sm:grid-cols-[2fr_1fr] sm:gap-8">
                <div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="supporting-text mt-1 max-w-xl text-sm leading-relaxed">{service.summary}</p>
                  <ul className="supporting-text mt-2 list-disc space-y-1 pl-5 text-sm">
                    {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div>
                  <p className="text-base font-bold tabular-nums">{priceLabel}</p>
                  <p className="supporting-text mt-1 text-sm">Typical turnaround: {service.turnaround}</p>
                  <button type="button" onClick={() => onEstimateService(service.estimateType)} className="text-link">
                    Estimate this service
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
