const _env: Record<string, string | undefined> = (globalThis as any).process?.env ?? (globalThis as any).__env ?? {};

export const E2E_BASE_URL: string = _env.E2E_BASE_URL ?? 'https://www.saucedemo.com';
