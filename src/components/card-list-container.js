const createDayItemLayout = (item, i) => {
  const date = new Date(item);

  return (`
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${i + 1}</span>
        <time class="day__date" datetime="2019-03-18">
            ${date.toLocaleString(`en`, {month: `short`})} ${date.getDate()}
        </time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>
  `);
};

export const createCardListContainerTemplate = (daysList) => {
  const dayItemLayout = daysList.map((item, i) => createDayItemLayout(item, i)).join(`\n`);

  return `<ul class="trip-days">
            ${dayItemLayout}
          </ul>`;
};
