import { ShieldCheck } from 'lucide-react';
import { STACK_GROUPS, WORKFLOW_STEPS } from '../data/portfolio';

export function ProcessAndStack() {
  return (
    <section
      id="process"
      className="border-t py-16"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 55%, var(--bg-canvas))',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-emerald)' }}>
            How I Work &amp; Technical Stack
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
            Clear Process, Honest Engineering
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            Built for clients who want reliable execution without agency overhead or mystery billing.
          </p>
        </div>

        {/* 4-Step Trust Strip */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((item) => (
            <div key={item.step} className="surface-card rounded-2xl p-5">
              <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-emerald)' }}>
                STEP {item.step}
              </span>
              <h3 className="mt-2 font-display text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Honest AI + Engineering Note */}
        <div
          className="mt-6 flex items-start gap-3 rounded-2xl border p-5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" style={{ color: 'var(--accent-emerald)' }} />
          <div className="text-xs leading-relaxed sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Fast AI-accelerated builds, personally reviewed and tested
            </p>
            <p className="mt-1">
              I use AI coding agents (Claude Code, OpenAI Codex, and Unity MCP) to move quickly from spec to working prototype, then review every change myself and verify flows with Postman, Playwright, Vitest, or xUnit. TypeScript, React, Node.js, and .NET projects marked with <span className="font-mono">*</span> were built using this agent-directed and personally tested workflow. For visual assets, I work best from your mockups or clean component libraries.
            </p>
          </div>
        </div>

        {/* Categorized Tech Stack */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STACK_GROUPS.map((group) => (
            <div key={group.label} className="surface-card rounded-2xl p-5">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {group.label}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                {group.items.map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-emerald)' }} />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
