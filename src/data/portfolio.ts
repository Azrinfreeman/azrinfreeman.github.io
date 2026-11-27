import type {
  AudiencePreset,
  EstimatorOption,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
} from '../types';

export const PROFILE = {
  name: 'Azrin Amran',
  handle: 'Azrinfreeman',
  location: 'Kota Bharu, Kelantan, Malaysia',
  timezone: 'GMT+8 · Remote worldwide',
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
    eyebrow: 'Freelance & Contract Engineering',
    headline: 'I build mobile apps, backend APIs, and interactive software — and ship working prototypes fast.',
    subcopy:
      'Need a Flutter app connected to Laravel, a Stripe subscription backend, store publishing fixes, or a custom web/desktop tool? Watch real shipped demos below and get a clear fixed-scope quote.',
    primaryCtaLabel: 'Estimate a Project',
    primaryCtaAction: 'estimate',
    secondaryCtaLabel: 'WhatsApp Directly',
    secondaryCtaHref: `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
      "Hi Azrin, I saw your portfolio and I'd like to discuss a software project."
    )}`,
    highlightPoints: [
      'PHP / Laravel REST APIs, MySQL & Stripe verification',
      'Flutter Android/iOS builds & Play Store / App Store publishing',
      'Video staging demo before final handover',
    ],
  },
  {
    id: 'researcher',
    label: 'PhD / EdTech Researcher',
    eyebrow: 'Academic & Learning Prototypes',
    headline: 'Interactive Unity 2D/3D, AR & Malay/English AI prototypes built for research studies and classrooms.',
    subcopy:
      'I have built virtual science labs, Vuforia AR math activities, and OpenAI-guided learning tutors for Malaysian PhD researchers and education teams — tested and ready for participant trials.',
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
    eyebrow: 'Full-Time & Contract Roles',
    headline: 'Software developer with ~3 years full-time and ~5 years freelance shipping web, mobile & Unity apps.',
    subcopy:
      'Former Software / Unity Developer Officer at Hanana Academy (Jan 2024 – Nov 2026) and freelance Unity/Flutter/Laravel builder since 2019. Based in Kota Bharu, available immediately, and ready to relocate anywhere in Malaysia.',
    primaryCtaLabel: 'Download Resume (PDF)',
    primaryCtaAction: 'resume',
    secondaryCtaLabel: 'View LinkedIn',
    secondaryCtaHref: PROFILE.linkedinUrl,
    highlightPoints: [
      'B.IT (Game Technology), UTeM · Diploma in IT, UTHM',
      'PHP/Laravel, MySQL, Flutter/Dart, Unity/C#, Stripe & OpenAI APIs',
      'Available immediately · Remote, hybrid, or relocate to Klang Valley',
    ],
  },
];

