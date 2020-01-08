import {createTripInfoTemplate} from "./components/trip-info";
import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createTripSortTemplate} from "./components/trip-sort";
import {createCardEditTemplate} from "./components/card-edit";
import {createCardListContainerTemplate} from "./components/card-list-container";
import {createCardTemplate} from "./components/card";

import {generateMenu} from "./mock/menu.data";
import {generateFilters} from "./mock/filter.data";
import {generatePointList} from "./mock/point.data";

const POINT_COUNT = 10;
const menuListData = generateMenu();
const filterListData = generateFilters();
const pointListData = generatePointList(POINT_COUNT);

const daysList = pointListData
                    .sort((a, b) => a.date[0] - b.date[0])
                    .filter((item, i, curArr) => i === 0 || (new Date(curArr[i - 1].date[0]).getDate() !== new Date(curArr[i].date[0]).getDate()))
                    .map((item) => item.date[0]);

console.log(daysList);

function renderComponent(selector, template, placing = `beforeend`) {
  document.querySelector(selector).insertAdjacentHTML(placing, template);
}

document.addEventListener(`DOMContentLoaded`, () => {
  renderComponent(`.trip-main__trip-info`, createTripInfoTemplate(), `afterbegin`);
  renderComponent(`.trip-main__trip-controls h2:nth-of-type(1)`, createSiteMenuTemplate(menuListData));
  renderComponent(`.trip-main__trip-controls h2:nth-of-type(2)`, createFilterTemplate(filterListData));

  renderComponent(`.trip-events`, createTripSortTemplate());
  renderComponent(`.trip-events`, createCardEditTemplate());
  renderComponent(`.trip-events`, createCardListContainerTemplate(daysList));
  // pointListData.slice(1).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));
  pointListData.forEach((item) => renderComponent(`.trip-events__list`, createCardTemplate(item), `beforeend`));
});

