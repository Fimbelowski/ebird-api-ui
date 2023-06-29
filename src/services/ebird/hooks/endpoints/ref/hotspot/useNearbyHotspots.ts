import type EbirdRecordFormat from '../../../../../../types/EbirdRecordFormat';
import useEbirdApi from '../../../useEbirdApi';
import type QueryParam from '../../../../types/QueryParam';

export default function useNearbyHotspots() {
  const curriedMakeRequest = useEbirdApi();

  return async function getNearbyHotspots(
    latitude: string,
    longitude: string,
    back?: string,
    distance = '25',
    format: EbirdRecordFormat = 'csv'
  ) {
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
        defaultValue: '25',
        name: 'dist',
        value: distance,
      },
      {
        defaultValue: 'csv',
        name: 'fmt',
        value: format,
      },
    ];

    return await curriedMakeRequest('ref/hotspot/geo', {
      queryParams,
    });
  };
}
