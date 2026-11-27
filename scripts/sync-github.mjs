import { execFileSync, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SYNC_MEDIA_DIR = path.join(PUBLIC_DIR, 'media', 'synced');
const TMP_DIR = path.join(ROOT, '.tmp-media');
const OUT_JSON = path.join(ROOT, 'src', 'data', 'generated-projects.json');
const CACHE_FILE = path.join(SYNC_MEDIA_DIR, '.sync-cache.json');

const GITHUB_USER = 'Azrinfreeman';
const SKIP_REPOS = new Set(['azrinfreeman.github.io', 'azrinfreeman']);

// Known already-bundled media in public/media/posters & public/media/videos
const BUNDLED_MEDIA = {
  'evergreen-ai-virtual-lab': {
    posterUrl: '/media/posters/evergreen.webp',
    loopVideoUrl: '/media/videos/evergreen-loop.mp4',
    videoUrl: '/media/videos/evergreen-demo.mp4',
    durationBadge: 'Video Teaser',
  },
  'talentlink-job-portal-demo': {
    posterUrl: '/media/posters/talentlink.webp',
    videoUrl: '/media/videos/talentlink-demo.mp4',
    durationBadge: '40s Video',
  },
  'unity-subscription-unlock': {
    posterUrl: '/media/posters/stripe-unity.webp',
    videoUrl: '/media/videos/stripe-unity-demo.mp4',
    durationBadge: '60s Video',
  },
  hopboard: {
    posterUrl: '/media/posters/hopboard.webp',
    videoUrl: '/media/videos/hopboard-demo.mp4',
    durationBadge: 'Video + 3 Shots',
    gallery: [
      { src: '/media/posters/hopboard.webp', caption: 'Hopboard main Windows & mobile pairing overview' },
      { src: '/media/posters/hopboard-copy.webp', caption: 'Instant copy-and-paste transfer across local devices' },
      { src: '/media/posters/hopboard-phone.webp', caption: 'Android mobile client receiving synced clipboard items' },
    ],
  },
  hzswitcher: {
    posterUrl: '/media/posters/hzswitcher.webp',
    videoUrl: '/media/videos/hzswitcher-demo.mp4',
    durationBadge: '55s Video',
  },
  'virtual-lab': {
    posterUrl: '/media/posters/virtual-lab.webp',
    videoUrl: '/media/videos/virtual-lab-demo.mp4',
    durationBadge: '60s Video',
    gallery: [
      { src: '/media/posters/virtual-lab.webp', caption: 'Guided 3D virtual biology lab experiment scene' },
      { src: '/media/posters/virtual-lab-menu.webp', caption: 'Module selection and interactive lesson menu' },
      { src: '/media/posters/virtual-lab-anatomy.webp', caption: 'Interactive anatomy inspection and nutrition quiz' },
    ],
  },
  mathfuneducation: {
    posterUrl: '/media/posters/mathfun.webp',
    videoUrl: '/media/videos/mathfun-demo.mp4',
    durationBadge: 'Video Demo',
  },
  'monitor-remote': {
    posterUrl: '/media/posters/monitor-remote.webp',
  },
  betternotes: {
    posterUrl: '/media/posters/betternotes-icon.webp',
  },
};

const BANNED_PATTERNS = [
  /navigation app|offline maps?/gi,
  /laid off|lay-?off|retrench|let go|made redundant|redundan|business decision|role (has )?ended|position (was )?(cut|eliminated)/gi,
  /registered (business|company|freelanc)|my (own )?(company|business|firm|agency)\b|founder|co-?founder/gi,
  /\breact native\b/gi,
  /\bdevops\b|\bmlops\b|\bsre\b|site reliability|fine-?tun(e|ed|ing)|\bRAG\b|retrieval-augmented|cloud architect|kubernetes|\bk8s\b|terraform/gi,
  /\b(led|managed|headed) (a|the) team\b|team lead|tech lead|\bexpert in\b|\bguru\b|\bninja\b|world-class/gi,
];

function sanitizeText(text) {
  if (!text) return '';
  let out = String(text).trim();
  for (const pat of BANNED_PATTERNS) {
    out = out.replace(pat, '');
  }
  return out.replace(/\s{2,}/g, ' ').trim();
}

function getGithubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN.trim();
  try {
    return execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const TOKEN = getGithubToken();

async function ghFetchJson(url) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'azrinfreeman-portfolio-sync',
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} on ${url}`);
  }
  return res.json();
}

async function downloadBinary(url, destPath, maxBytes = 45 * 1024 * 1024) {
  const headers = { 'User-Agent': 'azrinfreeman-portfolio-sync' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return false;
  const len = Number(res.headers.get('content-length') || 0);
  if (len > maxBytes) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 400 || buf.length > maxBytes) return false;
  // Skip Git LFS text pointers
  const headStr = buf.subarray(0, 60).toString('utf8');
  if (headStr.startsWith('version https://git-lfs.github.com')) return false;
  fs.writeFileSync(destPath, buf);
  return true;
}

function humanizeName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function inferCategory(repo) {
  const topics = (repo.topics || []).map((t) => t.toLowerCase());
  if (topics.includes('portfolio-mobile')) return 'mobile';
  if (topics.includes('portfolio-backend')) return 'backend';
  if (topics.includes('portfolio-edtech')) return 'edtech';
  if (topics.includes('portfolio-tools')) return 'tools';

  const lang = (repo.language || '').toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  if (lang === 'dart' || topics.includes('flutter') || desc.includes('flutter')) return 'mobile';
  if (lang === 'php' || topics.includes('laravel') || topics.includes('stripe') || desc.includes('stripe')) {
    return 'backend';
  }
  if (
    topics.includes('edtech') ||
    topics.includes('unity') ||
    desc.includes('unity') ||
    desc.includes('learning') ||
    desc.includes('science') ||
    desc.includes('math')
  ) {
    return 'edtech';
  }
  return 'tools';
}

function extractFromReadme(markdown, repo, defaultBranch) {
  if (!markdown) {
    return { firstParagraph: '', bullets: [], images: [], videos: [] };
  }

  const images = [];
  const videos = [];

  const resolveMediaUrl = (rawRef) => {
    const clean = rawRef.trim().replace(/^<|>$/g, '').split(/\s+/)[0];
    if (!clean || clean.includes('img.shields.io') || clean.includes('badge')) return null;
    if (/^https?:\/\//i.test(clean)) {
      return clean
        .replace(
          /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(?:refs\/heads\/)?([^/]+)\/(.+)$/i,
          'https://raw.githubusercontent.com/$1/$2/$3/$4'
        );
    }
    const rel = clean.replace(/^\.?\//, '');
    if (rel.startsWith('..')) return null;
    return `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/${defaultBranch}/${rel}`;
  };

  for (const m of markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
    const u = resolveMediaUrl(m[1]);
    if (u && /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(u)) images.push(u);
    if (u && /\.(mp4|webm)(\?.*)?$/i.test(u)) videos.push(u);
  }
  for (const m of markdown.matchAll(/src=["']([^"']+\.(?:png|jpe?g|webp|gif|mp4|webm))["']/gi)) {
    const u = resolveMediaUrl(m[1]);
    if (u && /\.(png|jpe?g|webp|gif)$/i.test(u)) images.push(u);
    if (u && /\.(mp4|webm)$/i.test(u)) videos.push(u);
  }
  for (const m of markdown.matchAll(/(?:https?:\/\/[^\s"'()<>]+|[A-Za-z0-9_./-]+\.(?:mp4|webm))/gi)) {
    if (/\.(mp4|webm)$/i.test(m[0])) {
      const u = resolveMediaUrl(m[0]);
      if (u) videos.push(u);
    }
  }

  const lines = markdown.split(/\r?\n/);
  const paragraphs = [];
  const bullets = [];
  let inCode = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode || !line) continue;
    if (line.startsWith('#') || line.startsWith('![') || line.startsWith('<') || line.startsWith('|')) {
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const b = sanitizeText(
        line
          .replace(/^[-*]\s+/, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/[*_`]/g, '')
      );
      if (b.length >= 20 && b.length <= 180) bullets.push(b);
      continue;
    }
    const cleanP = sanitizeText(
      line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '')
    );
    if (cleanP.length >= 35 && !cleanP.toLowerCase().startsWith('http')) {
      paragraphs.push(cleanP);
    }
  }

  return {
    firstParagraph: paragraphs[0] || '',
    secondParagraph: paragraphs[1] || '',
    bullets: Array.from(new Set(bullets)).slice(0, 3),
    images: Array.from(new Set(images)),
    videos: Array.from(new Set(videos)),
  };
}

