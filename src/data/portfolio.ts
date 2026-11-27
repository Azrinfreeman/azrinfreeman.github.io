import type {
  AudiencePreset,
  CommercialHighlightItem,
  EstimatorOption,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
} from '../types';
import generatedProjects from './generated-projects.json';
import {
  CATEGORY_LABELS,
  PINNED_REPO_ORDER,
  PROJECT_OVERRIDES,
  SIMILAR_ESTIMATE_BY_CATEGORY,
} from './overrides';

export const PROFILE = {
  name: 'Azrin Amran',
  handle: 'Azrinfreeman',
  location: 'Kota Bharu, Kelantan, Malaysia',
  timezone: 'GMT+8',
  relocationNote: 'Ready to relocate anywhere in Malaysia (including Klang Valley / PJ)',
  phoneDisplay: '+60 14-544 8481',
  whatsappNumber: '60145448481',
  email: 'azrinfreeman2@gmail.com',
  githubUrl: 'https://github.com/Azrinfreeman',
  linkedinUrl: 'https://linkedin.com/in/azrin-amran',
  resumeUrl: '/Azrin-Amran-Resume.pdf',
  education: [
    'Bachelor of Information Technology (Game Technology) — UTeM (2018–2022)',
    'Diploma in Information Technology — UTHM (2016–2018)',
  ],
};

export const AUDIENCE_PRESETS: AudiencePreset[] = [
  {
    id: 'client',
    label: 'Business / Freelance Client',
    headline: 'Mobile apps and backend APIs',
    subcopy:
      'I build Flutter apps, Laravel APIs and custom web or desktop tools.',
    primaryCtaLabel: 'Estimate a Project',
    primaryCtaAction: 'estimate',
    secondaryCtaLabel: 'WhatsApp Directly',
    secondaryCtaHref: `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
      "Hi Azrin, I saw your portfolio and I'd like to discuss a software project."
    )}`,
    highlightPoints: [
      'Stripe billing and server-side verification',
      'Play Store and App Store release fixes',
      'Staging demo before handover',
    ],
  },
  {
    id: 'researcher',
    label: 'PhD / EdTech Researcher',
    headline: 'Unity and AR prototypes for education',
    subcopy:
      'I build virtual science labs, Vuforia AR math activities and Malay and English AI tutors for Malaysian researchers and education teams.',
    primaryCtaLabel: 'See EdTech & AR Demos',
    primaryCtaAction: 'edtech',
    secondaryCtaLabel: 'Scope Your Prototype',
    secondaryCtaHref: '#estimate',
    highlightPoints: [
      'Unity 2D/3D experiments, quizzes & Phaser browser games',
      'OpenAI API tutors with curriculum guardrails',
      'Offline-first Android APKs & web builds for schools',
    ],
  },
  {
    id: 'recruiter',
    label: 'Hiring Manager',
    headline: 'Software developer for web, mobile and Unity',
    subcopy:
      'Former Software / Unity Developer Officer at Hanana Academy (Jan 2024 – Nov 2026) and freelance Unity, Flutter & PHP/Laravel developer (Techies Inc 2019–2024 & independent contracts since 2018). Based in Kota Bharu, available immediately, and ready to relocate anywhere in Malaysia.',
    primaryCtaLabel: 'View Resume (PDF)',
    primaryCtaAction: 'resume',
    secondaryCtaLabel: 'View LinkedIn',
    secondaryCtaHref: PROFILE.linkedinUrl,
    highlightPoints: [
      'B.IT (Game Technology) from UTeM and a Diploma in IT from UTHM',
      'PHP/Laravel, MySQL, Flutter/Dart, Unity/C#, Stripe & OpenAI APIs',
      'Available immediately for remote or hybrid work, including relocation to Klang Valley',
    ],
  },
];

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile (Flutter)' },
  { id: 'backend', label: 'Backend & Stripe' },
  { id: 'edtech', label: 'EdTech, Unity & AR' },
  { id: 'tools', label: 'AI Bots, Web & Desktop' },
];

