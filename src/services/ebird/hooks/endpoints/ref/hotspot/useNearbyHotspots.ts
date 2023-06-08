import type EbirdRecordFormat from '../../../../types/EbirdRecordFormat';
import useEbirdApi from '../../../useEbirdApi';
import type {
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';

export default function useNearbyHotspots() {
  const curriedMakeRequest = useEbirdApi();

  return async function getNearbyHotspots(
    latitude: number,
    longitude: number,
    back?: number,
    distance = 25,
    format: EbirdRecordFormat = 'csv'
  ) {
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

    return await curriedMakeRequest('ref/hotspot/geo', {
      queryParams,
    });
  };
}
