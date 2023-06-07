import useEbirdApi from '../../useEbirdApi';
import { type UrlParam } from '../../../types/EbirdApiParams';

export default async function useSpeciesListForARegion(regionCode: string) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  return await useEbirdApi('product/spplist/{{regionCode}}', { urlParams });
}