interface RawSyncedProject {
  repoKey: string;
  repoName: string;
  id: string;
  title: string;
  tagline: string;
  category: Exclude<ProjectCategory, 'all'>;
  featuredInReel?: boolean;
  durationBadge?: string;
  posterUrl?: string;
  loopVideoUrl?: string;
  videoUrl?: string;
  gallery?: { src: string; caption: string }[];
  stack: string[];
  problem: string;
  solution: string;
  highlights: string[];
  disclosureNote?: string;
  repoUrl: string;
  releaseUrl?: string;
  releaseTag?: string;
  liveUrl?: string;
  liveLabel?: string;
  primaryLanguage?: string;
  updatedAt?: string;
}

function buildMergedProjects(): ProjectItem[] {
  const rawList = (generatedProjects as RawSyncedProject[]) || [];

  const merged = rawList.map((raw): ProjectItem & { _repoKey: string } => {
    const key = (raw.repoKey || raw.repoName || raw.id).toLowerCase();
    const ov = PROJECT_OVERRIDES[key] || {};
    const category = ov.category ?? raw.category ?? 'tools';
    const posterUrl = raw.posterUrl ?? ov.posterUrl;
    const videoUrl = raw.videoUrl ?? ov.videoUrl;
    const loopVideoUrl = raw.loopVideoUrl ?? ov.loopVideoUrl;
    const gallery = raw.gallery ?? ov.gallery;
    const visualVariant =
      ov.visualVariant ?? (!posterUrl && !videoUrl ? 'auto' : undefined);

    return {
      _repoKey: key,
      id: ov.id ?? raw.id,
      title: ov.title ?? raw.title,
      tagline: ov.tagline ?? raw.tagline,
      category,
      categoryLabel: CATEGORY_LABELS[category],
      featuredInReel: Boolean(raw.featuredInReel ?? ov.featuredInReel),
      reelLabel: ov.reelLabel ?? ov.title ?? raw.title,
      durationBadge:
        raw.durationBadge ??
        ov.durationBadge ??
        (videoUrl ? 'Video Demo' : gallery && gallery.length > 1 ? `${gallery.length} Shots` : undefined),
      posterUrl,
      loopVideoUrl,
      videoUrl,
      gallery,
      visualVariant,
      stack: ov.stack ?? raw.stack,
      problem: ov.problem ?? raw.problem,
      solution: ov.solution ?? raw.solution,
      highlights: ov.highlights ?? raw.highlights,
      disclosureNote: ov.disclosureNote ?? raw.disclosureNote,
      aiDirectedNote: ov.aiDirectedNote,
      repoUrl: raw.repoUrl,
      releaseUrl: raw.releaseUrl ?? ov.releaseUrl,
      releaseTag: raw.releaseTag ?? ov.releaseTag,
      liveUrl: ov.liveUrl ?? raw.liveUrl,
      liveLabel: ov.liveLabel ?? raw.liveLabel,
      similarEstimateType: ov.similarEstimateType ?? SIMILAR_ESTIMATE_BY_CATEGORY[category],
      primaryLanguage: raw.primaryLanguage,
      updatedAt: raw.updatedAt,
    };
  });

  merged.sort((a, b) => {
    const idxA = PINNED_REPO_ORDER.indexOf(a._repoKey);
    const idxB = PINNED_REPO_ORDER.indexOf(b._repoKey);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return (b.updatedAt || '').localeCompare(a.updatedAt || '');
  });

  return merged.map(({ _repoKey: _, ...item }) => item);
}

export const PROJECTS: ProjectItem[] = buildMergedProjects();