async function discoverMediaFromTree(repo, defaultBranch) {
  const treeData = await ghFetchJson(
    `https://api.github.com/repos/${GITHUB_USER}/${repo.name}/git/trees/${defaultBranch}?recursive=1`
  ).catch(() => null);
  if (!treeData || !Array.isArray(treeData.tree)) return { images: [], videos: [] };

  const folderRe = /^(docs|media|teaser|trailer|output|screenshots|Deliverables)\//i;
  const images = [];
  const videos = [];

  for (const node of treeData.tree) {
    if (node.type !== 'blob' || !folderRe.test(node.path)) continue;
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/${defaultBranch}/${node.path}`;
    if (/\.(png|jpe?g|webp)$/i.test(node.path) && (node.size || 0) < 15 * 1024 * 1024) {
      images.push(rawUrl);
    } else if (/\.(mp4|webm)$/i.test(node.path) && (node.size || 0) < 45 * 1024 * 1024) {
      videos.push(rawUrl);
    }
  }
  return { images, videos };
}

function convertToWebp(inFile, outFile) {
  execFileSync(
    'ffmpeg',
    ['-y', '-i', inFile, '-vf', "scale='min(1280,iw)':-2", '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', outFile],
    { stdio: 'ignore' }
  );
  return fs.existsSync(outFile) && fs.statSync(outFile).size > 300;
}

function convertToMp4(inFile, outFile, mute = false) {
  const args = [
    '-y',
    '-i',
    inFile,
    '-vf',
    "scale='min(1280,iw)':-2",
    '-c:v',
    'libx264',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '28',
    '-preset',
    'medium',
    '-movflags',
    '+faststart',
  ];
  if (mute) {
    args.push('-an');
  } else {
    args.push('-c:a', 'aac', '-b:a', '96k');
  }
  args.push(outFile);
  execFileSync('ffmpeg', args, { stdio: 'ignore' });
  return fs.existsSync(outFile) && fs.statSync(outFile).size > 1000;
}

async function syncMediaForNewRepo(slug, repo, readmeData, cache) {
  const cacheKey = `${repo.name}@${repo.pushed_at}`;
  const cached = cache[slug];
  if (
    cached &&
    cached.key === cacheKey &&
    (!cached.posterUrl || fs.existsSync(path.join(PUBLIC_DIR, cached.posterUrl))) &&
    (!cached.videoUrl || fs.existsSync(path.join(PUBLIC_DIR, cached.videoUrl)))
  ) {
    return cached;
  }

  fs.mkdirSync(SYNC_MEDIA_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  let posterUrl;
  let videoUrl;
  let loopVideoUrl;
  const gallery = [];

  for (let i = 0; i < Math.min(readmeData.images.length, 3); i++) {
    const imgUrl = readmeData.images[i];
    const ext = path.extname(new URL(imgUrl).pathname) || '.png';
    const rawFile = path.join(TMP_DIR, `${slug}-img-${i}${ext}`);
    const outName = i === 0 ? `${slug}-poster.webp` : `${slug}-shot-${i + 1}.webp`;
    const outFile = path.join(SYNC_MEDIA_DIR, outName);
    if (await downloadBinary(imgUrl, rawFile, 15 * 1024 * 1024)) {
      try {
        if (convertToWebp(rawFile, outFile)) {
          const publicUrl = `/media/synced/${outName}`;
          if (!posterUrl) posterUrl = publicUrl;
          gallery.push({ src: publicUrl, caption: `${humanizeName(repo.name)} screenshot ${i + 1}` });
        }
      } catch {
        // skip unconvertible image
      }
    }
  }

  const loopCand = readmeData.videos.find((v) => /loop/i.test(v));
  const mainVideoCand =
    readmeData.videos.find((v) => /trailer|teaser|demo/i.test(v) && !/loop/i.test(v)) ||
    readmeData.videos.find((v) => !/loop/i.test(v));

  if (loopCand) {
    const rawLoop = path.join(TMP_DIR, `${slug}-loop.mp4`);
    const outLoopName = `${slug}-loop.mp4`;
    const outLoop = path.join(SYNC_MEDIA_DIR, outLoopName);
    if (await downloadBinary(loopCand, rawLoop, 15 * 1024 * 1024)) {
      try {
        if (convertToMp4(rawLoop, outLoop, true)) {
          loopVideoUrl = `/media/synced/${outLoopName}`;
        }
      } catch {
        // ignore
      }
    }
  }

  if (mainVideoCand) {
    const rawVid = path.join(TMP_DIR, `${slug}-demo.mp4`);
    const outVidName = `${slug}-demo.mp4`;
    const outVid = path.join(SYNC_MEDIA_DIR, outVidName);
    if (await downloadBinary(mainVideoCand, rawVid, 45 * 1024 * 1024)) {
      try {
        if (convertToMp4(rawVid, outVid, false)) {
          videoUrl = `/media/synced/${outVidName}`;
        }
      } catch {
        // ignore
      }
    }
  }

  const entry = {
    key: cacheKey,
    posterUrl,
    videoUrl,
    loopVideoUrl,
    gallery: gallery.length > 1 ? gallery : undefined,
    durationBadge: videoUrl ? 'Video Demo' : gallery.length > 1 ? `${gallery.length} Shots` : undefined,
  };
  cache[slug] = entry;
  return entry;
}

async function main() {
  console.log('Syncing portfolio repositories from GitHub...');
  let repos;
  try {
    repos = await ghFetchJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=updated`);
  } catch (err) {
    if (fs.existsSync(OUT_JSON)) {
      console.warn(`Warning: GitHub API unreachable (${err.message}). Keeping existing generated-projects.json.`);
      return;
    }
    throw err;
  }

  const portfolioRepos = (repos || []).filter((r) => {
    if (r.private || r.fork) return false;
    if (SKIP_REPOS.has(r.name.toLowerCase())) return false;
    const topics = (r.topics || []).map((t) => t.toLowerCase());
    return topics.includes('portfolio');
  });

  if (portfolioRepos.length === 0) {
    console.warn('Warning: 0 portfolio-tagged repos returned. Keeping existing generated-projects.json.');
    return;
  }

  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } catch {
      cache = {};
    }
  }

  const results = [];

  for (const repo of portfolioRepos) {
    const key = repo.name.toLowerCase();
    const slug = key.replace(/[^a-z0-9-]+/g, '-');
    const defaultBranch = repo.default_branch || 'main';

    const [releaseData, readmeMeta, repoConfigMeta] = await Promise.all([
      ghFetchJson(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/releases/latest`).catch(() => null),
      ghFetchJson(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/readme`).catch(() => null),
      ghFetchJson(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/contents/portfolio.json`).catch(() => null),
    ]);

    let repoConfig = {};
    if (repoConfigMeta && repoConfigMeta.content) {
      try {
        repoConfig = JSON.parse(Buffer.from(repoConfigMeta.content, 'base64').toString('utf8'));
      } catch {
        repoConfig = {};
      }
    }

    const readmeMd =
      readmeMeta && readmeMeta.content
        ? Buffer.from(readmeMeta.content, 'base64').toString('utf8')
        : '';
    const readmeExtracted = extractFromReadme(readmeMd, repo, defaultBranch);

    const bundled = BUNDLED_MEDIA[key];
    const hasPostSnapshotUpdate = repo.pushed_at && repo.pushed_at > '2026-11-28T00:00:00Z';
    const bundledValid =
      bundled &&
      !hasPostSnapshotUpdate &&
      (!bundled.posterUrl || fs.existsSync(path.join(PUBLIC_DIR, bundled.posterUrl))) &&
      (!bundled.videoUrl || fs.existsSync(path.join(PUBLIC_DIR, bundled.videoUrl)));

    if (!bundledValid && readmeExtracted.images.length === 0 && readmeExtracted.videos.length === 0) {
      const treeMedia = await discoverMediaFromTree(repo, defaultBranch);
      readmeExtracted.images.push(...treeMedia.images);
      readmeExtracted.videos.push(...treeMedia.videos);
    }

    let mediaInfo = bundledValid ? bundled : {};
    if (!bundledValid && (readmeExtracted.images.length > 0 || readmeExtracted.videos.length > 0)) {
      mediaInfo = await syncMediaForNewRepo(slug, repo, readmeExtracted, cache);
    }

    const category = repoConfig.category || inferCategory(repo);
    const topicsClean = (repo.topics || [])
      .filter((t) => !t.toLowerCase().startsWith('portfolio'))
      .map((t) => humanizeName(t));

    const stack = Array.from(
      new Set([
        ...(Array.isArray(repoConfig.stack) ? repoConfig.stack : []),
        ...(repo.language ? [repo.language] : []),
        ...topicsClean,
      ])
    ).slice(0, 7);

    const tagline = sanitizeText(
      repoConfig.tagline ||
        repo.description ||
        readmeExtracted.firstParagraph ||
        `Public ${repo.language || 'software'} project by Azrin Amran.`
    );

    const problem = sanitizeText(
      repoConfig.problem ||
        readmeExtracted.firstParagraph ||
        `Built to solve practical workflow needs with ${stack.slice(0, 3).join(', ') || 'clean engineering'}.`
    );

    const solution = sanitizeText(
      repoConfig.solution ||
        readmeExtracted.secondParagraph ||
        tagline
    );

    const highlights =
      Array.isArray(repoConfig.highlights) && repoConfig.highlights.length > 0
        ? repoConfig.highlights.map(sanitizeText)
        : readmeExtracted.bullets.length > 0
          ? readmeExtracted.bullets
          : [
              `Public GitHub repository written primarily in ${repo.language || 'modern web/app technologies'}.`,
              releaseData?.tag_name
                ? `Published GitHub release ${releaseData.tag_name} with downloadable build assets.`
                : 'Includes source code and documentation on GitHub.',
            ];

    results.push({
      repoKey: key,
      repoName: repo.name,
      id: slug,
      title: sanitizeText(repoConfig.title || humanizeName(repo.name)),
      tagline,
      category,
      featuredInReel: Boolean(
        repoConfig.featuredInReel ?? (repo.topics || []).map((t) => t.toLowerCase()).includes('portfolio-featured')
      ),
      durationBadge: mediaInfo.durationBadge,
      posterUrl: mediaInfo.posterUrl,
      loopVideoUrl: mediaInfo.loopVideoUrl,
      videoUrl: mediaInfo.videoUrl,
      gallery: mediaInfo.gallery,
      stack: stack.length > 0 ? stack : ['Software Engineering'],
      problem,
      solution,
      highlights,
      disclosureNote: repoConfig.disclosureNote ? sanitizeText(repoConfig.disclosureNote) : undefined,
      repoUrl: repo.html_url,
      releaseUrl: releaseData?.html_url || undefined,
      releaseTag: releaseData?.tag_name || undefined,
      liveUrl: repoConfig.liveUrl || (repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : undefined),
      liveLabel: repoConfig.liveLabel || undefined,
      primaryLanguage: repo.language || undefined,
      updatedAt: repo.pushed_at || undefined,
    });
  }

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(results, null, 2) + '\n', 'utf8');

  if (Object.keys(cache).length > 0) {
    fs.mkdirSync(SYNC_MEDIA_DIR, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n', 'utf8');
  }
  fs.rmSync(TMP_DIR, { recursive: true, force: true });

  console.log(`Synced ${results.length} portfolio repositories -> src/data/generated-projects.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
