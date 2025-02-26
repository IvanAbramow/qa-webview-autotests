import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../utils/decorators';
import { EProjects } from '../types';

const elements = {
  ios: {
    corpTestCustomerButton: {
      accessibilityLabel: 'ФОНД ПОДДЕРЖКИ И РАЗВИТИЯ ДЕТСКОГО И ЮНОШЕСКОГО ТВОРЧЕСТВА "CORP_TEST"',
    },
  },
  android: {
    corpTestCustomerButton: {
      text: 'ФОНД ПОДДЕРЖКИ И РАЗВИТИЯ ДЕТСКОГО И ЮНОШЕСКОГО ТВОРЧЕСТВА "CORP_TEST"',
      'resource-id': 'com.onetwotrip.onetwotrip.b2b:id/name',
    },
  },
};

export default class CustomersScreen {
  public readonly elements: typeof elements;

  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;

    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Choose customer by element')
  async chooseCustomerByElement(project: EProjects) {
    await this.session.waitForElement({
      attributes: this.elements[project].corpTestCustomerButton,
    });

    await this.session.tap({
      element: {
        attributes: this.elements[project].corpTestCustomerButton,
      },
    });
  }
}
