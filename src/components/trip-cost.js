import AbstractComponent from './abstract-component.js';

const createTripCostTemplate = (total) => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
          </p>`;
};

export default class TripCost extends AbstractComponent {
  constructor(total) {
    super();

    this._total = total;
  }

  getTemplate() {
    return createTripCostTemplate(this._total);
  }
}
