import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  Maximize2,
  Play,
  Sparkles,
} from 'lucide-react';
import { AUDIENCE_PRESETS, PROOF_METRICS, PROJECTS } from '../data/portfolio';
import type { AudienceMode, ProjectItem } from '../types';

interface HeroShowreelProps {
  audience: AudienceMode;
  onSelectAudience: (mode: AudienceMode) => void;
  onJumpToEdtech: () => void;
  onOpenProject: (project: ProjectItem) => void;
}

const REEL_PROJECTS = PROJECTS.filter((p) => p.featuredInReel);

export function HeroShowreel({
  audience,
  onSelectAudience,
  onJumpToEdtech,
  onOpenProject,
}: HeroShowreelProps) {
  const preset = AUDIENCE_PRESETS.find((p) => p.id === audience) ?? AUDIENCE_PRESETS[0];
  const [activeReelId, setActiveReelId] = useState<string>(REEL_PROJECTS[0]?.id ?? '');
  const [playingInlineId, setPlayingInlineId] = useState<string | null>(null);

  const activeProject = REEL_PROJECTS.find((p) => p.id === activeReelId) ?? REEL_PROJECTS[0];
  const isPlayingFull = playingInlineId === activeProject.id && Boolean(activeProject.videoUrl);

  const handleSelectReel = (id: string) => {
    setActiveReelId(id);
    setPlayingInlineId(null);
  };

  return (
    <section id="top" className="hero-grid-bg relative overflow-hidden border-b" style={{ borderColor: 'var(--border-subtle)' }}>
      <div
        className="pointer-events-none absolute -top-28 right-0 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-emerald), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Availability badge */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="pulse-dot h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent-emerald)' }} />
            Available for Freelance &amp; Contract Projects · Malaysia (GMT+8)
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            {preset.eyebrow}
          </span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left column: Audience switcher + Value prop */}
          <div className="lg:col-span-6">
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Who is viewing? Tailor this view:
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Tailor portfolio by visitor role">
                {AUDIENCE_PRESETS.map((item) => {
                  const active = item.id === audience;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onSelectAudience(item.id)}
                      className="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all sm:text-sm"
                      style={
                        active
                          ? {
                              backgroundColor: 'var(--accent-emerald-soft)',
                              borderColor: 'var(--accent-emerald)',
                              color: 'var(--accent-emerald)',
                            }
                          : {
                              backgroundColor: 'var(--bg-surface)',
                              borderColor: 'var(--border-subtle)',
                              color: 'var(--text-secondary)',
                            }
                      }
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <h1 className="font-display text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.65rem]" style={{ color: 'var(--text-primary)' }}>
              {preset.headline}
            </h1>

            <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
              {preset.subcopy}
            </p>

            <ul className="mt-5 space-y-2">
              {preset.highlightPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent-emerald)' }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Dynamic CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {preset.primaryCtaAction === 'estimate' && (
                <a
                  href="#estimate"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--accent-emerald)' }}
                >
                  {preset.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}

              {preset.primaryCtaAction === 'edtech' && (
                <button
                  type="button"
                  onClick={onJumpToEdtech}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--accent-emerald)' }}
                >
                  {preset.primaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              {preset.primaryCtaAction === 'resume' && (
                <a
                  href="/Azrin-Amran-Resume.pdf"
                  download="Azrin-Amran-Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--accent-emerald)' }}
                >
                  <Download className="h-4 w-4" />
                  {preset.primaryCtaLabel}
                </a>
              )}

              <a
                href={preset.secondaryCtaHref}
                target={preset.secondaryCtaHref.startsWith('http') ? '_blank' : undefined}
                rel={preset.secondaryCtaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-primary)',
                }}
              >
                {preset.secondaryCtaLabel}
                {preset.secondaryCtaHref.startsWith('http') && <ExternalLink className="h-3.5 w-3.5" />}
              </a>
            </div>
          </div>

          {/* Right column: Interactive Demo Reel Console */}
          <div className="lg:col-span-6">
            <div className="surface-card overflow-hidden rounded-2xl shadow-xl">
              {/* Console Top Bar */}
              <div
                className="flex items-center justify-between border-b px-4 py-2.5"
                style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-elevated)' }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--accent-amber)' }} />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Interactive Demo Reel
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPlayingInlineId(null);
                    onOpenProject(activeProject);
                  }}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-xs font-medium transition-colors hover:opacity-85"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--accent-emerald)',
                  }}
                >
                  <Maximize2 className="h-3 w-3" />
                  Case Study
                </button>
              </div>

              {/* 16:9 Stage */}
              <div className="relative aspect-video w-full bg-slate-950">
                {isPlayingFull && activeProject.videoUrl ? (
                  <video
                    key={activeProject.id}
                    src={activeProject.videoUrl}
                    poster={activeProject.posterUrl}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : activeProject.loopVideoUrl ? (
                  <>
                    <video
                      key={`${activeProject.id}-loop`}
                      src={activeProject.loopVideoUrl}
                      poster={activeProject.posterUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                    <button
                      type="button"
                      onClick={() => setPlayingInlineId(activeProject.id)}
                      className="group absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Play Full Teaser
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src={activeProject.posterUrl}
                      alt={activeProject.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    {activeProject.videoUrl && (
                      <button
                        type="button"
                        aria-label={`Play ${activeProject.title} video demo`}
                        onClick={() => setPlayingInlineId(activeProject.id)}
                        className="group absolute inset-0 flex items-center justify-center"
                      >
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/95 text-white shadow-xl ring-4 ring-white/20 transition-transform group-hover:scale-110">
                          <Play className="ml-0.5 h-6 w-6 fill-current" />
                        </span>
                      </button>
                    )}
                  </>
                )}

                {!isPlayingFull && (
                  <div className="pointer-events-none absolute bottom-3 left-3 max-w-[54%] sm:max-w-[65%]">
                    <span className="inline-block rounded bg-black/75 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                      {activeProject.categoryLabel}
                    </span>
                    <p className="mt-1 truncate text-xs font-semibold text-white drop-shadow sm:text-sm">
                      {activeProject.title}
                    </p>
                  </div>
                )}
              </div>

              {/* Reel Selector Pills */}
              <div className="border-t p-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Select demo video">
                  {REEL_PROJECTS.map((item) => {
                    const isActive = item.id === activeProject.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => handleSelectReel(item.id)}
                        className="rounded-lg border px-2.5 py-1.5 font-mono text-xs font-medium transition-colors"
                        style={
                          isActive
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
                        {item.reelLabel ?? item.title}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2.5 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {activeProject.tagline}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setPlayingInlineId(null);
                      onOpenProject(activeProject);
                    }}
                    className="font-semibold underline underline-offset-2"
                    style={{ color: 'var(--accent-emerald)' }}
                  >
                    Open full breakdown →
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Proof Metric Tiles */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {PROOF_METRICS.map((metric) => (
            <div key={metric.value} className="surface-card rounded-xl px-4 py-3.5">
              <p className="font-display text-base font-bold sm:text-lg" style={{ color: 'var(--text-primary)' }}>
                {metric.value}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
