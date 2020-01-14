import {render, RenderPosition, replace} from "../utils/render";
import CardComponent from "../components/card";
import CardEditComponent from "../components/card-edit";
import NoPointsComponent from "../components/no-points";
import TripSortComponent, {SortType} from "../components/trip-sort";
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

const renderPointList = (cardListContainerElement, dayListData) => {
  dayListData.forEach((dayItem, i) => {
    const cardListItemComponent = new CardListItemComponent(dayItem.date, i);
    render(cardListContainerElement, cardListItemComponent, RenderPosition.BEFOREEND);

    dayItem.points.forEach((point) => {
      const curCardListItem = cardListItemComponent.getElement().querySelector(`.trip-events__list`);
      // render(curCardListItem, new CardComponent(point).getElement(), RenderPosition.BEFOREEND);
      renderPoint(curCardListItem, point);
    });
  });
};

const getDayListData = (pointListData, daysList) => daysList.map((dayItem) => (
  {
    date: dayItem,
    points: pointListData.filter((item) => new Date(item.date[0]).getDate() === new Date(dayItem).getDate())
  })
);

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noPointsComponent = new NoPointsComponent();
    this._tripSortComponent = new TripSortComponent();
    this._cardListContainerComponent = new CardListContainerComponent();
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

    const sortedDefDayListData = pointListData
                                  .slice()
                                  .sort((a, b) => a.date[0] - b.date[0]);
    const daysList = sortedDefDayListData
                      .filter((item, i, curArr) => i === 0 || (new Date(curArr[i - 1].date[0]).getDate() !== new Date(curArr[i].date[0]).getDate()))
                      .map((item) => item.date[0]);

    const dayListData = getDayListData(sortedDefDayListData, daysList);
    renderPointList(cardListContainerElement, dayListData);

    this._tripSortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedPointListData = [];
      let sortedPointList = [];

      switch (sortType) {
        case SortType.TIME:
          sortedPointListData = pointListData
                                  .slice()
                                  .sort((a, b) => (b.date[1] - b.date[0]) - (a.date[1] - a.date[0]));
          sortedPointList = sortedPointListData
                              .filter((item, i, curArr) => i === 0 || (new Date(curArr[i - 1].date[0]).getDate() !== new Date(curArr[i].date[0]).getDate()))
                              .map((item) => item.date[0]);
          break;
        case SortType.PRICE:
          sortedPointListData = pointListData
                                .slice()
                                .sort((a, b) => b.price - a.price);
          sortedPointList = sortedPointListData
                              .filter((item, i, curArr) => i === 0 || (new Date(curArr[i - 1].date[0]).getDate() !== new Date(curArr[i].date[0]).getDate()))
                              .map((item) => item.date[0]);
          break;
        case SortType.DEFAULT:
          sortedPointListData = sortedDefDayListData;
          sortedPointList = daysList;
          break;
      }

      cardListContainerElement.innerHTML = ``;

      const sortedDayListData = getDayListData(sortedPointListData, sortedPointList);
      renderPointList(cardListContainerElement, sortedDayListData);
    });


  }
}
