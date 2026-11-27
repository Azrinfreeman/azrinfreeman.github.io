import { useState } from 'react';
import { Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react';
import type { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#estimate', label: 'Estimate' },
  { href: '#process', label: 'How I Work' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-canvas) 86%, transparent)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5 focus:outline-none">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg border font-display text-sm font-bold transition-transform group-hover:scale-105"
            style={{
              backgroundColor: 'var(--accent-emerald-soft)',
              borderColor: 'color-mix(in srgb, var(--accent-emerald) 40%, transparent)',
              color: 'var(--accent-emerald)',
            }}
          >
            A
          </span>
          <div className="leading-tight">
            <span className="block font-display text-sm font-bold sm:text-base" style={{ color: 'var(--text-primary)' }}>
              Azrin Amran
            </span>
            <span className="hidden font-mono text-[11px] sm:block" style={{ color: 'var(--text-muted)' }}>
              azrinfreeman.github.io
            </span>
          </div>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-100"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:opacity-90"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#estimate"
            className="hidden items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:inline-flex"
            style={{ backgroundColor: 'var(--accent-emerald)' }}
          >
            Get a Quote
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="border-t px-4 py-4 md:hidden"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-1.5 text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#estimate"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--accent-emerald)' }}
            >
              Get a Quote
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