export const COMMERCIAL_HIGHLIGHTS: CommercialHighlightItem[] = [
  {
    id: 'comm-iktisass',
    title: 'Talent Management Application (IKTISASS)',
    roleMeta: 'Freelance contract (2025)',
    summary:
      'Built the Flutter mobile application and the Laravel REST API connecting it to an existing Laravel and MySQL-backed web platform, extending the website into a mobile-first app with administrator/user role functionality and responsive data dashboards.',
    stack: ['Flutter', 'Dart', 'Laravel REST API', 'MySQL', 'Role-Based Dashboards'],
    estimateType: 'flutter-app',
  },
  {
    id: 'comm-hanana-games',
    title: 'Primary-School Web & Android Learning Games (Hanana Academy)',
    roleMeta: 'Software / Unity Developer Officer (Jan 2024 – Nov 2026)',
    summary:
      'Developed Unity/C# educational applications and shipped browser and signed Android learning games for Malaysian primary pupils using Phaser, Vite, and Capacitor — including an offline-first PWA and Malay/English voice-overs generated with Microsoft Edge neural TTS (msedge-tts).',
    stack: ['Unity / C#', 'Phaser', 'Vite', 'Capacitor Android', 'PWA (Offline-First)', 'msedge-tts'],
    estimateType: 'edtech-unity',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-api-stripe',
    title: 'PHP / Laravel APIs & Stripe Billing',
    summary:
      'Custom REST APIs, MySQL databases, Stripe subscription & server-side verification, cPanel migrations, and urgent hosting fixes.',
    starterRm: 350,
    starterUsd: 80,
    turnaround: '2–14 days depending on scope',
    deliverables: [
      'Clean REST endpoints verified in Postman',
      'Stripe checkout, webhooks & entitlement checks',
      'cPanel / WordPress / PHP backup & server recovery',
    ],
    estimateType: 'api-stripe',
  },
  {
    id: 'srv-flutter',
    title: 'Flutter Apps & Store Publishing Fixes',
    summary:
      'Android/iOS Flutter app screens, API integration, Play Store & App Store submission troubleshooting, TestFlight, and signing fixes.',
    starterRm: 250,
    starterUsd: 60,
    turnaround: '1–21 days depending on scope',
    deliverables: [
      'Google Play & Apple App Store signing / rejection fixes',
      'Flutter mobile UI wired to Laravel or Supabase',
      'Offline storage, notifications & testable APK/IPA builds',
    ],
    estimateType: 'flutter-app',
  },
  {
    id: 'srv-edtech',
    title: 'EdTech, Unity 2D/3D/AR & AI Prototypes',
    summary:
      'Interactive learning apps, PhD research prototypes, Vuforia AR scenes, OpenAI API tutors with guardrails, and HTML5/Phaser games.',
    starterRm: 1500,
    starterUsd: 350,
    turnaround: '1–5 weeks depending on modules',
    deliverables: [
      'Unity 2D/3D/AR or Phaser + Capacitor Android builds',
      'Context-aware OpenAI tutoring & Malay/English flows',
      'Research-ready logging, quizzes & local/MySQL score sync',
    ],
    estimateType: 'edtech-unity',
  },
  {
    id: 'srv-bots-tools',
    title: 'AI Bots, Automation & Desktop Utilities',
    summary:
      'Custom Discord AI bots, Python automation scripts, OpenAI/Whisper workflows, and packaged Windows desktop tools with installers.',
    starterRm: 400,
    starterUsd: 95,
    turnaround: '3–14 days depending on scope',
    deliverables: [
      'Discord bots with OpenAI / local Whisper & SQLite',
      'Windows utilities packaged via Inno Setup installers',
      'Automated browser & API checks before handover',
    ],
    estimateType: 'bot-tool',
  },
];

