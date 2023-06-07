import useEbirdApiRefFolder from '../useEbirdApiRefFolder';
import { type UrlParam } from '../../../../ebirdApiClient';

export default async function useAdjacentRegions(regionCode: string) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  return await useEbirdApiRefFolder('adjacent/{{regionCode}}', {
    urlParams,
  });
}
