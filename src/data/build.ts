import { execFileSync } from 'node:child_process';

/** The repository the footer's commit link points at */
const repo = 'https://github.com/Lyfe4/cal_web';

/** Netlify sets COMMIT_REF; locally, ask git. Undefined without either. */
const commitRef = (): string | undefined => {
  if (process.env.COMMIT_REF) return process.env.COMMIT_REF;
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() || undefined;
  } catch {
    return undefined;
  }
};

const sha = commitRef();

/** Facts about this build, for the footer. Evaluated once per build, so every page agrees. */
export const build = {
  at: new Date(),
  commit: sha ? { short: sha.slice(0, 7), href: `${repo}/commit/${sha}` } : undefined,
};

/** "1 Nov 2026, 2:04 pm AEDT": the build time where the business is, whatever the server's zone */
export const formatBuildTime = (date: Date): string =>
  new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Australia/Sydney',
    timeZoneName: 'short',
  }).format(date);