export const PROOF_METRICS = [
  {
    value: '3 yrs FT + 5 yrs Freelance',
    label: 'Production web, mobile & Unity apps since 2019',
  },
  {
    value: '11+ Public Demos',
    label: 'Playable trailers, Windows installers & public repos',
  },
  {
    value: 'AI-Accelerated + Tested',
    label: 'Rapid agent-assisted drafts, personally reviewed & tested',
  },
];

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile (Flutter)' },
  { id: 'backend', label: 'Backend & Stripe' },
  { id: 'edtech', label: 'EdTech, Unity & AR' },
  { id: 'tools', label: 'AI Bots & Desktop Tools' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'evergreen-ai-virtual-lab',
    title: 'Evergreen STEM Virtual AI Lab',
    tagline: 'Malay-language 2D science lab in Unity 6 with drag-and-drop experiments and an OpenAI guardrail tutor.',
    category: 'edtech',
    categoryLabel: 'EdTech, Unity & AR',
    featuredInReel: true,
    reelLabel: 'Evergreen AI Lab',
    durationBadge: 'Video Teaser',
    posterUrl: '/media/posters/evergreen.webp',
    loopVideoUrl: '/media/videos/evergreen-loop.mp4',
    videoUrl: '/media/videos/evergreen-demo.mp4',
    stack: ['Unity 6', 'C#', 'OpenAI API', 'Unity MCP', 'Claude Code', 'OpenAI Codex'],
    problem:
      'Secondary students needed a guided Malay-language virtual science lab where an AI assistant explains concepts without simply handing out direct quiz answers.',
    solution:
      'Connected Unity 6 in C# to the OpenAI Chat Completions API with per-activity system prompts and guardrails, paired with drag-and-drop experiments, quizzes, and a demo-safe fallback mode.',
    highlights: [
      'Per-activity context prompts keep tutor replies aligned to the exact experiment step.',
      'Guides learners toward hints instead of spoiling quiz answers.',
      'Environment-variable API key handling and scripted teaser capture mode.',
    ],
    disclosureNote: 'Public on GitHub with client permission.',
    aiDirectedNote: 'Unity MCP, Claude Code, and OpenAI Codex were used to inspect scenes and polish uGUI interfaces, with all changes personally reviewed and tested.',
    repoUrl: 'https://github.com/Azrinfreeman/evergreen-ai-virtual-lab',
    similarEstimateType: 'edtech-unity',
  },
  {
    id: 'talentlink-job-portal-demo',
    title: 'TalentLink Job & Talent Portal',
    tagline: 'Offline Flutter job and talent management showcase with role-specific flows and responsive dashboards.',
    category: 'mobile',
    categoryLabel: 'Mobile (Flutter)',
    featuredInReel: true,
    reelLabel: 'TalentLink Flutter',
    durationBadge: '40s Video',
    posterUrl: '/media/posters/talentlink.webp',
    videoUrl: '/media/videos/talentlink-demo.mp4',
    stack: ['Flutter', 'Dart', 'Responsive UI', 'Role Views'],
    problem:
      'Clients often want to inspect real Flutter dashboard UX and multi-role navigation before committing to a mobile portal connected to a Laravel backend.',
    solution:
      'Built a clean, standalone Flutter showcase using fictional data to demonstrate applicant/admin workflows, filterable listings, and responsive mobile layouts.',
    highlights: [
      'Represents the mobile UI architecture used alongside Laravel REST APIs in closed-source client work.',
      'Includes structured job cards, candidate workflows, and clean state updates.',
      'Packaged with a v1.0.0 GitHub release and 40-second product walkthrough.',
    ],
    repoUrl: 'https://github.com/Azrinfreeman/talentlink-job-portal-demo',
    releaseUrl: 'https://github.com/Azrinfreeman/talentlink-job-portal-demo/releases/tag/v1.0.0',
    releaseTag: 'v1.0.0',
    similarEstimateType: 'flutter-app',
  },
  {
    id: 'unity-subscription-unlock',
    title: 'Stripe Subscription Unlock for Unity',
    tagline: 'PHP REST API + MySQL + Stripe subscription verification template unlocking bundled Unity content.',
    category: 'backend',
    categoryLabel: 'Backend & Stripe',
    featuredInReel: true,
    reelLabel: 'Stripe + PHP API',
    durationBadge: '60s Video',
    posterUrl: '/media/posters/stripe-unity.webp',
    videoUrl: '/media/videos/stripe-unity-demo.mp4',
    stack: ['PHP', 'REST API', 'MySQL', 'Stripe API', 'C#', 'Unity', 'Postman'],
    problem:
      'Educational games needed to stay free to download while unlocking premium stages across a multi-game bundle through reliable monthly or annual subscriptions.',
    solution:
      'Engineered PHP REST endpoints for subscription activation, renewal, expiration, and server-side transaction verification with Stripe, wired to C# entitlement gates in Unity.',
    highlights: [
      'Every Stripe API call and callback verified in Postman before C# client integration.',
      'Server-side status verification prevents client-side entitlement tampering.',
      'Packaged into a reusable template so new apps can integrate subscriptions cleanly.',
    ],
    disclosureNote: 'Tested working prototype & reusable template (built and verified in testing; not launched to live end-users).',
    repoUrl: 'https://github.com/Azrinfreeman/Unity-Subscription-Unlock',
    similarEstimateType: 'api-stripe',
  },
  {
    id: 'hopboard',
    title: 'Hopboard — Encrypted Wi-Fi Clipboard',
    tagline: 'Cross-platform Flutter utility sharing clipboard text between your devices over local Wi-Fi without cloud accounts.',
    category: 'mobile',
    categoryLabel: 'Mobile (Flutter)',
    featuredInReel: true,
    reelLabel: 'Hopboard TLS',
    durationBadge: 'Video + 3 Shots',
    posterUrl: '/media/posters/hopboard.webp',
    videoUrl: '/media/videos/hopboard-demo.mp4',
    gallery: [
      { src: '/media/posters/hopboard.webp', caption: 'Hopboard main Windows & mobile pairing overview' },
      { src: '/media/posters/hopboard-copy.webp', caption: 'Instant copy-and-paste transfer across local devices' },
      { src: '/media/posters/hopboard-phone.webp', caption: 'Android mobile client receiving synced clipboard items' },
    ],
    stack: ['Flutter', 'Dart', 'TLS Encryption', 'Local Networking', 'Windows & Android'],
    problem:
      'Moving links, snippets, or OTPs between a Windows PC and Android phone usually forces cloud logins or third-party servers.',
    solution:
      'Built an offline-ready Flutter desktop and mobile app that pairs devices with a six-digit code and transfers text over encrypted, certificate-pinned LAN sockets.',
    highlights: [
      'Zero cloud account or internet connection required.',
      'Certificate-pinned TLS channels, clipboard safeguards, and automated security/connection tests.',
      'Published Windows release build (v0.3.1) with documentation.',
    ],
    repoUrl: 'https://github.com/Azrinfreeman/hopboard',
    releaseUrl: 'https://github.com/Azrinfreeman/hopboard/releases/tag/v0.3.1',
    releaseTag: 'v0.3.1',
    similarEstimateType: 'flutter-app',
  },
  {
    id: 'hzswitcher',
    title: 'HzSwitcher — Display & Refresh Utility',
    tagline: 'Windows 10/11 tray app for switching monitor refresh rates and brightness with per-app profiles and automation.',
    category: 'tools',
    categoryLabel: 'AI Bots & Desktop Tools',
    featuredInReel: true,
    reelLabel: 'HzSwitcher .NET',
    durationBadge: '55s Video',
    posterUrl: '/media/posters/hzswitcher.webp',
    videoUrl: '/media/videos/hzswitcher-demo.mp4',
    stack: ['C#', '.NET', 'Windows Forms', 'xUnit', 'Inno Setup'],
    problem:
      'Laptop and multi-monitor users frequently waste battery running 144Hz+ idle or during video playback, while Windows display settings bury quick switching.',
    solution:
      'Created a native Windows tray utility with instant presets, global hotkeys, per-app profiles, automatic idle/video power-saver rules, and a fallback-rate safety net.',
    highlights: [
      'Automatic power-saver lowers refresh rate when idle or playing video.',
      'Includes xUnit tests for core logic and a packaged Inno Setup Windows installer.',
      'Built with AI coding agents, then personally reviewed, tested, and shipped through v1.8.0.',
    ],
    aiDirectedNote: 'Built by directing AI coding agents, then personally reviewed and verified with xUnit tests and Windows installer testing.',
    repoUrl: 'https://github.com/Azrinfreeman/HzSwitcher',
    releaseUrl: 'https://github.com/Azrinfreeman/HzSwitcher/releases/tag/v1.8.0',
    releaseTag: 'v1.8.0',
    similarEstimateType: 'bot-tool',
  },
  {
    id: 'virtual-lab',
    title: 'Virtual Biology Lab (Form 5)',
    tagline: 'Unity 3D interactive biology laboratory connected to PHP REST APIs and MySQL for guided school experiments.',
    category: 'edtech',
    categoryLabel: 'EdTech, Unity & AR',
    durationBadge: '60s Video',
    posterUrl: '/media/posters/virtual-lab.webp',
    videoUrl: '/media/videos/virtual-lab-demo.mp4',
    gallery: [
      { src: '/media/posters/virtual-lab.webp', caption: 'Guided 3D virtual biology lab experiment scene' },
      { src: '/media/posters/virtual-lab-menu.webp', caption: 'Module selection and interactive lesson menu' },
      { src: '/media/posters/virtual-lab-anatomy.webp', caption: 'Interactive anatomy inspection and nutrition quiz' },
    ],
    stack: ['Unity 3D', 'C#', 'PHP', 'REST API', 'MySQL'],
    problem:
      'Form 5 biology students and researchers needed hands-on virtual lab simulations with persistent student progress and quiz scoring stored remotely.',
    solution:
      'Developed interactive 3D lab procedures, anatomy inspection modules, and quizzes in Unity, backed by PHP REST APIs and a MySQL database.',
    highlights: [
      'Combines interactive 3D apparatus simulation with PHP/MySQL account & results storage.',
      'Built for PhD educational research under Techies Inc freelance work.',
      'Includes full 60-second gameplay trailer and multi-module progression.',
    ],
    disclosureNote: 'Public on GitHub with client permission.',
    repoUrl: 'https://github.com/Azrinfreeman/Virtual-Lab',
    similarEstimateType: 'edtech-unity',
  },
  {
    id: 'mathfun-education',
    title: 'FunMath — Unity Lessons & Vuforia AR',
    tagline: 'Educational mathematics app combining interactive quizzes, minigames, and Vuforia image-target AR activities.',
    category: 'edtech',
    categoryLabel: 'EdTech, Unity & AR',
    durationBadge: 'Video Demo',
    posterUrl: '/media/posters/mathfun.webp',
    videoUrl: '/media/videos/mathfun-demo.mp4',
    stack: ['Unity', 'C#', 'Vuforia AR', 'Inno Setup'],
    problem:
      'Young learners often disengage from static math worksheets and benefit from tactile visual reinforcement.',
    solution:
      'Built a Unity mathematics app blending structured lessons, timed minigames, and camera-based Vuforia image-target augmented reality modules.',
    highlights: [
      'Blends traditional 2D quizzes with Vuforia AR markers for classroom demonstrations.',
      'Packaged with v1.0.0 release assets and Windows installer support.',
    ],
    repoUrl: 'https://github.com/Azrinfreeman/MathFunEducation',
    releaseUrl: 'https://github.com/Azrinfreeman/MathFunEducation/releases/tag/v1.0.0',
    releaseTag: 'v1.0.0',
    similarEstimateType: 'edtech-unity',
  },
  {
    id: 'monitor-remote',
    title: 'Monitor Remote — Phone PC Controller',
    tagline: 'Control a Windows screen, mouse, keyboard, and PC audio from any phone browser over local Wi-Fi.',
    category: 'tools',
    categoryLabel: 'AI Bots & Desktop Tools',
    posterUrl: '/media/posters/monitor-remote.webp',
    stack: ['C#', '.NET', 'ASP.NET Core', 'Windows Forms', 'WebSockets', 'JavaScript'],
    problem:
      'Controlling media playback, presentations, or desktop windows from across the room usually requires installing a dedicated mobile client or cloud remote tool.',
    solution:
      'Built a Windows tray host running an embedded ASP.NET Core + WebSocket server so any phone browser can pair via a six-digit code and view/control the chosen monitor.',
    highlights: [
      'Granular permissions for screen viewing, touch cursor/keyboard input, and PC audio volume.',
      'Session revocation and automated API, frontend, and launcher checks.',
      'Shipped v1.1.0 release binary on GitHub.',
    ],
    aiDirectedNote: 'Built by directing AI coding agents, then personally reviewed and verified with automated API and frontend checks.',
    repoUrl: 'https://github.com/Azrinfreeman/Monitor-Remote',
    releaseUrl: 'https://github.com/Azrinfreeman/Monitor-Remote/releases/tag/v1.1.0',
    releaseTag: 'v1.1.0',
    similarEstimateType: 'bot-tool',
  },
  {
    id: 'hujan',
    title: 'Hujan — Self-Hosted Discord AI Companion',
    tagline: 'Node.js/TypeScript Discord bot with OpenAI chat, ambient voice streaming, local Whisper summaries & Electron tray UI.',
    category: 'tools',
    categoryLabel: 'AI Bots & Desktop Tools',
    visualVariant: 'hujan',
    stack: ['Node.js', 'TypeScript', 'discord.js', 'OpenAI API', 'Whisper', 'Electron', 'SQLite'],
    problem:
      'Community servers wanted an AI companion that handles voice ambience and meeting summaries locally without leaking keys or recording without consent.',
    solution:
      'Packaged a discord.js + OpenAI bot inside an Electron Windows tray app with Windows DPAPI-protected credentials, an isolated AI worker process, and an owner-only local dashboard.',
    highlights: [
      'Streams ambient rain/sleep audio into voice channels and generates consent-gated local Whisper summaries.',
      'Bundles its own Node runtime and stores state cleanly in SQLite.',
      'Released through v0.3.4 on GitHub.',
    ],
    aiDirectedNote: 'Built by directing AI coding agents, then personally reviewed and tested across Windows runtime packaging.',
    repoUrl: 'https://github.com/Azrinfreeman/Hujan',
    releaseUrl: 'https://github.com/Azrinfreeman/Hujan/releases/tag/v0.3.4',
    releaseTag: 'v0.3.4',
    similarEstimateType: 'bot-tool',
  },
  {
    id: 'betternotes',
    title: 'BetterNotes — Offline-First Notes',
    tagline: 'Colorful Flutter sticky notes for Windows, web, and mobile with multi-window support and Supabase RLS sync.',
    category: 'mobile',
    categoryLabel: 'Mobile (Flutter)',
    visualVariant: 'betternotes',
    posterUrl: '/media/posters/betternotes-icon.webp',
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL RLS', 'Unit & Widget Tests'],
    problem:
      'Sticky-note apps either stay trapped on one desktop or lock your notes behind mandatory cloud subscriptions.',
    solution:
      'Developed an offline-first Flutter notes application with rich-text formatting, multi-window desktop windows, local backup/export, and optional Supabase PostgreSQL row-level security sync.',
    highlights: [
      'Includes Flutter unit and widget tests plus technical documentation.',
      'Published v1.1.3 Windows release alongside a dedicated web docs page.',
    ],
    repoUrl: 'https://github.com/Azrinfreeman/BetterNotes',
    releaseUrl: 'https://github.com/Azrinfreeman/BetterNotes/releases/tag/v1.1.3',
    releaseTag: 'v1.1.3',
    liveUrl: 'https://azrinfreeman.github.io/BetterNotes/',
    liveLabel: 'Project Page',
    similarEstimateType: 'flutter-app',
  },
  {
    id: 'appointly',
    title: 'Appointly — Schedule & Client Manager',
    tagline: 'Flutter appointment manager with recurring schedules, client records, local reminders, and JSON backup.',
    category: 'mobile',
    categoryLabel: 'Mobile (Flutter)',
    visualVariant: 'appointly',
    stack: ['Flutter', 'Dart', 'Local Reminders', 'JSON Backup'],
    problem:
      'Independent clinics, tutors, and small service businesses need simple recurring scheduling without paying per-seat SaaS subscriptions.',
    solution:
      'Built a fast Flutter booking manager supporting recurring appointments, per-client views, local notifications, and portable JSON export/import.',
    highlights: [
      'Ideal foundation for SME booking apps or Laravel-synced clinic schedules.',
      'Clean offline-capable architecture ready to extend with REST APIs.',
    ],
    repoUrl: 'https://github.com/Azrinfreeman/Appointly',
    similarEstimateType: 'flutter-app',
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
    items: ['Flutter', 'Dart', 'JavaScript', 'HTML / CSS', 'Play Store & App Store Publishing', 'Next.js / React / TypeScript*'],
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
