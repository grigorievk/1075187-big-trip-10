import TripInfoComponent from "./components/trip-info";
import TripCostComponent from "./components/trip-cost";
import TripSortComponent from "./components/trip-sort";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import CardComponent from "./components/card";
import CardEditComponent from "./components/card-edit";
import CardListContainerComponent from "./components/card-list-container";
import CardListItemComponent from "./components/card-list-item";

import {generateMenu} from "./mock/menu.data";
import {generateFilters} from "./mock/filter.data";
import {generatePointList} from "./mock/point.data";

import {getTotalCost, render, RenderPosition} from "./utils";

const POINT_COUNT = 10;
const menuListData = generateMenu();
const filterListData = generateFilters();
const pointListData = generatePointList(POINT_COUNT);
const totalCost = getTotalCost(pointListData);

const daysList = pointListData
                    .sort((a, b) => a.date[0] - b.date[0])
                    .filter((item, i, curArr) => i === 0 || (new Date(curArr[i - 1].date[0]).getDate() !== new Date(curArr[i].date[0]).getDate()))
                    .map((item) => item.date[0]);

const dayListData = daysList.map((dayItem) => ({
  date: dayItem,
  points: pointListData.slice(1).filter((item) => new Date(item.date[0]).getDate() === new Date(dayItem).getDate())
}));

const renderPoint = (curCardListItem, point) => {
  const cardComponent = new CardComponent(point);
  const cardEditComponent = new CardEditComponent(point);

  const editButton = cardComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    curCardListItem.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
  });

  const editForm = cardEditComponent.getElement();
  editForm.addEventListener(`submit`, () => {
    curCardListItem.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  });

  editForm.addEventListener(`reset`, () => {
    curCardListItem.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  });

  render(curCardListItem, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

document.addEventListener(`DOMContentLoaded`, () => {
  const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
  const tripEventsElement = document.querySelector(`.trip-events`);
  const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2:nth-of-type(1)`);
  const filterElement = document.querySelector(`.trip-main__trip-controls h2:nth-of-type(2)`);

  render(tripInfoElement, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoElement, new TripCostComponent(totalCost).getElement(), RenderPosition.BEFOREEND);
  render(siteMenuElement, new SiteMenuComponent(menuListData).getElement(), RenderPosition.BEFOREEND);
  render(filterElement, new FilterComponent(filterListData).getElement(), RenderPosition.BEFOREEND);

  render(tripEventsElement, new TripSortComponent().getElement(), RenderPosition.BEFOREEND);

  const cardListContainerComponent = new CardListContainerComponent();
  render(tripEventsElement, cardListContainerComponent.getElement(), RenderPosition.BEFOREEND);

  dayListData.forEach((dayItem, i) => {
    const cardListItemComponent = new CardListItemComponent(dayItem.date, i);
    render(cardListContainerComponent.getElement(), cardListItemComponent.getElement(), RenderPosition.BEFOREEND);

    dayItem.points.forEach((point) => {
      const curCardListItem = cardListItemComponent.getElement().querySelector(`.trip-events__list`);
      // render(curCardListItem, new CardComponent(point).getElement(), RenderPosition.BEFOREEND);
      renderPoint(curCardListItem, point);
    });
  });
});

