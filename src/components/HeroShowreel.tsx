import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { AUDIENCE_PRESETS, PROFILE, PROJECTS } from '../data/portfolio';
import type { AudienceMode, ProjectItem } from '../types';

interface HeroShowreelProps {
  audience: AudienceMode;
  onSelectAudience: (mode: AudienceMode) => void;
  onJumpToEdtech: () => void;
  onOpenProject: (project: ProjectItem) => void;
}

const REEL_PROJECTS = PROJECTS.filter((project) => project.featuredInReel);

export function HeroShowreel({
  audience,
  onSelectAudience,
  onJumpToEdtech,
  onOpenProject,
}: HeroShowreelProps) {
  const preset = AUDIENCE_PRESETS.find((item) => item.id === audience) ?? AUDIENCE_PRESETS[0];
  const [activeReelId, setActiveReelId] = useState(REEL_PROJECTS[0]?.id);
  const [playingSource, setPlayingSource] = useState<string | null>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const activeProject = REEL_PROJECTS.find((project) => project.id === activeReelId) ?? REEL_PROJECTS[0];
  const secondaryIsExternal = preset.secondaryCtaHref.startsWith('http');

  useEffect(() => {
    if (playingSource) {
      playerRef.current?.focus({ preventScroll: true });
    }
  }, [playingSource]);

  const handleSelectReel = (id: string) => {
    setActiveReelId(id);
    setPlayingSource(null);
  };

  return (
    <section id="top" className="divider border-b">
      <div className="page-width page-section grid items-start gap-9 lg:grid-cols-2 lg:gap-12">
        <div>
          <h1 className="max-w-xl text-4xl leading-[1.08] font-bold sm:text-5xl">
            {preset.headline}
          </h1>
          <p className="supporting-text mt-4 max-w-xl text-base leading-relaxed">{preset.subcopy}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {preset.primaryCtaAction === 'estimate' && (
              <a href="#estimate" className="button button-primary">{preset.primaryCtaLabel}</a>
            )}
            {preset.primaryCtaAction === 'edtech' && (
              <button type="button" onClick={onJumpToEdtech} className="button button-primary">
                {preset.primaryCtaLabel}
              </button>
            )}
            {preset.primaryCtaAction === 'resume' && (
              <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">
                {preset.primaryCtaLabel}
              </a>
            )}
            <a
              href={preset.secondaryCtaHref}
              target={secondaryIsExternal ? '_blank' : undefined}
              rel={secondaryIsExternal ? 'noopener noreferrer' : undefined}
              className="text-link"
            >
              {preset.secondaryCtaLabel}
            </a>
          </div>

          <ul className="supporting-text mt-5 list-disc space-y-1 pl-5 text-sm">
            {preset.highlightPoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <p className="supporting-text mt-4 text-sm">Available for freelance and contract work in Malaysia ({PROFILE.timezone}).</p>

          <div className="divider mt-5 border-t pt-4">
            <p id="audience-label" className="mb-2 text-sm font-semibold">Tailor this portfolio</p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="audience-label">
              {AUDIENCE_PRESETS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === audience}
                  onClick={() => onSelectAudience(item.id)}
                  className="choice"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeProject && (
          <section aria-labelledby="demo-reel-title" className="min-w-0">
            <h2 id="demo-reel-title" className="mb-3 text-lg font-bold">Project demos</h2>
            <div className="media-stage relative aspect-video">
              {playingSource ? (
                <video
                  key={playingSource}
                  ref={playerRef}
                  src={playingSource}
                  poster={activeProject.posterUrl}
                  aria-label={`${activeProject.title} video demo`}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full rounded-[inherit] object-contain"
                />
              ) : (
                <>
                  <img src={activeProject.posterUrl} alt="" className="h-full w-full rounded-[inherit] object-cover" />
                  {activeProject.videoUrl && (
                    <button
                      type="button"
                      aria-label={`Play demo for ${activeProject.title}`}
                      onClick={() => setPlayingSource(activeProject.videoUrl ?? null)}
                      className="button button-primary absolute bottom-3 left-3"
                    >
                      <Play size={16} aria-hidden="true" /> Play demo
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="divider grid gap-1 border-b py-3">
              <h3 className="text-base font-bold">{activeProject.title}</h3>
              <p className="supporting-text text-sm leading-relaxed">{activeProject.tagline}</p>
              <div className="flex flex-wrap gap-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setPlayingSource(null);
                    onOpenProject(activeProject);
                  }}
                  className="text-link"
                >
                  View case study
                </button>
                {activeProject.loopVideoUrl && (
                  <button type="button" className="text-link" onClick={() => setPlayingSource(activeProject.loopVideoUrl ?? null)}>
                    Play short teaser
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Select demo project">
              {REEL_PROJECTS.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className="choice"
                  aria-pressed={project.id === activeProject.id}
                  onClick={() => handleSelectReel(project.id)}
                >
                  {project.reelLabel ?? project.title}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
