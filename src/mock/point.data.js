import {PointTypeList} from "../data/const";

const destList = [
  `Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`
];

const descriptionList = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed`,
  `finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue`,
  `convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.
   In rutrum ac purus sit amet tempus.`
];

const capitalize = (s) => {
  if (typeof s !== `string`) {
    return ``;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getRndArrayItem = (array) => array[getRndIntNumber(array.length)];

const getRndIntNumber = (max, min = 0) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRndDateStart = () => Date.now() + getRndIntNumber(5, 1) * 24 * 60 * 60 * 1000;
const getRndDateEnd = () => getRndDateStart() + getRndIntNumber(48) * 60 * 60 * 1000;

const generateOfferList = (type) => {
  const offerList = [
    {
      name: `Add luggage`,
      price: `10`
    },
    {
      name: `Switch to comfort class`,
      price: `150`
    },
    {
      name: `Add meal`,
      price: `2`
    },
    {
      name: `Choose seats`,
      price: `9`
    },
  ];

  return new Array(getRndIntNumber(2))
    .fill(``)
    .map(() => Object.assign({type}, getRndArrayItem(offerList)));
};

const generateImageList = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      return `http://picsum.photos/300/150?r=${Math.random()}`;
    });
};

const generatePoint = () => {
  const type = PointTypeList[getRndArrayItem(Object.keys(PointTypeList))].name;
  const dest = getRndArrayItem(destList);

  return {
    title: `${capitalize(type)} to ${dest}`,
    date: [getRndDateStart(), getRndDateEnd()],
    dest,
    description: descriptionList.slice(0, getRndIntNumber(2)).join(``),
    type,
    offers: generateOfferList(type),
    price: getRndIntNumber(600, 10),
    images: generateImageList(5),
    isFavorite: Math.random() > 0.5
  };
};

const generatePointList = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

export {generatePoint, generatePointList};
