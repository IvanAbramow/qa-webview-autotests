import { test as base } from '@appetize/playwright';

import AuthScreen from '../screens/auth';
import SystemScreen from '../screens/system';
import CustomersScreen from '../screens/customers';
import MainPage from '../pages/main';
import AviaIndexPage from '../pages/avia';
import AviaSearchPage from '../pages/avia/search';
import { EProjects } from '../types';

type TFixture = {
  authScreen: AuthScreen;
  systemScreen: SystemScreen;
  customersScreen: CustomersScreen;
  mainPage: MainPage;
  /** Avia */
  aviaIndexPage: AviaIndexPage;
  aviaSearchPage: AviaSearchPage;
  project: EProjects;
};

export const test = base.extend<TFixture>({
  authScreen: async ({ session }, use) => {
    const authScreen = new AuthScreen(session);

    await use(authScreen);
  },
  systemScreen: async ({ session }, use) => {
    const systemScreen = new SystemScreen(session);

    await use(systemScreen);
  },
  customersScreen: async ({ session }, use) => {
    const customersScreen = new CustomersScreen(session);

    await use(customersScreen);
  },
  mainPage: async ({ session }, use) => {
    const mainPage = new MainPage(session);

    await use(mainPage);
  },
  aviaIndexPage: async ({ session }, use) => {
    const aviaIndexPage = new AviaIndexPage(session);

    await use(aviaIndexPage);
  },
  aviaSearchPage: async ({ session }, use) => {
    const aviaSearchPage = new AviaSearchPage(session);

    await use(aviaSearchPage);
  },
  // eslint-disable-next-line no-empty-pattern
  project: async ({ }, use) => {
    const project = test.info().project.name as TFixture['project'];
    await use(project);
  },
});

export { expect } from '@playwright/test';
