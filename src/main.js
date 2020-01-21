import TripInfoComponent from "./components/trip-info";
import TripCostComponent from "./components/trip-cost";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";

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
  tripController.render(pointListData);
});

