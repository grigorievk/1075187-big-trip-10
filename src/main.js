import TripInfoComponent from "./components/trip-info";
import TripCostComponent from "./components/trip-cost";
import TripSortComponent from "./components/trip-sort";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import CardListContainerComponent from "./components/card-list-container";
import CardListItemComponent from "./components/card-list-item";
import NoPointsComponent from './components/no-points.js';

import {generateMenu} from "./mock/menu.data";
import {generateFilters} from "./mock/filter.data";
import {generatePointList} from "./mock/point.data";

import {getTotalCost} from "./utils/common";
import {render, RenderPosition} from "./utils/render";
import TripController from "./controllers/trip";

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

document.addEventListener(`DOMContentLoaded`, () => {
  const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
  const tripEventsElement = document.querySelector(`.trip-events`);
  const siteMenuElement = document.querySelector(`.trip-main__trip-controls h2:nth-of-type(1)`);
  const filterElement = document.querySelector(`.trip-main__trip-controls h2:nth-of-type(2)`);

  render(tripInfoElement, new TripInfoComponent(), RenderPosition.AFTERBEGIN);
  render(tripInfoElement, new TripCostComponent(totalCost), RenderPosition.BEFOREEND);
  render(siteMenuElement, new SiteMenuComponent(menuListData), RenderPosition.BEFOREEND);
  render(filterElement, new FilterComponent(filterListData), RenderPosition.BEFOREEND);

  const tripController = new TripController(tripEventsElement);
  tripController.render(dayListData);
});

