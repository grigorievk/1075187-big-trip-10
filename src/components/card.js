import {PointTypeList} from "../data/const";

const createOfferItemLayout = (offerList) => {
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
  const {dateStart, dateEnd} = date;
  const dateDiff = dateEnd - dateStart;
  let dateDuration = ``;

  if (dateDiff.getDay()) {
    dateDuration += (`0${dateDiff.getDay()}D `).slice(-2);
  }

  if (dateDiff.getHours()) {
    dateDuration += (`0${dateDiff.getHours()}H `).slice(-2);
  }

  if (dateDiff.getMinutes()) {
    dateDuration += (`0${dateDiff.getHours()}M`).slice(-2);
  }

  return dateDuration.trim();
};

export const createCardTemplate = (pointData) => {
  const {title, date, type, offers, price} = pointData;
  const offerList = createOfferItemLayout(offers);
  const timeStart = `${date[0].getHours()}:${date[0].getMinutes()}`;
  const timeEnd = `${date[1].getHours()}:${date[1].getMinutes()}`;
  const timeDuration = getTimeDuration(date);

  return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${PointTypeList[type].name}.png" alt="Event type icon">
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
