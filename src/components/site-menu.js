import AbstractComponent from './abstract-component.js';

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

export default class SiteMenu extends AbstractComponent {
  constructor(menu) {
    super();

    this._menu = menu;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menu);
  }
}
