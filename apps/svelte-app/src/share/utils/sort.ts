import { SortsType } from '../modules/tables';

export const sortToObj = (sort: string) => {
  let sorts = sort.split(',');
  let result: SortsType = {};

  sorts.forEach(el => {
    if (el != '') {
      let s = el.split(':');
      result[s[0]] = s[1];
    }
  });

  return result;
};
