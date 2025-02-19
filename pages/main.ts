import { PlaywrightSession } from "@appetize/playwright";
import { Step } from "../utils/decorators";

const elements = {
  aviaButton: {
    text: "Авиабилеты"
  },
}

export default class MainPage {
  public readonly elements: typeof elements;
  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;

    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Choose project')
  async chooseProjectByElement(element: { text: string }) {
    await this.session.waitForElement({
      attributes: element
    });

    await this.session.tap({
      element: {
        attributes: element
      }
    });
  }
}
