import type EbirdRecordFormat from '../../../../types/EbirdRecordFormat';
import type { UrlParam, QueryParam } from '../../../../types/EbirdApiParams';
import useEbirdApi from '../../../useEbirdApi';

export type EbirdRegionType = 'country' | 'subnational1' | 'subnational2';

export function useSubregionList() {
  const curriedMakeRequest = useEbirdApi();

  return async function getSubregionList(
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

    return await curriedMakeRequest(
      'ref/region/list/{{regionType}}/{{parentRegionCode}}',
      { urlParams, queryParams }
    );
  };
}
