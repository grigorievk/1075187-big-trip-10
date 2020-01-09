export const createCardListItemTemplate = (item, i) => {
  const date = new Date(item);

  return (`
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${i + 1}</span>
        <time class="day__date" datetime="${date.toDateString()}">
            ${date.toLocaleString(`en`, {month: `short`})} ${date.getDate()}
        </time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>
  `);
};
