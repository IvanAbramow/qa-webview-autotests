import { PlaywrightSession } from "@appetize/playwright";
import { Step } from "../utils/decorators";

const elements = {
  loginInput: {
    text: "E-mail или логин"
  },
  passwordInput: {
    text: "Пароль"
  },
  authButton: {
    text: "ВОЙТИ",
    class: "android.widget.Button",
    "resource-id": "com.onetwotrip.onetwotrip.b2b:id/button",
  }
}

export default class AuthScreen {
  public readonly elements: typeof elements;
  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;

    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Login')
  async loginByCreds({ login, password }: { login: string; password: string }) {
    await this.session.waitForElement({
      attributes: this.elements.loginInput
    });

    await this.session.tap({
      element: {
        attributes: this.elements.loginInput
      }
    });

    await this.session.type(login);

    await this.session.tap({
      element: {
        attributes: this.elements.passwordInput
      }
    });

    await this.session.type(password);

    await this.session.tap({
      element: {
        attributes: this.elements.authButton
      }
    });
  }
}
