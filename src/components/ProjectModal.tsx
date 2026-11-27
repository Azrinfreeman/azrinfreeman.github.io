import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { EstimatorProjectType, ProjectItem } from '../types';
import { LiveProjectDemo } from './LiveProjectDemo';
import { ProjectCardVisual } from './ProjectCardVisual';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
  onEstimateSimilar: (estimateType: EstimatorProjectType) => void;
}

export function ProjectModal({ project, onClose, onEstimateSimilar }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mediaTab, setMediaTab] = useState<'video' | 'gallery' | 'live'>(project.videoUrl ? 'video' : 'gallery');
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const hasVideo = Boolean(project.videoUrl);
  const hasGallery = Boolean(project.gallery?.length);
  const liveDemoUrl = project.embedType ? project.liveUrl : undefined;
  const showLive = Boolean(liveDemoUrl) && mediaTab === 'live';
  const showVideo = hasVideo && mediaTab === 'video';
  const displayedShot = mediaTab === 'gallery' ? project.gallery?.[activeShotIndex] : undefined;
  const showMediaChoices = (hasVideo && hasGallery) || Boolean(liveDemoUrl);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    closeRef.current?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="panel project-dialog fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-auto text-[var(--text-primary)]"
    >
      <div>
        <header className="divider sticky top-0 z-10 flex items-start justify-between gap-3 border-b bg-[var(--bg-surface)] px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="supporting-text text-sm">{project.categoryLabel}</p>
            <h2 id="project-modal-title" className="mt-1 text-xl leading-tight font-bold sm:text-2xl">
              {project.title}
            </h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details" className="button w-11 shrink-0">
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="p-4 sm:p-6">
          {showMediaChoices && (
            <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Project media">
              {hasVideo && <button type="button" className="choice" aria-pressed={mediaTab === 'video'} onClick={() => setMediaTab('video')}>Video</button>}
              {hasGallery && <button type="button" className="choice" aria-pressed={mediaTab === 'gallery'} onClick={() => setMediaTab('gallery')}>Screenshots</button>}
              {liveDemoUrl && <button type="button" className="choice" aria-pressed={showLive} onClick={() => setMediaTab('live')}>Live demo</button>}
            </div>
          )}

          {showLive && liveDemoUrl && (
            <LiveProjectDemo
              title={project.title}
              url={liveDemoUrl}
              desktopOnly={project.mobileOk === false || (project.mobileOk === undefined && project.embedType === 'unity')}
              onWatchVideo={hasVideo ? () => setMediaTab('video') : undefined}
            />
          )}
          {showVideo && (
            <video
              src={project.videoUrl}
              poster={project.posterUrl}
              aria-label={`${project.title} video demo`}
              controls
              playsInline
              preload="metadata"
              className="media-stage aspect-video w-full object-contain"
            />
          )}
          {displayedShot && (
            <figure>
              <img src={displayedShot.src} alt="" className="media-stage aspect-video w-full object-contain" />
              <figcaption className="supporting-text mt-2 text-sm">{displayedShot.caption}</figcaption>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a screenshot">
                {project.gallery?.map((shot, index) => (
                  <button
                    key={shot.src}
                    type="button"
                    onClick={() => setActiveShotIndex(index)}
                    aria-pressed={index === activeShotIndex}
                    aria-label={`Screenshot ${index + 1}: ${shot.caption}`}
                    className="choice w-11"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </figure>
          )}
          {!showLive && !showVideo && !displayedShot && project.posterUrl && (
            <div className="media-stage aspect-video overflow-hidden">
              <ProjectCardVisual project={project} />
            </div>
          )}

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <section>
              <h3 className="font-bold">The problem</h3>
              <p className="supporting-text mt-1 text-sm leading-relaxed">{project.problem}</p>
            </section>
            <section>
              <h3 className="font-bold">What I built</h3>
              <p className="supporting-text mt-1 text-sm leading-relaxed">{project.solution}</p>
            </section>
          </div>

          {project.highlights.length > 0 && (
            <section className="mt-5">
              <h3 className="font-bold">Engineering highlights</h3>
              <ul className="supporting-text mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                {project.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {project.stack.length > 0 && (
            <p className="supporting-text mt-4 text-sm"><strong>Stack:</strong> {project.stack.join(', ')}</p>
          )}

          {(project.disclosureNote || project.aiDirectedNote) && (
            <div className="divider mt-4 space-y-1 border-l-2 pl-3 text-sm leading-relaxed">
              {project.disclosureNote && <p>{project.disclosureNote}</p>}
              {project.aiDirectedNote && <p>{project.aiDirectedNote}</p>}
            </div>
          )}

          <div className="divider mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4">
            <button type="button" onClick={() => onEstimateSimilar(project.similarEstimateType)} className="button button-primary">
              Estimate a similar build
            </button>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-link">GitHub source</a>
            {project.releaseUrl && (
              <a href={project.releaseUrl} target="_blank" rel="noopener noreferrer" className="text-link">Release {project.releaseTag}</a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link">{project.liveLabel ?? 'Project page'}</a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
