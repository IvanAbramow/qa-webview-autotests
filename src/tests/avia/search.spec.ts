import { test } from '../../utils/fixtures';
import { CREDS } from '../../../constants/constants';

test('Avia. Search', async ({
  session,
  systemScreen,
  authScreen,
  customersScreen,
  mainPage,
  aviaIndexPage,
  aviaSearchPage,
  project,
}) => {
  if ( project === 'android') {
    await systemScreen.turnOffNotifications(project);
  }

  await authScreen.loginByCreds({ ...CREDS, project });

  await customersScreen.chooseCustomerByElement(project);

  if ( project === 'ios') {
    await systemScreen.turnOffNotifications(project);

    return; // не включается вебвью в приложении ios по умолчанию при запуске
  }

  await mainPage.chooseProjectByElement(project);

  await aviaIndexPage.waitForLoadingIndexPage(project);
  await aviaIndexPage.chooseFlightFromHistory({
    fromCity: 'Москва',
    toCity: 'Сочи',
    date: '10 апреля',
  });

  await aviaSearchPage.waitForLoadingSearchPage();

  if (project === 'android') {
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
  }
});
