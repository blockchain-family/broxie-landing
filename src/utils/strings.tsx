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
