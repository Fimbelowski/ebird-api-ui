import useEbirdApi from '../../../useEbirdApi';
import type { UrlParam, QueryParam } from '../../../../types/EbirdApiParams';

export default function useChecklistsFeed() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRecentChecklists(
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

    return await curriedMakeRequest('product/lists/{{regionCode}}', {
      urlParams,
      queryParams,
    });
  };
}
