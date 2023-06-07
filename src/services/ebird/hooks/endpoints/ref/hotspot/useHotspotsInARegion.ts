import type EbirdRecordFormat from '../../../../types/EbirdRecordFormat';
import useEbirdApiHotspotSubfolder from './useEbirdApiHotspotSubfolder';
import {
  type BaseQueryParam,
  type UrlParam,
  type QueryParam,
} from '../../../../ebirdApiClient';

export default async function useHotspotsInARegion(
  regionCode: string,
  back?: number,
  format: EbirdRecordFormat = 'csv'
) {
  const urlParams: UrlParam[] = [
    {
      name: 'regionCode',
      value: regionCode,
    },
  ];

  /* 
    For query parameters that use a union type of literals, the union type must be
    specified as a generic argument, otherwise defaultValue and value are allowed
    to be anything as long as their types match and they extend QueryParamValue.
  */
  const formatQueryParam: BaseQueryParam<EbirdRecordFormat> = {
    defaultValue: 'csv',
    name: 'fmt',
    value: format,
  };

  const queryParams: QueryParam[] = [
    {
      name: 'back',
      value: back,
    },
    formatQueryParam,
  ];

  return await useEbirdApiHotspotSubfolder('{{regionCode}}', {
    urlParams,
    queryParams,
  });
}
