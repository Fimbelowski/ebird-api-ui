import { type UrlParam } from '../ebirdApiClient';

export default function yearMonthDayToUrlParams(
  year: number,
  month: number,
  day: number
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
