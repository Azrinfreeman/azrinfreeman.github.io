import { useState } from 'react';
import { PROFILE } from '../data/portfolio';

export function ContactFooter() {
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopyStatus('Email address copied.');
    } catch {
      setCopyStatus('Could not copy the address. Use the email link.');
    }
    window.setTimeout(() => setCopyStatus(''), 3000);
  };

  const whatsappHref = `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
    "Hi Azrin, I'm reaching out from your portfolio site."
  )}`;

  return (
    <footer id="contact" className="divider page-section border-t bg-[var(--bg-surface)]">
      <div className="page-width">
        <div className="grid items-start gap-7 md:grid-cols-2">
          <div>
            <h2 className="section-title">Get in touch</h2>
            <p className="supporting-text mt-2 max-w-md leading-relaxed">
              Email or message me about a project, research prototype or developer role.
            </p>
            <p className="supporting-text mt-4 text-sm">{PROFILE.location} ({PROFILE.timezone})</p>
            <p className="supporting-text mt-1 text-sm">Available for remote work worldwide.</p>
            <p className="supporting-text mt-1 text-sm">{PROFILE.relocationNote}</p>
          </div>

          <div>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="button button-primary">
              WhatsApp {PROFILE.phoneDisplay}
            </a>
            <div className="mt-2 flex flex-wrap items-center gap-x-4">
              <a href={`mailto:${PROFILE.email}`} className="text-link break-all">{PROFILE.email}</a>
              <button type="button" onClick={handleCopyEmail} className="button">Copy email</button>
            </div>
            {copyStatus && <p className="supporting-text mt-2 text-sm" role="status">{copyStatus}</p>}
            <div className="mt-2 flex flex-wrap gap-x-4">
              <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link">GitHub</a>
              <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn</a>
              <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-link">Resume (PDF)</a>
            </div>
          </div>
        </div>
        <div className="divider supporting-text mt-8 flex flex-wrap justify-between gap-2 border-t pt-4 text-sm">
          <p>© 2026 {PROFILE.name}</p>
          <p>{PROFILE.education[0]}</p>
        </div>
      </div>
    </footer>
  );
}
