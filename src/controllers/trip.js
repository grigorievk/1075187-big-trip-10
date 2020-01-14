import {render, RenderPosition, replace} from "../utils/render";
import CardComponent from "../components/card";
import CardEditComponent from "../components/card-edit";
import NoPointsComponent from "../components/no-points";
import TripSortComponent from "../components/trip-sort";
import CardListContainerComponent from "../components/card-list-container";
import CardListItemComponent from "../components/card-list-item";

const renderPoint = (curCardListItem, point) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToPoint = () => {
    replace(cardComponent, cardEditComponent);
  };

  const replacePointToEdit = () => {
    replace(cardEditComponent, cardComponent);
  };

  const cardComponent = new CardComponent(point);
  const cardEditComponent = new CardEditComponent(point);

  cardComponent.setEditButtonClickHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  cardEditComponent.setSubmitHandler(replaceEditToPoint);
  cardEditComponent.setResetHandler(replaceEditToPoint);

  render(curCardListItem, cardComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointsComponent = new NoPointsComponent();
    this._tripSortComponent = new TripSortComponent();
    this._cardListContainerComponent = new CardListContainerComponent();
  }

  render(dayListData) {
    const container = this._container;

    render(container, this._tripSortComponent, RenderPosition.BEFOREEND);

    render(container, this._cardListContainerComponent, RenderPosition.BEFOREEND);
    const cardListContainerElement = this._cardListContainerComponent.getElement();

    if (!dayListData.length) {
      render(cardListContainerElement, this._noPointsComponent, RenderPosition.BEFOREEND);

      return;
    }

    dayListData.forEach((dayItem, i) => {
      const cardListItemComponent = new CardListItemComponent(dayItem.date, i);
      render(cardListContainerElement, cardListItemComponent, RenderPosition.BEFOREEND);

      dayItem.points.forEach((point) => {
        const curCardListItem = cardListItemComponent.getElement().querySelector(`.trip-events__list`);
        // render(curCardListItem, new CardComponent(point).getElement(), RenderPosition.BEFOREEND);
        renderPoint(curCardListItem, point);
      });
    });
  }
}
