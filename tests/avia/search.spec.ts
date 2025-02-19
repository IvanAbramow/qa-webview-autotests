import { test } from "../../utils/fixtures";

test('Avia. Search', async ({
                                       systemScreen,
                                       authScreen,
                                       customersScreen,
                                       mainPage,
                                       aviaIndexPage,
                                       aviaSearchPage
                                     }) => {
  const {LOGIN, PASSWORD} = process.env;

  await systemScreen.turnOffNotifications();

  await authScreen.loginByCreds({
    login: LOGIN,
    password: PASSWORD,
  });

  await customersScreen.chooseCustomerByElement(customersScreen.elements.corpTestCustomerButton);

  await mainPage.chooseProjectByElement(mainPage.elements.aviaButton);

  await aviaIndexPage.waitForLoadingIndexPage();
  await aviaIndexPage.fillFlightParams({
    fromCity: 'Москва',
    toCity: 'Сочи',
    date: '4 марта'
  });

  await aviaSearchPage.waitForLoadingSearchPage();
})
