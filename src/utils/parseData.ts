export const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

const isDate = (date: unknown): boolean => {
  if (!isString(date)) throw new Error('Invalid title or content input');
  return Boolean(Date.parse(date));
};

export const parseToString = (param: unknown): string => {
  if (!isString(param)) throw new Error('Invalid title or content input');

  return param;
};

export const parseDate = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) throw new Error('Invalid date input');

  return param;
};