import { APIResponse } from '@playwright/test';

export class HttpStatusValidator {
  static ensureOk(response: APIResponse, resource: string): void {
    const statusCode: number = response.status();

    if (statusCode !== 200) {
      throw new Error(`GET ${resource} responded with status ${statusCode}`);
    }
  }
}
