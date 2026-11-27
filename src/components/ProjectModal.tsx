import { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Film,
  Github,
  Images,
  Info,
  Tag,
  X,
} from 'lucide-react';
import type { EstimatorProjectType, ProjectItem } from '../types';
import { ProjectCardVisual } from './ProjectCardVisual';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onEstimateSimilar: (estimateType: EstimatorProjectType) => void;
}

export function ProjectModal({ project, onClose, onEstimateSimilar }: ProjectModalProps) {
  const [mediaTab, setMediaTab] = useState<'video' | 'gallery'>('video');
  const [activeShotIndex, setActiveShotIndex] = useState(0);

  useEffect(() => {
    if (!project) return;
    setMediaTab(project.videoUrl ? 'video' : 'gallery');
    setActiveShotIndex(0);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasVideo = Boolean(project.videoUrl);
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const activeShot = project.gallery?.[activeShotIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="surface-card relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-5 py-4 backdrop-blur-md sm:px-6"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--bg-surface) 92%, transparent)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
              {project.categoryLabel}
            </span>
            <h2 id="project-modal-title" className="mt-0.5 font-display text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors hover:opacity-85"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {/* Media Stage */}
          {hasVideo && hasGallery && (
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setMediaTab('video')}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold"
                style={
                  mediaTab === 'video'
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
                <Film className="h-3.5 w-3.5" />
                Video Demo
              </button>
              <button
                type="button"
                onClick={() => setMediaTab('gallery')}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold"
                style={
                  mediaTab === 'gallery'
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
                <Images className="h-3.5 w-3.5" />
                Screenshots ({project.gallery?.length})
              </button>
            </div>
          )}

          <div className="overflow-hidden rounded-xl border bg-slate-950" style={{ borderColor: 'var(--border-subtle)' }}>
            {hasVideo && mediaTab === 'video' ? (
              <video
                key={project.id}
                src={project.videoUrl}
                poster={project.posterUrl}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full object-contain"
              />
            ) : hasGallery && activeShot ? (
              <div>
                <div className="aspect-video w-full bg-slate-950">
                  <img
                    src={activeShot.src}
                    alt={activeShot.caption}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 px-3 py-2 text-xs text-slate-300">
                  <span>{activeShot.caption}</span>
                  <div className="flex gap-1.5">
                    {project.gallery?.map((shot, idx) => (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() => setActiveShotIndex(idx)}
                        className={`rounded px-2 py-0.5 font-mono text-[11px] ${
                          idx === activeShotIndex ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full">
                <ProjectCardVisual project={project} />
              </div>
            )}
          </div>

          {/* Problem & Solution */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="elevated-card rounded-xl p-4">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                The Problem
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {project.problem}
              </p>
            </div>

            <div className="elevated-card rounded-xl p-4">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
                What I Built
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-5">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Key Engineering Highlights
            </h3>
            <ul className="mt-2.5 space-y-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent-emerald)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border px-2.5 py-1 font-mono text-xs"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Honest Disclosure / AI-Directed Note */}
          {(project.disclosureNote || project.aiDirectedNote) && (
            <div
              className="mt-5 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs leading-relaxed"
              style={{
                backgroundColor: 'var(--accent-amber-soft)',
                borderColor: 'color-mix(in srgb, var(--accent-amber) 35%, transparent)',
                color: 'var(--text-primary)',
              }}
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent-amber)' }} />
              <div className="space-y-1">
                {project.disclosureNote && <p>{project.disclosureNote}</p>}
                {project.aiDirectedNote && <p>{project.aiDirectedNote}</p>}
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div
            className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold sm:text-sm"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                <Github className="h-4 w-4" />
                View Source on GitHub
              </a>

              {project.releaseUrl && (
                <a
                  href={project.releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Tag className="h-4 w-4" />
                  Release {project.releaseTag}
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                  {project.liveLabel ?? 'Project Page'}
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => onEstimateSimilar(project.similarEstimateType)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--accent-emerald)' }}
            >
              Build Something Similar
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
