import AbstractComponent from './abstract-component.js';

const createCardListContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class CardListContainer extends AbstractComponent {
  getTemplate() {
    return createCardListContainerTemplate();
  }
}
