import { PlaywrightSession } from "@appetize/playwright";
import { Step } from "../../utils/decorators";

const elements = {
  searchPage: {
    text: "Авиабилеты"
  },
}

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
    await this.session.waitForElement({
      attributes: this.elements.searchPage
    });
  }
}
