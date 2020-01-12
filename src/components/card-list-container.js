import {createElement} from '../utils.js';

const createCardListContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class CardListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCardListContainerTemplate();
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
