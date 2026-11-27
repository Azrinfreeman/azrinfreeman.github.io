import { Bot, CalendarClock, Lock, Mic, ShieldCheck } from 'lucide-react';
import type { ProjectItem } from '../types';

interface ProjectCardVisualProps {
  project: ProjectItem;
  className?: string;
}

export function ProjectCardVisual({ project, className = '' }: ProjectCardVisualProps) {
  if (project.visualVariant === 'hujan') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-slate-950 px-4 pt-10 pb-3.5 text-slate-100 ${className}`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-xs font-semibold text-emerald-300">Hujan Companion</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
            <Lock className="h-3 w-3" />
            DPAPI
          </span>
        </div>

        <div className="my-1.5 space-y-1.5 font-mono text-[11px]">
          <div className="rounded bg-slate-900/90 px-2.5 py-1.5 text-slate-300">
            <span className="text-emerald-400">/ambience</span> rain · voice channel active
          </div>
          <div className="flex items-center justify-between rounded bg-slate-900/90 px-2.5 py-1.5 text-slate-300">
            <span className="truncate">
              <span className="text-amber-400">/summary</span> local Whisper (consent-gated)
            </span>
            <Mic className="ml-2 h-3.5 w-3.5 shrink-0 text-amber-400" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Electron Tray + SQLite</span>
          <span className="font-mono text-emerald-400">v0.3.4</span>
        </div>
      </div>
    );
  }

  if (project.visualVariant === 'betternotes') {
    return (
      <div
        className={`relative flex h-full w-full items-center justify-between gap-3 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 px-4 pt-10 pb-3.5 ${className}`}
      >
        <div className="flex flex-col items-start gap-1.5">
          {project.posterUrl && (
            <img
              src={project.posterUrl}
              alt="BetterNotes app icon"
              loading="lazy"
              className="h-12 w-12 rounded-xl shadow-lg ring-1 ring-white/15"
            />
          )}
          <div>
            <p className="font-display text-sm font-bold text-white">BetterNotes</p>
            <p className="font-mono text-[10px] text-emerald-300">Offline-First + RLS</p>
          </div>
        </div>

        <div className="grid w-44 grid-cols-1 gap-1.5">
          <div className="rounded-lg bg-amber-300/95 p-2 text-[11px] font-medium text-slate-900 shadow">
            <p className="font-bold">Project Ideas</p>
            <p className="mt-0.5 text-[10px] opacity-80">Multi-window desktop + backup</p>
          </div>
          <div className="rounded-lg bg-emerald-300/95 p-2 text-[11px] font-medium text-slate-900 shadow">
            <p className="flex items-center gap-1 font-bold">
              <ShieldCheck className="h-3 w-3" /> Supabase Sync
            </p>
            <p className="mt-0.5 text-[10px] opacity-80">PostgreSQL row-level security</p>
          </div>
        </div>
      </div>
    );
  }

  if (project.visualVariant === 'appointly') {
    return (
      <div
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 px-4 pt-10 pb-3.5 text-slate-100 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-emerald-400" />
            <span className="font-display text-xs font-bold text-white">Appointly Schedule</span>
          </div>
          <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-300">
            JSON Backup
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs">
            <span>09:30 · Client Consultation</span>
            <span className="font-mono text-[10px] text-emerald-400">Weekly</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs">
            <span>14:00 · Follow-up Review</span>
            <span className="font-mono text-[10px] text-amber-300">Reminder On</span>
          </div>
        </div>

        <p className="font-mono text-[11px] text-slate-400">Flutter · Offline-Capable Client Views</p>
      </div>
    );
  }

  if (project.id === 'monitor-remote' && project.posterUrl) {
    return (
      <div className={`relative flex h-full w-full items-center justify-center bg-slate-950 p-2 ${className}`}>
        <img
          src={project.posterUrl}
          alt={project.title}
          loading="lazy"
          className="h-full w-auto max-w-full rounded-lg object-contain shadow-md"
        />
      </div>
    );
  }

  return (
    <img
      src={project.posterUrl}
      alt={project.title}
      loading="lazy"
      className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${className}`}
    />
  );
}
