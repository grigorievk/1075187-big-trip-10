const createDayItemLayout = (item, i) => {
  const {date} = item;

  return (`
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${i}</span>
        <time class="day__date" datetime="2019-03-18">${date.getMonth() + 1} ${date.getDate()}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>
  `);
};

export const createCardListContainerTemplate = (pointList) => {
  const daysList = pointList.filter((item, i, curArr) => i === 0 || (curArr[i - 1].date.getDate() !== curArr[i].getDate()));
  const dayItemLayout = daysList.map((item, i) => createDayItemLayout(item, i)).join(`\n`);

  return `<ul class="trip-days">
            ${dayItemLayout}
          </ul>`;
};
