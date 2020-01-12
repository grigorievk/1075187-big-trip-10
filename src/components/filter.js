import {createElement} from '../utils.js';

const createFilterItemLayout = (filter, isChecked) => {
  const {name, title} = filter;

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}"
        ${isChecked ? ` checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${title}</label>
    </div>
  `);
};

const createFilterTemplate = (filterList) => {
  const filterItemLayout = filterList.map((item, i) => createFilterItemLayout(item, i === 0)).join(`\n`);

  return `<form class="trip-filters" action="#" method="get">
              ${filterItemLayout}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
