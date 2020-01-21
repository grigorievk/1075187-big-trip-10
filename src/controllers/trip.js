import {render, RenderPosition} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import TripSortComponent, {SortType} from "../components/trip-sort";
import CardListContainerComponent from "../components/card-list-container";
import CardListItemComponent from "../components/card-list-item";
import PointController from "./point";

const renderPointList = (cardListContainerElement, pointListData, onDataChange, onViewChange) => {
  let cardListItemComponent;

  return pointListData.map((item, i) => {
    if (i === 0 || new Date(item.date[0]).getDate() !== new Date(pointListData[i - 1].date[0]).getDate()) {
      cardListItemComponent = new CardListItemComponent(item.date[0], i);
      render(cardListContainerElement, cardListItemComponent, RenderPosition.BEFOREEND);
    }

    const curCardListItem = cardListItemComponent.getElement().querySelector(`.trip-events__list`);
    const pointController = new PointController(curCardListItem, onDataChange, onViewChange);
    pointController.render(item);

    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._pointListData = [];
    this._sortedDefDayListData = [];
    this._showedPointControllers = [];

    this._noPointsComponent = new NoPointsComponent();
    this._tripSortComponent = new TripSortComponent();
    this._cardListContainerComponent = new CardListContainerComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(pointListData) {
    const container = this._container;

    render(container, this._tripSortComponent, RenderPosition.BEFOREEND);

    render(container, this._cardListContainerComponent, RenderPosition.BEFOREEND);
    const cardListContainerElement = this._cardListContainerComponent.getElement();

    if (!pointListData.length) {
      render(cardListContainerElement, this._noPointsComponent, RenderPosition.BEFOREEND);

      return;
    }

    this._pointListData = pointListData;
    this._sortedDefDayListData = pointListData
                                  .slice()
                                  .sort((a, b) => a.date[0] - b.date[0]);

    // const newPointList = renderPointList(cardListContainerElement, this._dayListData, this._onDataChange, this._onViewChange);
    const newPointList = renderPointList(cardListContainerElement, this._sortedDefDayListData, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPointList);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._pointListData.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._pointListData = [].concat(this._pointListData.slice(0, index), newData, this._pointListData.slice(index + 1));

    pointController.render(this._pointListData[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedPointListData = [];

    switch (sortType) {
      case SortType.TIME:
        sortedPointListData = this._pointListData
          .slice()
          .sort((a, b) => (b.date[1] - b.date[0]) - (a.date[1] - a.date[0]));
        break;
      case SortType.PRICE:
        sortedPointListData = this._pointListData
          .slice()
          .sort((a, b) => b.price - a.price);
        break;
      case SortType.DEFAULT:
        sortedPointListData = this._sortedDefDayListData;
        break;
    }

    const cardListContainerElement = this._cardListContainerComponent.getElement();

    cardListContainerElement.innerHTML = ``;

    this._showedPointControllers = renderPointList(cardListContainerElement, sortedPointListData, this._onDataChange, this._onViewChange);
  }
}
