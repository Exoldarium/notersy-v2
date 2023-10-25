const getDate = (): string => {
  const epoch = Date.now();
  const date = new Date(epoch).toString();

  return date.substring(0, 24);
};

export {
  getDate,
};