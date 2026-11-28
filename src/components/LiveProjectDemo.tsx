import { useEffect, useRef, useState } from 'react';

interface LiveProjectDemoProps {
  title: string;
  url: string;
  desktopOnly: boolean;
  unity: boolean;
  onWatchVideo?: () => void;
}

function DemoFrame({ title, url, unity }: { title: string; url: string; unity: boolean }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'slow'>('loading');

  useEffect(() => {
    if (status !== 'loading') {
      return;
    }
    const timer = window.setTimeout(() => setStatus('slow'), 12000);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <>
      <div className="supporting-text text-sm" role="status">
        {status === 'loading' && 'Loading demo…'}
        {status === 'slow' && 'The demo is taking a while. You can reload it or open it in a new tab.'}
      </div>
      <iframe
        title={`${title} live demo`}
        src={url}
        sandbox="allow-scripts"
        allowFullScreen={unity}
        referrerPolicy="no-referrer"
        onLoad={() => setStatus('loaded')}
        inert={status === 'loading'}
        className={`live-demo-frame w-full border-0 bg-white ${unity ? 'h-[640px]' : ''}`}
      />
    </>
  );
}

export function LiveProjectDemo({ title, url, desktopOnly, unity, onWatchVideo }: LiveProjectDemoProps) {
  const [frameVersion, setFrameVersion] = useState(0);
  const [frameSize, setFrameSize] = useState<'desktop' | 'phone'>('desktop');
  const [fullscreenError, setFullscreenError] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const demoLoaded = frameVersion > 0;

  async function enterFullscreen() {
    setFullscreenError(false);
    try {
      await frameRef.current?.requestFullscreen();
    } catch {
      setFullscreenError(true);
    }
  }

  return (
    <section aria-label={`${title} live demo`}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFrameVersion((previous) => previous + 1)}
          className={`button ${demoLoaded ? '' : 'button-primary'} ${unity ? 'hidden min-[1080px]:inline-flex' : ''}`}
        >
          {demoLoaded ? 'Reload demo' : 'Load demo'}
        </button>
        <a href={url} target="_blank" rel="noopener noreferrer" className="button">Open in new tab</a>
        {onWatchVideo && (
          <button type="button" onClick={onWatchVideo} className="text-link">Watch video</button>
        )}
      </div>

      {desktopOnly && <p className="supporting-text mt-2 text-sm">Best on desktop with a keyboard and mouse.</p>}

      {demoLoaded && (
        <div className={unity ? 'hidden min-[1080px]:block' : undefined}>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!desktopOnly && (
              <div role="group" aria-label="Preview width" className="hidden gap-2 sm:flex">
                <button type="button" className="choice" aria-pressed={frameSize === 'desktop'} onClick={() => setFrameSize('desktop')}>Desktop</button>
                <button type="button" className="choice" aria-pressed={frameSize === 'phone'} onClick={() => setFrameSize('phone')}>Phone</button>
              </div>
            )}
            {document.fullscreenEnabled && (
              <button type="button" className="button" onClick={enterFullscreen}>Fullscreen</button>
            )}
          </div>
          {fullscreenError && <p className="supporting-text mt-2 text-sm" role="status">Fullscreen is unavailable. Open the demo in a new tab.</p>}
          <div ref={frameRef} className={`live-demo-stage panel mx-auto mt-3 overflow-hidden ${frameSize === 'phone' ? 'live-demo-phone max-w-[390px]' : ''}`}>
            <DemoFrame key={frameVersion} title={title} url={url} unity={unity} />
          </div>
          <p className="supporting-text mt-2 text-sm">If the preview is blank or a feature needs browser storage, open the demo in a new tab.</p>
        </div>
      )}
    </section>
  );
}
