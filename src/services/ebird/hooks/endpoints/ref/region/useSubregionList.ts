import type EbirdRecordFormat from '../../../../types/EbirdRecordFormat';
import { type QueryParam, type UrlParam } from '../../../../ebirdApiClient';
import useEbirdApiRegionSubfolder from './useEbirdApiRegionSubfolder';

export type EbirdRegionType = 'country' | 'subnational1' | 'subnational2';

export async function useSubregionList(
  regionType: EbirdRegionType,
  parentRegionCode: string,
  format: EbirdRecordFormat = 'json'
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

  return await useEbirdApiRegionSubfolder(
    'list/{{regionType}}/{{parentRegionCode}}',
    { urlParams, queryParams }
  );
}
