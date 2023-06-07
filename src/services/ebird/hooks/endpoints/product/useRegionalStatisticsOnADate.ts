import useEbirdApi from '../../useEbirdApi';
import { type UrlParam } from '../../../ebirdApiClient';
import yearMonthDayToUrlParams from '../../../helpers/yearMonthDayToUrlParams';

export default async function useRegionalStatisticsOnADate(
  regionCode: string,
  year: number,
  month: number,
  day: number
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
    ...yearMonthDayToUrlParams(year, month, day),
  ];

  return await useEbirdApi('product/stats/{{regionCode}}/{{y}}/{{m}}/{{d}}', {
    urlParams,
  });
}
