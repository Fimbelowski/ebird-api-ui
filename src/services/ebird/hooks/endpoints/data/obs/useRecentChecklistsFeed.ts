import useEbirdApi from '../../../useEbirdApi';
import type { UrlParam, QueryParam } from '../../../../types/EbirdApiParams';

export default async function useChecklistsFeed(
  regionCode: string,
  maxResults = 10
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  const queryParams: QueryParam[] = [
    {
      defaultValue: 10,
      name: 'maxResults',
      value: maxResults,
    },
  ];

  return await useEbirdApi('product/lists/{{regionCode}}', {
    urlParams,
    queryParams,
  });
}
