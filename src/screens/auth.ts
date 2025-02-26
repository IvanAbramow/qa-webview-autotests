import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../utils/decorators';
import { EProjects } from '../types';

const elements = {
  ios: {
    loginInput: {
      accessibilityIdentifier: 'login',
    },
    passwordInput: {
      accessibilityIdentifier: 'password',
    },
    authButton: {
      accessibilityIdentifier: 'login_button',
    },
  },
  android: {
    loginInput: {
      text: 'E-mail или логин',
    },
    passwordInput: {
      text: 'Пароль',
    },
    authButton: {
      text: 'ВОЙТИ',
      class: 'android.widget.Button',
      'resource-id': 'com.onetwotrip.onetwotrip.b2b:id/button',
    },
  },
};

export default class AuthScreen {
  public readonly elements: typeof elements;

  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;

    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Login')
  async loginByCreds({ login, password, project }: { login: string; password: string, project: EProjects; }) {
    await this.session.waitForElement({
      attributes: this.elements[project].loginInput,
    });

    await this.session.tap({
      element: {
        attributes: this.elements[project].loginInput,
      },
    });

    await this.session.type(login);

    await this.session.tap({
      element: {
        attributes: this.elements[project].passwordInput,
      },
    });

    await this.session.type(password);

    await this.session.tap({
      element: {
        attributes: this.elements[project].authButton,
      },
    });
  }
}
