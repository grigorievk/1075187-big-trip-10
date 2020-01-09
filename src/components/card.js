const createOfferItemLayout = (offerList) => {
  if (!offerList) {
    return ``;
  }

  return offerList.map((offer) => {
    const {name, price} = offer;

    return (
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </li>`);
  })
    .join(`\n`);
};

const getTimeDuration = (date) => {
  const [dateStart, dateEnd] = date;
  const dateDiff = new Date(dateEnd).getTime() - new Date(dateStart).getTime();
  const diffInDays = dateDiff / (24 * 60 * 60 * 1000);
  const diffInHours = (dateDiff / (60 * 60 * 1000)) - (Math.floor(diffInDays) * 24);
  const diffInMinutes = (dateDiff / (60 * 1000)) - (Math.floor(diffInHours) * 60);

  let dateDuration = ``;

  if (diffInDays > 0) {
    dateDuration += (`0${diffInDays}D `).slice(-3);
  }

  if (diffInHours > 0) {
    dateDuration += (`0${diffInHours}H `).slice(-3);
  }

  if (diffInMinutes > 0) {
    dateDuration += (`0${diffInMinutes}M`).slice(-3);
  }

  return dateDuration.trim();
};

export const createCardTemplate = (pointData) => {
  const {title, date, type, offers, price} = pointData;
  const offerList = createOfferItemLayout(offers);
  const dateStart = new Date(date[0]);
  const dateEnd = new Date(date[1]);
  const timeStart = `${dateStart.getHours()}:${dateStart.getMinutes()}`;
  const timeEnd = `${dateEnd.getHours()}:${dateEnd.getMinutes()}`;
  const timeDuration = getTimeDuration(date);

  return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${title}</h3>
  
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
                </p>
                <p class="event__duration">${timeDuration}</p>
              </div>
  
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>
  
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${offerList}
              </ul>
  
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};
