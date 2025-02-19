import { PlaywrightSession } from '@appetize/playwright';

import { Step } from '../../utils/decorators';


type FlightParams = {
  fromCity: string;
  toCity: string;
  date: string;
};

const elements = {
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
  async waitForLoadingIndexPage() {
    await this.session.waitForElement({
      attributes: this.elements.indexPage,
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
  }: FlightParams) {
    await this.session.waitForElement({
      attributes: this.elements.datesInput,
    });

    await this.session.tap({
      element: {
        attributes: this.elements.datesPicker,
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
  private async clickOnSearchButton() {
    await this.session.tap({
      element: {
        attributes: this.elements.searchButton,
      },
    });
  }

  @Step('Fill flight params')
  async fillFlightParams({
    fromCity,
    toCity,
    date,
  }: FlightParams) {
    await this.fillCity(this.elements.fromInput, fromCity);

    await this.fillCity(this.elements.toInput, toCity);

    await this.chooseFlightDate({ fromCity, toCity, date });

    await this.waitForLoadingIndexPage();

    await this.clickOnSearchButton();
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
