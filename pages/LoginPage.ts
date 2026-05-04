import { Page, TestInfo } from '@playwright/test';
import { attachPageScreenshot } from '../utils/ScreenshotReporter';
import { E2E_BASE_URL } from '../config/url';
import { E2E_INVENTORY_URL } from '../config/routes';

export class LoginPage {
	private readonly usernameInput;
	private readonly passwordInput;
	private readonly loginButton;

	constructor(private readonly page: Page) {
		this.usernameInput = this.page.locator('[data-test="username"]');
		this.passwordInput = this.page.locator('[data-test="password"]');
		this.loginButton = this.page.locator('[data-test="login-button"]');
	}

	async open(): Promise<void> {
		await this.page.goto(E2E_BASE_URL);
	}

	async fillUsername(username: string, testInfo?: TestInfo): Promise<void> {
		await this.usernameInput.fill(username);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'login-username-filled');
		}
	}

	async fillPassword(password: string, testInfo?: TestInfo): Promise<void> {
		await this.passwordInput.fill(password);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'login-password-filled');
		}
	}

	async submit(testInfo?: TestInfo): Promise<void> {
		await this.loginButton.click();
		await this.page.waitForURL(E2E_INVENTORY_URL);
		if (testInfo) {
			await attachPageScreenshot(this.page, testInfo, 'inventory-after-login');
		}
	}

	async captureScreenshot(testInfo: TestInfo, name: string): Promise<void> {
		await attachPageScreenshot(this.page, testInfo, name);
	}

	async login(username: string, password: string, testInfo?: TestInfo): Promise<void> {
		await this.fillUsername(username, testInfo);
		await this.fillPassword(password, testInfo);
		await this.submit(testInfo);
	}
}
