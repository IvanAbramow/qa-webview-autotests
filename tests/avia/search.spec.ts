import { test } from '../../utils/fixtures';
import { CREDS } from '../../constants/constants';

test('Avia. Search. Handle', async ({
  session,
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

  await session.tap({
    element: {
      path: '/2/0/0/0/0/0/0/0/0/0/0/0/0/0/0/1/0/0/0/0/0/1/0',
      type: 'node',
      source: 'accessibility',
      bounds: {
        x: 0,
        y: 105.66666666666667,
        width: 361.3333333333333,
        height: 604,
      },
      attributes: {
        text: '',
        class: 'android.widget.TextView',
        'resource-id': 'content',
        clickable: 'false',
        enabled: 'true',
        checkable: 'false',
        selected: 'false',
        focusable: 'false',
        hint: '',
      },
    },
  });
});
