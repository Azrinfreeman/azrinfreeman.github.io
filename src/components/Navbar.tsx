import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import type { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#playground', label: 'Playground' },
  { href: '#services', label: 'Services' },
  { href: '#estimate', label: 'Estimate' },
  { href: '#process', label: 'How I work' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <header className="divider sticky top-0 z-20 border-b bg-[var(--bg-canvas)]">
      <div className="page-width flex min-h-16 items-center justify-between gap-3">
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-bold">
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-[var(--accent-fill)] font-display text-[var(--accent-on)]">A</span>
          {PROFILE.name}
        </a>

        <nav aria-label="Primary" className="divider hidden items-center gap-5 rounded-full border bg-[var(--bg-surface)] px-5 lg:flex">
          {NAV_LINKS.filter((link) => link.href !== '#estimate').map((link) => (
            <a key={link.href} href={link.href} className="inline-flex min-h-11 items-center whitespace-nowrap text-sm font-semibold hover:underline">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            role="switch"
            aria-label="Cocoa theme"
            aria-checked={isDark}
            className="inline-flex min-h-11 items-center gap-1.5 px-1 text-sm font-semibold"
          >
            <span className="theme-track" aria-hidden="true" />
            <span>Cocoa</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="button w-11 lg:hidden"
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
          <a href="#estimate" className="button button-primary hidden whitespace-nowrap lg:inline-flex">Estimate a project</a>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="divider border-t bg-[var(--bg-surface)] lg:hidden"
      >
        <div className="page-width py-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center text-sm font-medium hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
