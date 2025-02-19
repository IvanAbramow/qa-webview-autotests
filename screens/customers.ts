import { PlaywrightSession } from "@appetize/playwright";
import { Step } from "../utils/decorators";

const elements = {
  corpTestCustomerButton: {
    text: "ФОНД ПОДДЕРЖКИ И РАЗВИТИЯ ДЕТСКОГО И ЮНОШЕСКОГО ТВОРЧЕСТВА \"CORP_TEST\"",
    "resource-id": "com.onetwotrip.onetwotrip.b2b:id/name",
  },
}

export default class CustomersScreen {
  public readonly elements: typeof elements;
  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;

    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Choose customer by element')
  async chooseCustomerByElement(element: { text: string; 'resource-id': string }) {
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
