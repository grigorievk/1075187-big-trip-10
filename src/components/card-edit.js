import {PointTypeList, DestList} from "../data/const";
import {capitalize, createElement} from "../utils";

const createEventTypeList = (type) => {
  return (`
    <fieldset class="event__type-group">
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
    </fieldset>
  `);
};

const createDestListItem = (dest) => {
  return (`
    ${DestList
    .map((item) => `<option value="${item}"${item === dest ? ` selected` : ``}></option>`)
    .join(`\n`)}
  `);
};

const createCardEditTemplate = (pointData) => {
  const {dest, type, date, price} = pointData;
  const eventTypeList = createEventTypeList(type);
  const destList = createDestListItem(dest);
  const dateStart = new Date(date[0]);
  const dateEnd = new Date(date[1]);
  const dateTimeStart = `${dateStart.toLocaleString(`en-US`, {day: `2-digit`, month: `2-digit`, year: `2-digit`, hour: `2-digit`, minute: `2-digit`, hour12: false})}`;
  const dateTimeEnd = `${dateEnd.toLocaleString(`en-US`, {day: `2-digit`, month: `2-digit`, year: `2-digit`, hour: `2-digit`, minute: `2-digit`, hour12: false})}`;


  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                <div class="event__type-list">
                  ${eventTypeList}
                </div>
              </div>
              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  Sightseeing at
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
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
          </form>`;
};

export default class CardEdit {
  constructor(pointData) {
    this._pointData = pointData;
    this._element = null;
  }

  getTemplate() {
    return createCardEditTemplate(this._pointData);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
