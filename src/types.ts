export type ThemeMode = 'dark' | 'light';

export type AudienceMode = 'client' | 'researcher' | 'recruiter';

export type ProjectCategory = 'all' | 'mobile' | 'backend' | 'edtech' | 'tools';

export type Currency = 'RM' | 'USD';

export type EstimatorProjectType =
  | 'api-stripe'
  | 'store-publish'
  | 'flutter-app'
  | 'edtech-unity'
  | 'web-laravel'
  | 'bot-tool';

export type EstimatorTier = 'quick' | 'mvp' | 'full';

export type DesignReadiness = 'ready-specs' | 'need-prototype';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  featuredInReel?: boolean;
  reelLabel?: string;
  durationBadge?: string;
  posterUrl?: string;
  loopVideoUrl?: string;
  videoUrl?: string;
  gallery?: { src: string; caption: string }[];
  visualVariant?: 'hujan' | 'betternotes' | 'appointly';
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
  similarEstimateType: EstimatorProjectType;
  aiDirectedNote?: string;
}

export interface AudiencePreset {
  id: AudienceMode;
  label: string;
  eyebrow: string;
  headline: string;
  subcopy: string;
  primaryCtaLabel: string;
  primaryCtaAction: 'estimate' | 'edtech' | 'resume';
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  highlightPoints: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  starterRm: number;
  starterUsd: number;
  turnaround: string;
  deliverables: string[];
  estimateType: EstimatorProjectType;
}

export interface EstimatorOption {
  id: EstimatorProjectType;
  label: string;
  shortLabel: string;
  description: string;
  tiers: Record<
    EstimatorTier,
    {
      rmMin: number;
      rmMax: number;
      usdMin: number;
      usdMax: number;
      timeline: string;
      deliverableHint: string;
    }
  >;
}
