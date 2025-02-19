import { test as base } from '@appetize/playwright';
import AuthScreen from "../screens/auth";
import SystemScreen from "../screens/system";
import CustomersScreen from "../screens/customers";
import MainPage from "../pages/main";
import AviaIndexPage from "../pages/avia";
import AviaSearchPage from "../pages/avia/search";

type TFixture = {
  authScreen: AuthScreen;
  systemScreen: SystemScreen;
  customersScreen: CustomersScreen;
  mainPage: MainPage;
  /** Avia */
  aviaIndexPage: AviaIndexPage;
  aviaSearchPage: AviaSearchPage;
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
});

export { expect } from '@playwright/test';
