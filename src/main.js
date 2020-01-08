import {createTripInfoTemplate} from "./components/trip-info";
import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createTripSortTemplate} from "./components/trip-sort";
import {createCardEditTemplate} from "./components/card-edit";
import {createCardListContainerTemplate} from "./components/card-list-container";
import {createCardTemplate} from "./components/card";



function renderComponent(selector, templateArray, where = `afterend`) {
  const templateList = templateArray.map((t) => {
    let template = t.template();

    if (t.hasOwnProperty(`quant`) && t.quant > 1) {
      template = template.repeat(t.quant);
    }
    return template;
  }).join(`\n`);

  [...document.querySelectorAll(selector)].forEach((element) => {
    element.insertAdjacentHTML(where, templateList);
  });
}

document.addEventListener(`DOMContentLoaded`, () => {
  renderComponent(`.trip-main__trip-info`, [{template: createTripInfoTemplate}], `afterbegin`);
  renderComponent(`.trip-main__trip-controls h2:nth-of-type(1)`, [{template: createSiteMenuTemplate}]);
  renderComponent(`.trip-main__trip-controls h2:nth-of-type(2)`, [{template: createFilterTemplate}]);

  renderComponent(`.trip-events`, [{template: createTripSortTemplate}, {template: createCardEditTemplate}, {template: createCardListContainerTemplate}]);
  renderComponent(`.trip-events__list`, [{template: createCardTemplate, quant: 3}], `afterbegin`);
});

