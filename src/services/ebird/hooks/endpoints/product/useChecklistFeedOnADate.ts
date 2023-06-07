import useEbirdApi from '../../useEbirdApi';
import {
  type UrlParam,
  type QueryParam,
  type BaseQueryParam,
} from '../../../ebirdApiClient';

type SortKey = 'obs_dt' | 'creation_dt';

export default async function useChecklistFeedOnADate(
  regionCode: string,
  year: number,
  month: number,
  day: number,
  sortKey: SortKey = 'obs_dt',
  maxResults = 10
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

  const sortKeyQueryParam: BaseQueryParam<SortKey> = {
    defaultValue: 'obs_dt',
    name: 'sortKey',
    value: sortKey,
  };

  const queryParams: QueryParam[] = [
    sortKeyQueryParam,
    {
      defaultValue: 10,
      name: 'maxResults',
      value: maxResults,
    },
  ];

  return await useEbirdApi('product/lists/{{regionCode}}/{{y}}/{{m}}/{{d}}', {
    urlParams,
    queryParams,
  });
}
