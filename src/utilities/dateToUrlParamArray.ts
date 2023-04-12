import type UrlParam from '../types/UrlParam';

export default function dateToUrlParamArray(date: Date): UrlParam[] {
  return [
    {
      name: 'y',
      value: date.getFullYear(),
    },
    {
      name: 'm',
      value: date.getMonth() + 1,
    },
    {
      name: 'd',
      value: date.getDay(),
    },
  ];
}
