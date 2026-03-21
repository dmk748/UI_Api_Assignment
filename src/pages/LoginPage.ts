import { Page, Locator } from '@playwright/test';

export class LoginPage {

    //page fixture
    private page: Page;

    //element locators
    private readonly bookStoreApplication: Locator;
    private readonly loginMenu: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;
    private readonly userLabel: Locator;
    private readonly logoutBtn: Locator;

    //constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page;
        this.bookStoreApplication = page.getByText('Book Store Application');
        this.loginMenu = page.locator('#login');
        this.usernameInput = page.locator('#userName');
        this.passwordInput = page.locator('#password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.userLabel = page.locator('#userName-value');
        this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    }

    //implementing action methods
    //clicking bookstore application 
    async openBookStoreApplication() {
        try {
            await this.bookStoreApplication.click();
        } catch (error) {
            console.error('Error occurred while clicking Book Store Application:', error);
        }
    }

    //navigate to login page
    async navigateToLoginPage() {
        try {
            await this.loginMenu.click();
        } catch (error) {
            console.error('Error occurred while navigating to login page:', error);
        }
    }

    //login into bookstore application
    async login(username: string, password: string) {
        try {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginBtn.click();
        } catch (error) {
            console.error('Error occurred while logging in:', error);
        }
    }

    get usernameText() {
        try {
            return this.userLabel;
        } catch (error) {
            console.error('Error occurred while getting username text:', error);
            return this.userLabel; // Return the locator even if there's an error, to avoid breaking the test flow
        }
    }

    get logoutButton() {
        try {
            return this.logoutBtn;
        } catch (error) {
            console.error('Error occurred while getting logout button:', error);
            return this.logoutBtn; // Return the locator even if there's an error, to avoid breaking the test flow
        }
    }

}
