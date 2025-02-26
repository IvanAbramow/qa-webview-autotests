import { test } from '../../utils/fixtures';
import { CREDS } from '../../../constants/constants';

test('Avia. Search', async ({
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
});
