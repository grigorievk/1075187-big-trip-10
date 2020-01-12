import {createElement} from '../utils.js';

const createTripCostTemplate = (total) => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
          </p>`;
};

export default class TripCost {
  constructor(total) {
    this._total = total;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._total);
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
