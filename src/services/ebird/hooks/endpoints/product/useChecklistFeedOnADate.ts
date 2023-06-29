import useEbirdApi from '../../useEbirdApi';
import yearMonthDayToUrlParams from '../../../helpers/yearMonthDayToUrlParams';
import type UrlParam from '../../../types/UrlParam';
import type QueryParam from '../../../types/QueryParam';
import type EbirdChecklistSortBy from '../../../../../types/EbirdChecklistSortBy';

export function useChecklistFeedOnADate() {
  const curriedMakeRequest = useEbirdApi();

  return async function getChecklistFeedOnADate(
    regionCode: string,
    year: string,
    month: string,
    day: string,
    sortKey: EbirdChecklistSortBy = 'obs_dt',
    maxResults = '10'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
      ...yearMonthDayToUrlParams(year, month, day),
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'obs_dt',
        name: 'sortKey',
        value: sortKey,
      },
      {
        defaultValue: '10',
        name: 'maxResults',
        value: maxResults,
      },
    ];

    return await curriedMakeRequest(
      'product/lists/{{regionCode}}/{{y}}/{{m}}/{{d}}',
      {
        urlParams,
        queryParams,
      }
    );
  };
}
