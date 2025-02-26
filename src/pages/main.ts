import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../utils/decorators';
import { EProjects } from '../types';

const elements = {
  ios: {
    aviaButton: {
      'data-locator': 'service-tile-avia',
    },
  },
  android: {
    aviaButton: {
      text: 'Авиабилеты',
    },
  },
};

export default class MainPage {
  public readonly elements: typeof elements;

  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;

    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Choose project')
  async chooseProjectByElement(project: EProjects) {
    await this.session.waitForElement(
      {
        attributes: this.elements[project].aviaButton,
      },
      {
        timeout: 10_000,
      }
    );

    await this.session.tap({
      element: {
        attributes: this.elements[project].aviaButton,
      },
    });
  }
}
