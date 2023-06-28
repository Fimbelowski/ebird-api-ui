import type UrlParam from '../types/UrlParam';

export default function yearMonthDayToUrlParams(
  year: string,
  month: string,
  day: string
) {
  const urlParams: UrlParam[] = [
    {
      name: 'y',
      value: year,
    },
    {
      name: 'm',
      value: month,
    },
    {
      name: 'd',
      value: day,
    },
  ];

  return urlParams;
}
