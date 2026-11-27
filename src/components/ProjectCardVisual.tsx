import type { ProjectItem } from '../types';

interface ProjectCardVisualProps {
  project: ProjectItem;
}

export function ProjectCardVisual({ project }: ProjectCardVisualProps) {
  if (!project.posterUrl) {
    return null;
  }

  const isAppIcon = project.visualVariant === 'betternotes';
  const fit = project.id === 'monitor-remote' ? 'object-contain' : 'object-cover';

  if (isAppIcon) {
    return (
      <div className="grid h-full place-items-center bg-[var(--bg-elevated)]">
        <img
          src={project.posterUrl}
          alt="BetterNotes app icon"
          loading="lazy"
          className="size-20 rounded-xl"
        />
      </div>
    );
  }

  return (
    <img
      src={project.posterUrl}
      alt=""
      loading="lazy"
      className={`h-full w-full ${fit}`}
    />
  );
}
