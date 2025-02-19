import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../utils/decorators';

const elements = {
  dontAllowButton: {
    text: 'Don’t allow',
    'resource-id': 'com.android.permissioncontroller:id/permission_deny_button',
  },
};

export default class SystemScreen {
  public readonly elements: typeof elements;

  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;

    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Turn off notifications')
  async turnOffNotifications() {
    const element = await this.session.findElement({
      attributes: this.elements.dontAllowButton,
    }, {
      timeout: 10_000,
    });

    if (element) {
      await this.session.waitForElement({
        attributes: this.elements.dontAllowButton,
      });

      await this.session.tap({
        element: {
          attributes: this.elements.dontAllowButton,
        },
      });
    }
  }
}
