import { format } from 'date-fns';
import BigNumber from 'bignumber.js';

export const cutString = (str: string, takeFirst: number, takeLast: number) => {
  if (!str || str.length <= takeFirst + takeLast) {
    return str;
  }

  return (
    str.substring(0, takeFirst) +
    '...' +
    str.substring(str.length - takeLast, str.length)
  );
};

export const capitalizeString = (str: string) => {
  if (!str || str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const bigNumberToStr = (number: BigNumber, decimalPlaces: number) => {
  return number.decimalPlaces(decimalPlaces, BigNumber.ROUND_DOWN).toFormat();
};

export const dateToStr = (date: Date, dateFormat: string) => {
  return format(date, dateFormat);
};
