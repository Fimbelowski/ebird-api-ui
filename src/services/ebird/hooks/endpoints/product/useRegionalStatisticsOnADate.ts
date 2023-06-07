import useEbirdApi from '../../useEbirdApi';
import { type UrlParam } from '../../../ebirdApiClient';

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

  return await useEbirdApi('product/stats/{{regionCode}}/{{y}}/{{m}}/{{d}}', {
    urlParams,
  });
}
