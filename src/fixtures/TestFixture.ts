import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookstorePage } from '../pages/BookstorePage';

type AppFixtures = {
  loginPage: LoginPage;
  bookstorePage: BookstorePage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  bookstorePage: async ({ page }, use) => {
    await use(new BookstorePage(page));
  }
});

export { expect } from '@playwright/test';