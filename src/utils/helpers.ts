export const getDate = () => {
  const date = new Date();

  return date.toLocaleDateString('en-GB');
};