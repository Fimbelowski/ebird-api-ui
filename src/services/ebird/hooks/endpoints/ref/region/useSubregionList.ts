import { type QueryParam, type UrlParam } from '../../../../ebirdApiClient';
import useEbirdApi from '../../../useEbirdApi';

export type EbirdRegionType = 'country' | 'subnational1' | 'subnational2';

export type EbirdResponseFormat = 'csv' | 'json';

export async function useSubregionList(
  regionType: EbirdRegionType,
  parentRegionCode: string,
  format: EbirdResponseFormat = 'json'
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionType',
      value: regionType,
    },
    {
      name: 'parentRegionCode',
      value: parentRegionCode,
    },
  ];

  const queryParams: QueryParam[] = [
    {
      defaultValue: 'json',
      name: 'fmt',
      value: format,
    },
  ];

  return await useEbirdApi(
    'ref/region/list/{{regionType}}/{{parentRegionCode}}',
    { urlParams, queryParams }
  );
}