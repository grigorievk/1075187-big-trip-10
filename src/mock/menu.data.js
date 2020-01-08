const menuNames = [
  `Table`, `Stats`
];

const generateMenu = () => {
  return menuNames.map((item) => {
    return {
      name: item
    };
  });
};

export {generateMenu};
