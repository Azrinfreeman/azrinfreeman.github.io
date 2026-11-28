import { COMMERCIAL_HIGHLIGHTS, PROJECT_CATEGORIES, PROJECTS } from '../data/portfolio';
import type { EstimatorProjectType, ProjectCategory, ProjectItem } from '../types';
import { ProjectCardVisual } from './ProjectCardVisual';

interface ProjectShowcaseProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onOpenProject: (project: ProjectItem) => void;
  onEstimateSimilar: (estimateType: EstimatorProjectType) => void;
}

export function ProjectShowcase({
  activeCategory,
  onSelectCategory,
  onOpenProject,
  onEstimateSimilar,
}: ProjectShowcaseProps) {
  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" tabIndex={-1} className="page-width page-section">
      <h2 className="section-title">Selected work</h2>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {PROJECT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className="choice"
            aria-pressed={category.id === activeCategory}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <p className="supporting-text mt-3 text-sm" role="status">
        {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
      </p>

      <div className="mt-5 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article key={project.id} className="panel project-card min-w-0 p-3 sm:p-4">
            {project.posterUrl && (
              <button
                type="button"
                onClick={() => onOpenProject(project)}
                className="media-stage block aspect-video w-full overflow-hidden"
                aria-label={`Open details for ${project.title}`}
              >
                <ProjectCardVisual project={project} />
              </button>
            )}
            <div className={project.posterUrl ? 'px-1 pt-3' : 'px-1'}>
              <p className="supporting-text text-sm">{project.categoryLabel}</p>
              <h3 className="display-title mt-1">{project.title}</h3>
              <p className="supporting-text mt-2 text-sm leading-relaxed">{project.tagline}</p>
              {project.disclosureNote && (
                <p className="supporting-text mt-2 text-sm">{project.disclosureNote}</p>
              )}
              {project.aiDirectedNote && (
                <p className="supporting-text mt-2 text-sm">AI-directed, personally reviewed and tested.</p>
              )}
              {project.stack.length > 0 && (
                <p className="supporting-text mt-2 text-sm">{project.stack.slice(0, 4).join(', ')}</p>
              )}
            </div>

            <div className="divider mt-3 flex flex-wrap items-center gap-x-4 border-t border-dashed px-1 pt-1">
              <button
                type="button"
                onClick={() => onOpenProject(project)}
                aria-label={`${project.videoUrl ? 'Demo and details' : 'Case study'} for ${project.title}`}
                className="text-link"
              >
                {project.videoUrl ? 'Demo and details' : 'Case study'}
              </button>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`${project.title} on GitHub`}>
                GitHub
              </a>
              {project.releaseUrl && (
                <a href={project.releaseUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  Release {project.releaseTag}
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  {project.liveLabel ?? 'Project page'}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <section aria-labelledby="commercial-title" className="mt-12">
        <h3 id="commercial-title" className="display-title">Commercial work</h3>
        <p className="supporting-text mt-2 text-sm">Closed-source client and employer projects.</p>
        <div className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
          {COMMERCIAL_HIGHLIGHTS.map((item) => (
            <article key={item.id} className="divider border-t pt-4">
              <h4 className="text-base font-bold">{item.title}</h4>
              <p className="supporting-text mt-1 text-sm">{item.roleMeta}</p>
              <p className="supporting-text mt-2 text-sm leading-relaxed">{item.summary}</p>
              <p className="supporting-text mt-2 text-sm">{item.stack.join(', ')}</p>
              <button type="button" onClick={() => onEstimateSimilar(item.estimateType)} className="text-link">
                Estimate a similar build
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
