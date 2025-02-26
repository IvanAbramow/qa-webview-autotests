import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../../utils/decorators';

const elements = {
  searchPage: {
    text: 'Авиабилеты',
  },
  freeRefundButton: {
    text: 'Отлично',
  },
};

export default class AviaSearchPage {
  public readonly elements: typeof elements;

  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;
    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Wait for loading avia search page')
  async waitForLoadingSearchPage() {
    console.log('Search page loaded');

    const element = await this.session.findElement({
      attributes: this.elements.freeRefundButton,
    }, { timeout: 10_000 });

    if (element) {
      await this.session.waitForElement({
        attributes: this.elements.freeRefundButton,
      });

      await this.session.tap({
        element: {
          attributes: this.elements.freeRefundButton,
        },
      });
    }
  }
}
