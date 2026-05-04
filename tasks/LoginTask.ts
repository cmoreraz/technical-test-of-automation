import { TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class LoginTask {
	constructor(private readonly loginPage: LoginPage) {}

	async execute(username: string, password: string, testInfo?: TestInfo): Promise<void> {
		await this.loginPage.open();
		if (testInfo) {
			await this.loginPage.captureScreenshot(testInfo, 'login-page-opened');
		}
		await this.loginPage.login(username, password, testInfo);
	}
}
