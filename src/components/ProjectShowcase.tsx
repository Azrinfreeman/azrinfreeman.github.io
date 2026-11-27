import { ExternalLink, Film, Github, Images, Tag } from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECTS } from '../data/portfolio';
import type { ProjectCategory, ProjectItem } from '../types';
import { ProjectCardVisual } from './ProjectCardVisual';

interface ProjectShowcaseProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  onOpenProject: (project: ProjectItem) => void;
}

export function ProjectShowcase({
  activeCategory,
  onSelectCategory,
  onOpenProject,
}: ProjectShowcaseProps) {
  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  const countFor = (cat: ProjectCategory) =>
    cat === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
            Selected Public Work
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
            Real Shipped Projects &amp; Video Demos
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            Every project below is public on GitHub. Click any card to watch its trailer, inspect screenshots, or estimate a similar build.
          </p>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {PROJECT_CATEGORIES.map((cat) => {
          const active = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectCategory(cat.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm"
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
              <span>{cat.label}</span>
              <span
                className="rounded-md px-1.5 py-0.5 font-mono text-[11px]"
                style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
              >
                {countFor(cat.id)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Responsive Project Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="surface-card group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <button
              type="button"
              onClick={() => onOpenProject(project)}
              className="relative aspect-video w-full overflow-hidden border-b text-left focus:outline-none"
              style={{ borderColor: 'var(--border-subtle)' }}
              aria-label={`Open details for ${project.title}`}
            >
              <ProjectCardVisual project={project} />

              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2.5">
                <span className="rounded-md bg-slate-950/80 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-200 backdrop-blur-sm">
                  {project.categoryLabel}
                </span>

                {(project.videoUrl || project.gallery) && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600/90 px-2 py-0.5 font-mono text-[11px] font-semibold text-white shadow">
                    {project.videoUrl ? <Film className="h-3 w-3" /> : <Images className="h-3 w-3" />}
                    {project.durationBadge ?? 'Demo'}
                  </span>
                )}
              </div>
            </button>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                {project.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.tagline}
              </p>

              {project.disclosureNote && (
                <p
                  className="mt-2.5 inline-block self-start rounded-md px-2 py-0.5 font-mono text-[11px]"
                  style={{
                    backgroundColor: 'var(--accent-amber-soft)',
                    color: 'var(--accent-amber)',
                  }}
                >
                  {project.disclosureNote.split('(')[0].trim()}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border px-2 py-0.5 font-mono text-[11px]"
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div
                className="mt-auto flex items-center justify-between gap-2 border-t pt-4 text-xs font-semibold"
                style={{ borderColor: 'var(--border-subtle)', marginTop: '1.25rem' }}
              >
                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  className="inline-flex items-center gap-1 transition-opacity hover:opacity-80"
                  style={{ color: 'var(--accent-emerald)' }}
                >
                  {project.videoUrl ? 'Watch Demo & Details' : 'View Breakdown'}
                </button>

                <div className="flex items-center gap-2">
                  {project.releaseUrl && (
                    <a
                      href={project.releaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors hover:opacity-85"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                      title={`Release ${project.releaseTag}`}
                    >
                      <Tag className="h-3 w-3" />
                      {project.releaseTag}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} project page`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors hover:opacity-85"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors hover:opacity-85"
                    style={{
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
