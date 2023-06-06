import type EbirdRecordFormat from '../../../../types/EbirdRecordFormat';
import useEbirdApi from '../../../useEbirdApi';
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

  // Without specifying EbirdRecordFormat here, defaultValue and value are allowed to be any two strings.
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

  return await useEbirdApi('ref/hotspot/{{regionCode}}', {
    urlParams,
    queryParams,
  });
}
