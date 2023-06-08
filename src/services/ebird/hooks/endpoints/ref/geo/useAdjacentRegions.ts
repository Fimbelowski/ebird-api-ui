import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export default function useAdjacentRegions() {
  const curriedMakeRequest = useEbirdApi();

  return async function getAdjacentRegions(regionCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    return await curriedMakeRequest('ref/adjacent/{{regionCode}}', {
      urlParams,
    });
  };
}
