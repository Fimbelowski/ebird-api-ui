import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export default function useAdjacentRegions(regionCode: string) {
  const curriedMakeRequest = useEbirdApi();

  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  return async function getAdjacentRegions(regionCode: string) {
    return await curriedMakeRequest('ref/adjacent/{{regionCode}}', {
      urlParams,
    });
  };
}
