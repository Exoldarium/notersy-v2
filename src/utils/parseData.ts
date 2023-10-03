// helpers for validating and parsing values
export const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

export const isBool = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean' || bool instanceof Boolean;
};

export const isDate = (date: unknown): boolean => {
  if (!isString(date)) throw new Error('Invalid title or content input');
  return Boolean(Date.parse(date));
};

export const parseToString = (param: unknown): string => {
  if (!isString(param)) throw new Error('Invalid title or content input');

  return param;
};

export const parseToBool = (param: unknown): boolean => {
  if (!isBool(param)) throw new Error('Invalid active property input');

  return param;
};

export const parseDate = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) throw new Error('Invalid date input');

  return param;
};

export const parseError = (error: unknown) => {
  let errorMessage = 'There was an error.';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  return errorMessage;
};