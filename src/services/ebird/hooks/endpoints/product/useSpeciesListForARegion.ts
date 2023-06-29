import useEbirdApi from '../../useEbirdApi';
import type UrlParam from '../../../types/UrlParam';

export default function useSpeciesListForARegion() {
  const curriedMakeRequest = useEbirdApi();

  return async function getSpeciesListForARegion(regionCode: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    return await curriedMakeRequest('product/spplist/{{regionCode}}', {
      urlParams,
    });
  };
}
