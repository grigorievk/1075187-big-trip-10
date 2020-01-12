import {createElement} from '../utils.js';

const createMenuLayout = (menuItem, isActive) => {
  const {name} = menuItem;

  return (`<a class="trip-tabs__btn${isActive ? ` trip-tabs__btn--active` : ``}" href="#">${name}</a>`);
};

const createSiteMenuTemplate = (menu) => {
  const menuLayout = menu.map((item, i) => createMenuLayout(item, i === 0)).join(`\n`);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              ${menuLayout}
            </nav>`;
};

export default class SiteMenu {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menu);
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
