import useEbirdApi from '../../useEbirdApi';
import yearMonthDayToUrlParams from '../../../helpers/yearMonthDayToUrlParams';
import { type UrlParam } from '../../../types/EbirdApiParams';

export default function useRegionalStatisticsOnADate() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRegionalStatisticsOnADate(
    regionCode: string,
    year: string,
    month: string,
    day: string
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      ...yearMonthDayToUrlParams(year, month, day),
    ];

    return await curriedMakeRequest(
      'product/stats/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      {
        urlParams,
      }
    );
  };
}
