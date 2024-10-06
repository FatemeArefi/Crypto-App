const convertData = (data, type) => {
  const convertedData = data[type].map((i) => {
    return {
      date: i[0],
      [type]: i[1],
    };
  });
  return convertedData;
};

export { convertData };
