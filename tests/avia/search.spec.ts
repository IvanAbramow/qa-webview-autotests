import { test } from '../../utils/fixtures';
import { CREDS } from '../../constants/constants';

test('Avia. Search', async ({
  systemScreen,
  authScreen,
  customersScreen,
  mainPage,
  aviaIndexPage,
  aviaSearchPage,
}) => {
  await systemScreen.turnOffNotifications();

  await authScreen.loginByCreds(CREDS);

  await customersScreen.chooseCustomerByElement(customersScreen.elements.corpTestCustomerButton);

  await mainPage.chooseProjectByElement(mainPage.elements.aviaButton);

  await aviaIndexPage.waitForLoadingIndexPage();
  await aviaIndexPage.chooseFlightFromHistory({
    fromCity: 'Москва',
    toCity: 'Сочи',
    date: '4 марта',
  });

  await aviaSearchPage.waitForLoadingSearchPage();
});
