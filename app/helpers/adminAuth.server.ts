import { createCookie } from '@remix-run/node';
import { createHash, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'cpc_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const MAX_FAILED_ATTEMPTS = 8;
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;

export type PasscodeCheck = 'ok' | 'invalid' | 'not-configured';

function passcodeDigest(passcode: string) {
  return createHash('sha256').update(passcode).digest();
}

// The cookie carries a fingerprint of the passcode that minted it, so rotating
// ADMIN_PASSCODE invalidates every session already handed out.
function passcodeFingerprint(passcode: string) {
  return passcodeDigest(passcode).toString('hex');
}

let cachedCookie: ReturnType<typeof createCookie> | null = null;
let cachedSecret: string | null = null;

// Same lazy read as db.server: Remix's server build imports every route module
// eagerly, so touching these env vars at module scope would make a missing
// ADMIN_PASSCODE a problem for the whole app instead of just this route.
function getSessionCookie() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSCODE || '';
  if (!cachedCookie || cachedSecret !== secret) {
    cachedSecret = secret;
    cachedCookie = createCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/admin',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE_SECONDS,
      secrets: [secret],
    });
  }
  return cachedCookie;
}

export function isAdminPasscodeConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSCODE);
}

export function verifyAdminPasscode(candidate: string): PasscodeCheck {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    return 'not-configured';
  }
  // Comparing fixed-length digests instead of the raw strings keeps timingSafeEqual
  // from throwing on a length mismatch and stops the response time from leaking
  // either the passcode's length or how many characters were guessed right.
  return timingSafeEqual(passcodeDigest(candidate), passcodeDigest(expected)) ? 'ok' : 'invalid';
}

export async function isAdminAuthenticated(request: Request): Promise<boolean> {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    return false;
  }
  const parsed = await getSessionCookie().parse(request.headers.get('cookie'));
  return typeof parsed?.passcode === 'string' && parsed.passcode === passcodeFingerprint(expected);
}

export async function createAdminSessionCookie(): Promise<string> {
  return getSessionCookie().serialize({ passcode: passcodeFingerprint(process.env.ADMIN_PASSCODE || '') });
}

export async function destroyAdminSessionCookie(): Promise<string> {
  return getSessionCookie().serialize('', { maxAge: 0 });
}

// A passcode is short enough to brute force, so failed attempts are throttled per
// client. This lives in process memory: it resets on deploy and isn't shared across
// instances, which is enough friction for a single-container admin page.
const failedAttempts = new Map<string, { count: number; firstAt: number }>();

export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function isRateLimited(clientKey: string): boolean {
  const entry = failedAttempts.get(clientKey);
  if (!entry) {
    return false;
  }
  if (Date.now() - entry.firstAt > ATTEMPT_WINDOW_MS) {
    failedAttempts.delete(clientKey);
    return false;
  }
  return entry.count >= MAX_FAILED_ATTEMPTS;
}

export function registerFailedAttempt(clientKey: string): void {
  const now = Date.now();
  for (const [key, entry] of failedAttempts) {
    if (now - entry.firstAt > ATTEMPT_WINDOW_MS) {
      failedAttempts.delete(key);
    }
  }
  const entry = failedAttempts.get(clientKey);
  if (entry) {
    entry.count += 1;
  } else {
    failedAttempts.set(clientKey, { count: 1, firstAt: now });
  }
}

export function clearFailedAttempts(clientKey: string): void {
  failedAttempts.delete(clientKey);
}
