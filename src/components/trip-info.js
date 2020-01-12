import {createElement} from '../utils.js';

const createTripInfoTemplate = () => {
  return `<div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; ... &mdash; Amsterdam</h1>
              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
            </div>`;
};

export default class TripInfo {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._filters);
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
