import type { EstimatorProjectType, ProjectCategory, ProjectItem } from '../types';

export interface ProjectOverride extends Partial<ProjectItem> {
  repoName: string;
}

export const CATEGORY_LABELS: Record<Exclude<ProjectCategory, 'all'>, string> = {
  mobile: 'Mobile (Flutter)',
  backend: 'Backend & Stripe',
  edtech: 'EdTech, Unity & AR',
  tools: 'AI Bots, Web & Desktop',
};

export const SIMILAR_ESTIMATE_BY_CATEGORY: Record<
  Exclude<ProjectCategory, 'all'>,
  EstimatorProjectType
> = {
  mobile: 'flutter-app',
  backend: 'api-stripe',
  edtech: 'edtech-unity',
  tools: 'bot-tool',
};

export const PINNED_REPO_ORDER: string[] = [
  'evergreen-ai-virtual-lab',
  'talentlink-job-portal-demo',
  'unity-subscription-unlock',
  'hopboard',
  'hzswitcher',
  'virtual-lab',
  'mathfuneducation',
  'monitor-remote',
  'hujan',
  'betternotes',
  'appointly',
  'graduation-flower-card',
];

export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  'evergreen-ai-virtual-lab': {
    repoName: 'evergreen-ai-virtual-lab',
    id: 'evergreen-ai-virtual-lab',
    title: 'Evergreen STEM Virtual AI Lab',
    tagline:
      'Malay-language 2D science lab in Unity 6 with drag-and-drop experiments and an OpenAI guardrail tutor.',
    category: 'edtech',
    featuredInReel: true,
    reelLabel: 'Evergreen AI Lab',
    durationBadge: 'Video Teaser',
    posterUrl: '/media/posters/evergreen.webp',
    loopVideoUrl: '/media/videos/evergreen-loop.mp4',
    videoUrl: '/media/videos/evergreen-demo.mp4',
    liveUrl: 'https://azrinfreeman.github.io/evergreen-ai-virtual-lab/',
    liveLabel: 'Play Web Demo',
    embedType: 'unity',
    mobileOk: false,
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
    aiDirectedNote:
      'Unity MCP, Claude Code, and OpenAI Codex were used to inspect scenes and polish uGUI interfaces, with all changes personally reviewed and tested.',
    similarEstimateType: 'edtech-unity',
  },
  'talentlink-job-portal-demo': {
    repoName: 'talentlink-job-portal-demo',
    id: 'talentlink-job-portal-demo',
    title: 'TalentLink Job & Talent Portal',
    tagline:
      'Offline Flutter job and talent management showcase with role-specific flows and responsive dashboards.',
    category: 'mobile',
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
    similarEstimateType: 'flutter-app',
  },
  'unity-subscription-unlock': {
    repoName: 'Unity-Subscription-Unlock',
    id: 'unity-subscription-unlock',
    title: 'Stripe Subscription Unlock for Unity',
    tagline:
      'PHP REST API + MySQL + Stripe subscription verification template unlocking bundled Unity content.',
    category: 'backend',
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
    disclosureNote:
      'Tested working prototype & reusable template — verified in testing, not launched to live end-users.',
    similarEstimateType: 'api-stripe',
  },
  hopboard: {
    repoName: 'hopboard',
    id: 'hopboard',
    title: 'Hopboard — Encrypted Wi-Fi Clipboard',
    tagline:
      'Cross-platform Flutter utility sharing clipboard text between your devices over local Wi-Fi without cloud accounts.',
    category: 'mobile',
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
      'Published Windows release build with documentation.',
    ],
    similarEstimateType: 'flutter-app',
  },
  hzswitcher: {
    repoName: 'HzSwitcher',
    id: 'hzswitcher',
    title: 'HzSwitcher — Display & Refresh Utility',
    tagline:
      'Windows 10/11 tray app for switching monitor refresh rates and brightness with per-app profiles and automation.',
    category: 'tools',
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
      'Built with AI coding agents, then personally reviewed, tested, and shipped.',
    ],
    aiDirectedNote:
      'Built by directing AI coding agents, then personally reviewed and verified with xUnit tests and Windows installer testing.',
    similarEstimateType: 'bot-tool',
  },
  'virtual-lab': {
    repoName: 'Virtual-Lab',
    id: 'virtual-lab',
    title: 'Virtual Biology Lab (Form 5)',
    tagline:
      'Unity 3D interactive biology laboratory connected to PHP REST APIs and MySQL for guided school experiments.',
    category: 'edtech',
    durationBadge: '60s Video',
    posterUrl: '/media/posters/virtual-lab.webp',
    videoUrl: '/media/videos/virtual-lab-demo.mp4',
    liveUrl: 'https://azrinfreeman.github.io/Virtual-Lab/',
    liveLabel: 'Play Web Demo',
    embedType: 'unity',
    mobileOk: false,
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
    similarEstimateType: 'edtech-unity',
  },
  mathfuneducation: {
    repoName: 'MathFunEducation',
    id: 'mathfun-education',
    title: 'FunMath — Unity Lessons & Vuforia AR',
    tagline:
      'Educational mathematics app combining interactive quizzes, minigames, and Vuforia image-target AR activities.',
    category: 'edtech',
    durationBadge: 'Video Demo',
    posterUrl: '/media/posters/mathfun.webp',
    videoUrl: '/media/videos/mathfun-demo.mp4',
    liveUrl: 'https://azrinfreeman.github.io/MathFunEducation/',
    liveLabel: 'Play Web Demo',
    embedType: 'unity',
    mobileOk: false,
    stack: ['Unity', 'C#', 'Vuforia AR', 'Inno Setup'],
    problem:
      'Young learners often disengage from static math worksheets and benefit from tactile visual reinforcement.',
    solution:
      'Built a Unity mathematics app blending structured lessons, timed minigames, and camera-based Vuforia image-target augmented reality modules.',
    highlights: [
      'Blends traditional 2D quizzes with Vuforia AR markers for classroom demonstrations.',
      'Packaged with release assets and Windows installer support.',
    ],
    similarEstimateType: 'edtech-unity',
  },
  'monitor-remote': {
    repoName: 'Monitor-Remote',
    id: 'monitor-remote',
    title: 'Monitor Remote — Phone PC Controller',
    tagline:
      'Control a Windows screen, mouse, keyboard, and PC audio from any phone browser over local Wi-Fi.',
    category: 'tools',
    posterUrl: '/media/posters/monitor-remote.webp',
    stack: ['C#', '.NET', 'ASP.NET Core', 'Windows Forms', 'WebSockets', 'JavaScript'],
    problem:
      'Controlling media playback, presentations, or desktop windows from across the room usually requires installing a dedicated mobile client or cloud remote tool.',
    solution:
      'Built a Windows tray host running an embedded ASP.NET Core + WebSocket server so any phone browser can pair via a six-digit code and view/control the chosen monitor.',
    highlights: [
      'Granular permissions for screen viewing, touch cursor/keyboard input, and PC audio volume.',
      'Session revocation and automated API, frontend, and launcher checks.',
      'Shipped release binary on GitHub.',
    ],
    aiDirectedNote:
      'Built by directing AI coding agents, then personally reviewed and verified with automated API and frontend checks.',
    similarEstimateType: 'bot-tool',
  },
  hujan: {
    repoName: 'Hujan',
    id: 'hujan',
    title: 'Hujan — Self-Hosted Discord AI Companion',
    tagline:
      'Node.js/TypeScript Discord bot with OpenAI chat, ambient voice streaming, local Whisper summaries & Electron tray UI.',
    category: 'tools',
    visualVariant: 'hujan',
    stack: ['Node.js', 'TypeScript', 'discord.js', 'OpenAI API', 'Whisper', 'Electron', 'SQLite'],
    problem:
      'Community servers wanted an AI companion that handles voice ambience and meeting summaries locally without leaking keys or recording without consent.',
    solution:
      'Packaged a discord.js + OpenAI bot inside an Electron Windows tray app with Windows DPAPI-protected credentials, an isolated AI worker process, and an owner-only local dashboard.',
    highlights: [
      'Streams ambient rain/sleep audio into voice channels and generates consent-gated local Whisper summaries.',
      'Bundles its own Node runtime and stores state cleanly in SQLite.',
      'Published Windows release on GitHub.',
    ],
    aiDirectedNote:
      'Built by directing AI coding agents, then personally reviewed and tested across Windows runtime packaging.',
    similarEstimateType: 'bot-tool',
  },
  betternotes: {
    repoName: 'BetterNotes',
    id: 'betternotes',
    title: 'BetterNotes — Offline-First Notes',
    tagline:
      'Colorful Flutter sticky notes for Windows, web, and mobile with multi-window support and Supabase RLS sync.',
    category: 'mobile',
    visualVariant: 'betternotes',
    posterUrl: '/media/posters/betternotes-icon.webp',
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL RLS', 'Unit & Widget Tests'],
    problem:
      'Sticky-note apps either stay trapped on one desktop or lock your notes behind mandatory cloud subscriptions.',
    solution:
      'Developed an offline-first Flutter notes application with rich-text formatting, multi-window desktop windows, local backup/export, and optional Supabase PostgreSQL row-level security sync.',
    highlights: [
      'Includes Flutter unit and widget tests plus technical documentation.',
      'Published Windows release alongside a dedicated web docs page.',
    ],
    liveUrl: 'https://azrinfreeman.github.io/BetterNotes/',
    liveLabel: 'Project Page',
    similarEstimateType: 'flutter-app',
  },
  appointly: {
    repoName: 'Appointly',
    id: 'appointly',
    title: 'Appointly — Schedule & Client Manager',
    tagline:
      'Flutter appointment manager with recurring schedules, client records, local reminders, and JSON backup.',
    category: 'mobile',
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
    similarEstimateType: 'flutter-app',
  },
  'graduation-flower-card': {
    repoName: 'graduation-flower-card',
    id: 'graduation-flower-card',
    title: 'Graduation Flower Card — Interactive Web App',
    tagline:
      'Customizable interactive graduation web experience with playful quiz, typewriter letter, audio controls & 8 procedural 3D/2D/SVG flower bouquets.',
    category: 'tools',
    stack: ['JavaScript', 'HTML5 / CSS3', '3D / SVG Animation', 'Web Audio'],
    problem:
      'Digital greeting cards are often static templates or locked behind ad-heavy platforms that are difficult to personalize and host independently.',
    solution:
      'Built a zero-dependency interactive web application in vanilla HTML, CSS, and JavaScript featuring a playful two-question quiz, confetti reveal, typewriter message, CC0 sound effects, and 8 switchable procedural 3D/2D/SVG flower bouquets.',
    highlights: [
      'Eight code-drawn 3D, 2D, and SVG flower bouquets with zero external image dependencies.',
      'Eight CC0 sound-effect clips and optional background music with fade-in and volume controls.',
      'Responsive layout verified from 320px mobile screens to wide desktop viewports.',
    ],
    aiDirectedNote:
      'Built by directing AI coding agents, then personally reviewed and verified across mobile and desktop viewports.',
    liveUrl: 'https://azrinfreeman.github.io/graduation-flower-card/',
    embedType: 'web',
    liveLabel: 'Live Web Demo',
    similarEstimateType: 'web-laravel',
  },
};
