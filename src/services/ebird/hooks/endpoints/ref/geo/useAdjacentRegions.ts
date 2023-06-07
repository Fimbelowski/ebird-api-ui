import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export default async function useAdjacentRegions(regionCode: string) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  return await useEbirdApi('ref/adjacent/{{regionCode}}', {
    urlParams,
  });
}
