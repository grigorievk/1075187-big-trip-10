export const getTotalCost = (pointListData) => pointListData.reduce((acc, item) => acc + item.price, 0);
