const _env: Record<string, string | undefined> = (globalThis as any).process?.env ?? (globalThis as any).__env ?? {};

export const E2E_USERNAME: string = _env.E2E_USERNAME ?? 'standard_user';
export const E2E_PASSWORD: string = _env.E2E_PASSWORD ?? 'secret_sauce';
