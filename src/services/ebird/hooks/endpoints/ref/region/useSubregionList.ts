import type EbirdRecordFormat from '../../../../../../types/EbirdRecordFormat';
import useEbirdApi from '../../../useEbirdApi';
import type EbirdRegionType from '../../../../../../types/EbirdRegionType';
import type UrlParam from '../../../../types/UrlParam';
import type QueryParam from '../../../../types/QueryParam';

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
