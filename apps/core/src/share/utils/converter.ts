import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

export const jsonToQueryString = (json: Record<string, any>) => {
  return (
    '?' +
    Object.keys(json)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
      })
      .join('&')
  );
};

export const toQuery = (obj: Record<string, any>) => {
  return Object.keys(obj)
    .filter((key: string) => !!obj[key])
    .reduce((res: any, key: string) => ((res[key] = obj[key].toString()), res), {});
};

export const toDateTime = (date: any, unix = false) => {
  if (unix) return dayjs(date * 1000).toDate();
  return dayjs(date).toDate();
};

export const toAnyDateTime = (date?: any, unix = false) => {
  if (!date) return undefined;
  if (unix) return dayjs(date * 1000).toDate();
  return dayjs(date).toDate();
};

export const isExpired = (iat: Date, exp: Date) => {
  dayjs.extend(isBetween);
  if (dayjs(iat).isAfter(exp)) return true;
  return !dayjs(Date.now()).isBetween(dayjs(iat).subtract(1, 'second'), dayjs(exp).add(1, 'second'), 'second');
};
