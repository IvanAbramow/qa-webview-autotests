import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../utils/decorators';
import { EProjects } from '../types';

const elements = {
  ios: {
    dontAllowButton: {
      accessibilityLabel: 'Don’t Allow',
    },
  },
  android: {
    dontAllowButton: {
      text: 'Don’t allow',
      'resource-id': 'com.android.permissioncontroller:id/permission_deny_button',
    },
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
  async turnOffNotifications(project: EProjects) {
    const element = await this.session.findElement(
      {
        attributes: this.elements[project].dontAllowButton,
      },
      {
        timeout: 10_000,
      }
    );

    if (element) {
      await this.session.waitForElement({
        attributes: this.elements[project].dontAllowButton,
      });

      await this.session.tap({
        element: {
          attributes: this.elements[project].dontAllowButton,
        },
      });
    }
  }
}
