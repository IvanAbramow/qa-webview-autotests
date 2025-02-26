import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../../utils/decorators';
import { EProjects } from '../../types';


type FlightParams = {
  fromCity: string;
  toCity: string;
  date: string;
};

const elements = {
  android: {
    indexPage: {
      text: 'Авиабилеты',
    },
    fromInput: {
      text: 'Откуда',
    },
    toInput: {
      text: 'Куда',
    },
    datesInput: {
      text: 'Когда',
    },
    searchButton: {
      text: 'Найти',
    },
    datesPicker: {
      text: 'Когда',
    },
  },
  ios: {
    indexPage: {
      'data-locator': 'service-tile-avia',
    },
    fromInput: {
      text: 'Откуда',
    },
    toInput: {
      text: 'Куда',
    },
    datesInput: {
      text: 'Когда',
    },
    searchButton: {
      text: 'Найти',
    },
    datesPicker: {
      text: 'Когда',
    },
  },
};

export default class AviaIndexPage {
  public readonly elements: typeof elements;

  private session: PlaywrightSession;

  constructor(session: PlaywrightSession) {
    this.session = session;
    this.elements = elements;
  }

  static readonly elements: typeof elements = elements;

  @Step('Wait for loading index page')
  async waitForLoadingIndexPage(project: EProjects) {
    await this.session.waitForElement({
      attributes: this.elements[project].indexPage,
    });
  }

  @Step('Fill city')
  private async fillCity(element: { text: string }, cityName: string) {
    await this.session.waitForElement({
      attributes: element,
    });

    await this.session.tap({
      element: {
        attributes: element,
      },
    });

    await this.session.tap(
      {
        element: {
          attributes: {
            text: cityName,
          },
        },
      },
      {
        matchIndex: 0,
      }
    );
  }

  @Step('Choose a flight date')
  private async chooseFlightDate({
    fromCity,
    toCity,
    date,
  }: FlightParams, project: EProjects) {
    await this.session.waitForElement({
      attributes: this.elements[project].datesInput,
    });

    await this.session.tap({
      element: {
        attributes: this.elements[project].datesPicker,
      },
    });

    // МоскваСочи 4 марта, 1 пассажир
    await this.session.tap({
      element: {
        attributes: {
          text: `${fromCity}${toCity} ${date}, 1 пассажир`,
        },
      },
    });
  }

  @Step('Click on search button')
  private async clickOnSearchButton(project: EProjects) {
    await this.session.tap({
      element: {
        attributes: this.elements[project].searchButton,
      },
    });
  }

  @Step('Fill flight params')
  async fillFlightParams({
    fromCity,
    toCity,
    date,
  }: FlightParams, project: EProjects) {
    await this.fillCity(this.elements[project].fromInput, fromCity);
    await this.fillCity(this.elements[project].toInput, toCity);

    await this.chooseFlightDate({ fromCity, toCity, date }, project);

    await this.waitForLoadingIndexPage(project);
    await this.clickOnSearchButton(project);
  }

  @Step('Fill flight params')
  async chooseFlightFromHistory({
    fromCity,
    toCity,
    date,
  }: FlightParams) {
    await this.session.tap({
      element: {
        attributes: {
          'content-desc': `${fromCity}${toCity} ${date}, 1 пассажир`,
        },
      },
    },{
      matchIndex: 0,
    });
  }
}
