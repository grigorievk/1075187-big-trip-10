import {PointTypeList, DestList} from "../data/const";
import {capitalize} from "../utils/common";
import AbstractSmartComponent from './abstract-smart-component.js';

const createEventTypeList = (type) => {
  return (
    `<fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${PointTypeList
          .filter((item) => item.isRide)
          .map((item) => `
            <div class="event__type-item">
              <input id="event-type-${item.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.name}">
              <label class="event__type-label  event__type-label--${item.name}" for="event-type-${item.name}-1">${capitalize(item.name)}</label>
            </div>
          `)
          .join(`\n`)}
    </fieldset>
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>
      ${PointTypeList
        .filter((item) => !item.isRide)
        .map((item) => `
                <div class="event__type-item">
                  <input id="event-type-${item.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.name}"
                  ${item.type === type ? ` checked` : ``}>
                  <label class="event__type-label  event__type-label--${item.name}" for="event-type-${item.name}-1">${capitalize(item.name)}</label>
                </div>
              `)
        .join(`\n`)}
    </fieldset>`
  );
};

const createDestListItem = (dest) => {
  return (
    `${DestList
    .map((item) => `<option value="${item}"${item === dest ? ` selected` : ``}></option>`)
    .join(`\n`)}`
  );
};

const createOfferList = (offerList) => {
  return (
    `${offerList
      .map((item, i) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" ${item.checked ? ` checked` : ``}>
      <label class="event__offer-label" for="event-offer-luggage-${i}">
        <span class="event__offer-title">${item.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
      </label>
    </div>`)
      .join(`\n`)}`
  );
};

const createImageListItem = (imageList) => {
  return (
    `${imageList
      .map((item) => `<img class="event__photo" src="${item}" alt="Event photo">`)
      .join(`\n`)}`
  );
};

const createCardEditTemplate = (pointData) => {
  const {dest, description, type, date, offers, price, images, isFavorite} = pointData;
  const eventTypeList = createEventTypeList(type);
  const destList = createDestListItem(dest);
  const offerList = createOfferList(offers);
  const imageList = createImageListItem(images);
  const dateStart = new Date(date[0]);
  const dateEnd = new Date(date[1]);
  const dateTimeStart = `${dateStart.toLocaleString(`en-US`, {day: `2-digit`, month: `2-digit`, year: `2-digit`, hour: `2-digit`, minute: `2-digit`, hour12: false})}`;
  const dateTimeEnd = `${dateEnd.toLocaleString(`en-US`, {day: `2-digit`, month: `2-digit`, year: `2-digit`, hour: `2-digit`, minute: `2-digit`, hour12: false})}`;

  return `<form class="event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  ${eventTypeList}
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                 ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${dest}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${destList}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateTimeStart}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTimeEnd}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>

              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? ` checked` : ``}>
              <label class="event__favorite-btn" for="event-favorite-1">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>

            <section class="event__details">

              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${offerList}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${imageList}
                  </div>
                </div>
              </section>
            </section>
          </form>`;
};

export default class CardEdit extends AbstractSmartComponent {
  constructor(pointData) {
    super();

    this._pointData = pointData;

    this._submitHandler = null;
    this._resetHandler = null;
    this._cancelHandler = null;
    this._favoritesHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCardEditTemplate(this._pointData);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setResetHandler(this._resetHandler);
    this.setCancelHandler(this._cancelHandler);
    this.setFavoritesButtonClickHandler(this._favoritesHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement()
      .addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setResetHandler(handler) {
    this.getElement()
      .addEventListener(`reset`, handler);
    this._resetHandler = null;
  }

  setCancelHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._cancelHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
    this._favoritesHandler = handler;
  }

  _subscribeOnEvents() {
    // const element = this.getElement();
  }
}
