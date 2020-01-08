const filterNames = [
  `Everything`, `Future`, `Past`
];

const generateFilters = () => {
  return filterNames.map((item) => {
    return {
      name: item.toLowerCase(),
      title: item
    };
  });
};

export {generateFilters};