export const ESTIMATOR_OPTIONS: EstimatorOption[] = [
  {
    id: 'api-stripe',
    label: 'Bug Fix / PHP API / Stripe Integration',
    shortLabel: 'API & Stripe',
    description: 'REST API debugging, Stripe subscription verification, MySQL queries, or cPanel server fixes.',
    tiers: {
      quick: {
        rmMin: 350,
        rmMax: 900,
        usdMin: 80,
        usdMax: 210,
        timeline: '2–5 days',
        deliverableHint: 'Root-cause fix, Postman test proof & deployment to your cPanel/server.',
      },
      mvp: {
        rmMin: 1200,
        rmMax: 2800,
        usdMin: 280,
        usdMax: 650,
        timeline: '1–2 weeks',
        deliverableHint: 'Custom Laravel/PHP REST API endpoints + Stripe subscription verification + MySQL schema.',
      },
      full: {
        rmMin: 3000,
        rmMax: 6500,
        usdMin: 700,
        usdMax: 1500,
        timeline: '3–5 weeks',
        deliverableHint: 'Full backend module with role-based auth, admin endpoints, Stripe billing & docs.',
      },
    },
  },
  {
    id: 'store-publish',
    label: 'Play Store / App Store Publishing & Build Fix',
    shortLabel: 'Store Publish',
    description: 'Resolve Android/iOS signing errors, SDK target bumps, TestFlight uploads, or store review rejections.',
    tiers: {
      quick: {
        rmMin: 250,
        rmMax: 650,
        usdMin: 60,
        usdMax: 150,
        timeline: '1–4 days',
        deliverableHint: 'Fix build/signing errors and upload a passing AAB/IPA to Play Console or App Store Connect.',
      },
      mvp: {
        rmMin: 750,
        rmMax: 1600,
        usdMin: 175,
        usdMax: 370,
        timeline: '4–8 days',
        deliverableHint: 'Upgrade legacy Flutter/Android/iOS packages, fix permissions & guide through beta review.',
      },
      full: {
        rmMin: 1800,
        rmMax: 3500,
        usdMin: 420,
        usdMax: 820,
        timeline: '1.5–3 weeks',
        deliverableHint: 'Multi-store release rescue, Capacitor Android packaging & compliance fixes.',
      },
    },
  },
  {
    id: 'flutter-app',
    label: 'Flutter Mobile App (Android / iOS / Desktop)',
    shortLabel: 'Flutter App',
    description: 'Cross-platform mobile apps with clean state management, REST API sync, or Supabase PostgreSQL.',
    tiers: {
      quick: {
        rmMin: 500,
        rmMax: 1200,
        usdMin: 120,
        usdMax: 280,
        timeline: '3–6 days',
        deliverableHint: 'Add 1–3 new screens, fix API state bugs, or implement local storage/reminders.',
      },
      mvp: {
        rmMin: 1800,
        rmMax: 4000,
        usdMin: 420,
        usdMax: 920,
        timeline: '2–3 weeks',
        deliverableHint: 'Working 4–7 screen Flutter MVP connected to Laravel API or Supabase with auth.',
      },
      full: {
        rmMin: 4500,
        rmMax: 9500,
        usdMin: 1050,
        usdMax: 2200,
        timeline: '4–7 weeks',
        deliverableHint: 'Complete multi-role Flutter app + backend API + store submission handover.',
      },
    },
  },
  {
    id: 'edtech-unity',
    label: 'Unity 2D/3D/AR or AI Learning Prototype',
    shortLabel: 'Unity / AR / EdTech',
    description: 'PhD research interventions, STEM simulations, Vuforia AR, Phaser web games, or OpenAI tutors.',
    tiers: {
      quick: {
        rmMin: 600,
        rmMax: 1400,
        usdMin: 140,
        usdMax: 320,
        timeline: '3–7 days',
        deliverableHint: 'Fix C# bugs, add quiz scoring, or wire OpenAI/MySQL into an existing Unity/Phaser project.',
      },
      mvp: {
        rmMin: 1800,
        rmMax: 3800,
        usdMin: 420,
        usdMax: 880,
        timeline: '1.5–3 weeks',
        deliverableHint: 'Working interactive learning module / research prototype (PC, Web, or Android APK).',
      },
      full: {
        rmMin: 4200,
        rmMax: 8500,
        usdMin: 980,
        usdMax: 1950,
        timeline: '3–6 weeks',
        deliverableHint: 'Multi-level 2D/3D/AR application with AI tutor guardrails, voice-overs & database tracking.',
      },
    },
  },
  {
    id: 'web-laravel',
    label: 'PHP / Laravel / WordPress Web App',
    shortLabel: 'Web / Laravel',
    description: 'Database-driven PHP/Laravel web tools, dashboards, cPanel deployments, or WordPress fixes.',
    tiers: {
      quick: {
        rmMin: 300,
        rmMax: 850,
        usdMin: 70,
        usdMax: 195,
        timeline: '2–5 days',
        deliverableHint: 'WordPress/cPanel repair, migration, SSL setup, or PHP form/database bug fix.',
      },
      mvp: {
        rmMin: 1400,
        rmMax: 3200,
        usdMin: 320,
        usdMax: 740,
        timeline: '1.5–3 weeks',
        deliverableHint: 'Custom PHP/Laravel + MySQL portal with login, role access & clean responsive views.',
      },
      full: {
        rmMin: 3500,
        rmMax: 7500,
        usdMin: 820,
        usdMax: 1750,
        timeline: '3–6 weeks',
        deliverableHint: 'Full web system with admin dashboard, payment gateway, Playwright tests & cPanel deploy.',
      },
    },
  },
  {
    id: 'bot-tool',
    label: 'Custom Discord AI Bot / Script / Desktop Tool',
    shortLabel: 'AI Bot / Tool',
    description: 'Discord bots with OpenAI/Whisper, Python automation scripts, or Windows utilities.',
    tiers: {
      quick: {
        rmMin: 400,
        rmMax: 950,
        usdMin: 95,
        usdMax: 220,
        timeline: '2–5 days',
        deliverableHint: 'Custom slash commands, Python automation script, or OpenAI prompt workflow.',
      },
      mvp: {
        rmMin: 1100,
        rmMax: 2400,
        usdMin: 260,
        usdMax: 560,
        timeline: '1–2 weeks',
        deliverableHint: 'Self-hosted Discord AI bot or desktop utility with SQLite persistence & local config.',
      },
      full: {
        rmMin: 2600,
        rmMax: 5500,
        usdMin: 600,
        usdMax: 1280,
        timeline: '2.5–5 weeks',
        deliverableHint: 'Packaged Electron/.NET app with Inno Setup installer, dashboard & automated checks.',
      },
    },
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Written Scope & Fixed Quote',
    detail: 'We agree on 4–6 clear bullet deliverables, timeline, and 2 revision rounds before any coding starts.',
  },
  {
    step: '02',
    title: 'Fast Working Prototype',
    detail: 'I deliver an early working build quickly using reusable templates and AI-accelerated drafts — reviewed line by line.',
  },
  {
    step: '03',
    title: 'Video Demo Before Final Payment',
    detail: 'You verify the working feature on a staging server or screen-recorded walkthrough before final handover.',
  },
  {
    step: '04',
    title: 'Clean Code & Handover',
    detail: 'You receive clean source code, deployment notes, and verified builds with 40–50% deposit / 50% on delivery for direct work.',
  },
];

export const STACK_GROUPS = [
  {
    label: 'Backend & APIs',
    items: ['PHP', 'Laravel (REST API)', 'MySQL / SQL', 'Stripe API', 'Supabase / PostgreSQL', 'Python (Automation & APIs)', 'cPanel & WordPress'],
  },
  {
    label: 'Mobile & Web',
    items: ['Flutter', 'Dart', 'JavaScript', 'HTML / CSS', 'Play Store & App Store Publishing', 'Node.js / Next.js / React / TypeScript*'],
  },
  {
    label: 'EdTech, Games & Desktop',
    items: ['Unity 6 / Unity 2D & 3D', 'C#', 'Vuforia AR', 'Phaser + Vite + Capacitor', '.NET / WinForms / WinUI 3*', 'Inno Setup Installers'],
  },
  {
    label: 'AI Integration & Verification',
    items: ['OpenAI API (Prompt & Guardrails)', 'Claude Code & OpenAI Codex', 'Unity MCP', 'Postman API Testing', 'Playwright / Vitest / xUnit'],
  },
];
