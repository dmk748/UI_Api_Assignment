import { Page, Locator } from '@playwright/test';

export class BookstorePage {

    //page fixture
    private page: Page;

    //element locators
    private readonly bookStoreMenu: Locator;
    private readonly searchBox: Locator;
    private readonly bookDetails: Locator;
    private readonly logoutBtn: Locator;

    //constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page;
        this.bookStoreMenu = page.getByText('Book Store', { exact: true });
        this.searchBox = page.locator('#searchBox');
        this.bookDetails = page.locator('tbody tr td a');
        this.logoutBtn = page.locator('#submit');
    }

    //implementing action methods
    async openBookStore() {
        try {
            await this.bookStoreMenu.click();
        } catch (error) {
            console.error('Error occurred while clicking Book Store menu:', error);
        }
    }

    async searchBook(bookName: string) {
        try {
            await this.searchBox.fill(bookName);
        } catch (error) {
            console.error('Error occurred while filling search box:', error);
        }
    }

    async isBookVisible(bookName: string) {
        try{
        return await this.bookDetails.filter({ hasText: bookName }).isVisible();
        } catch (error) {
            console.error('Error occurred while checking book visibility:', error);
            return false;
        }
    }

    async getBookDetails(bookName: string) {
        // Click book from list page and navigate to details page, then extract details
        try {
            await this.page.getByRole('link', { name: bookName }).click();

            const title = await this.page.locator('div.profile-wrapper div#title-wrapper label#userName-value').textContent();
            const author = await this.page.locator('div.profile-wrapper div#author-wrapper label#userName-value').textContent();
            const publisher = await this.page.locator('div.profile-wrapper div#publisher-wrapper label#userName-value').textContent();

            return {
                title: title?.trim(),
                author: author?.trim(),
                publisher: publisher?.trim()
            };
        } catch (error) {
            console.error('Error occurred while getting book details:', error);
            return {
                title: 'N/A',
                author: 'N/A',
                publisher: 'N/A'
            };
        }
    }

    async logout() {
        try {
            await this.logoutBtn.click();
        } catch (error) {
            console.error('Error occurred while clicking logout button:', error);
        }
    }

}

