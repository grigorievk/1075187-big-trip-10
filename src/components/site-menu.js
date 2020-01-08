const createMenuLayout = (menuItem, isActive) => {
  const {name} = menuItem;

  return (`<a class="trip-tabs__btn${isActive ? ` trip-tabs__btn--active` : ``}" href="#">${name}</a>`);
};

export const createSiteMenuTemplate = (menu) => {
  const menuLayout = menu.map((item, i) => createMenuLayout(item, i === 0)).join(`\n`);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              ${menuLayout}
            </nav>`;
};
