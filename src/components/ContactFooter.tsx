import { useState } from 'react';
import { Check, Copy, Download, Github, Linkedin, Mail, MapPin, MessageSquare } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

export function ContactFooter() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <footer id="contact" className="border-t py-16" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="surface-card rounded-2xl p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
                Ready to Start?
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
                Let&apos;s Ship Your Project or Discuss a Role
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                Whether you need a fast bug fix, a Flutter + Laravel build, a PhD research prototype, or a developer to join your team, message me directly and I&apos;ll reply with an honest next step.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" style={{ color: 'var(--accent-emerald)' }} />
                  {PROFILE.location} · {PROFILE.timezone}
                </span>
                <span>{PROFILE.relocationNote}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-5">
              <a
                href={`https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Azrin, I'm reaching out from your portfolio site."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--accent-emerald)' }}
              >
                <MessageSquare className="h-4 w-4" />
                Chat on WhatsApp ({PROFILE.phoneDisplay})
              </a>

              <div className="flex gap-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold sm:text-sm"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Mail className="h-4 w-4" />
                  {PROFILE.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: copiedEmail ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                  }}
                >
                  {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>

                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>

                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs sm:flex-row" style={{ color: 'var(--text-muted)' }}>
          <p>© 2026 {PROFILE.name}. Built with React, TypeScript &amp; Tailwind CSS.</p>
          <p className="font-mono">
            {PROFILE.education[0]}
          </p>
        </div>
      </div>
    </footer>
  );
}
