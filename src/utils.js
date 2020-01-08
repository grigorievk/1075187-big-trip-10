export const getTotalCost = (pointListData) => pointListData.reduce((acc, item) => acc + item.price, 0);

export const capitalize = (s) => {
  if (typeof s !== `string`) {
    return ``;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
