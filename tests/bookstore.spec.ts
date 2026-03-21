/*
1.Navigate to Books Store Application
2.Login using the newly created user.
3.Upon successful login, Validate username and logout button.
4.Click on bookstore button
5.Search "Learning JavaScript Design Patterns"
6.Validate the search result to contain this book.
7.Print Title, Author and Publisher into a file.
8.Click on log out button
*/

import { test, expect } from '../src/fixtures/TestFixture';
import { testData } from '../src/data/TestData';
import { saveBookDetails } from '../src/utils/TestUtil';

test('Validating Book Search Functionality in Bookstore Application', async ({ page, loginPage, bookstorePage }) => {

    await test.step('Navigate to books store application', async () => {
        await page.goto('/');
        await loginPage.openBookStoreApplication();
    });

    await test.step('Login using the newly created user', async () => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(testData.user.username, testData.user.password);
    });

    await test.step('Validate username and logout button after login', async () => {
        await expect(loginPage.usernameText).toHaveText(testData.user.username);
        await expect(loginPage.logoutButton).toBeVisible();
    });

    await test.step('Click on Book Store button', async () => {
        await bookstorePage.openBookStore();
    });

    await test.step('Search "Learning JavaScript Design Patterns"', async () => {
        await bookstorePage.searchBook(testData.book.name);
    });

    await test.step('Validate search result contains the book', async () => {
        const isVisible = await bookstorePage.isBookVisible(testData.book.name);
        expect(isVisible).toBe(true);
    });

    await test.step('Print Title, Author and Publisher into a file', async () => {
        const details = await bookstorePage.getBookDetails(testData.book.name);

        console.log('Book Details:', details);

        saveBookDetails(details);

        await test.info().attach('Book Details', {
            body: JSON.stringify(details, null, 2),
            contentType: 'application/json'
        });
    });

    await test.step('Click on logout button', async () => {
        await bookstorePage.logout();
    });
});

