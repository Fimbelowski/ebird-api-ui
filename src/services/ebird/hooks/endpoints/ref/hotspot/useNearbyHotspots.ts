import type EbirdRecordFormat from '../../../../types/EbirdRecordFormat';
import useEbirdApi from '../../../useEbirdApi';
import type {
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';

export default async function useNearbyHotspots(
  latitude: number,
  longitude: number,
  back?: number,
  distance = 25,
  format: EbirdRecordFormat = 'csv'
) {
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
      name: 'lat',
      value: latitude,
    },
    {
      name: 'lng',
      value: longitude,
    },
    {
      name: 'back',
      value: back,
    },
    {
      defaultValue: 25,
      name: 'dist',
      value: distance,
    },
    formatQueryParam,
  ];

  return await useEbirdApi('ref/hotspot/geo?lat={{lat}}&lng={{lng}}', {
    queryParams,
  });
}
