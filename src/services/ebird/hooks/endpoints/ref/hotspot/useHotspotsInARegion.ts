import type EbirdRecordFormat from '../../../../../../types/EbirdRecordFormat';
import useEbirdApi from '../../../useEbirdApi';
import type UrlParam from '../../../../types/UrlParam';
import type QueryParam from '../../../../types/QueryParam';

export default function useHotspotsInARegion() {
  const curriedMakeRequest = useEbirdApi();

  return async function getHotspotsInARegion(
    regionCode: string,
    back?: string,
    format: EbirdRecordFormat = 'csv'
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        name: 'back',
        value: back,
      },
      {
        defaultValue: 'csv',
        name: 'fmt',
        value: format,
      },
    ];

    return await curriedMakeRequest('ref/hotspot/{{regionCode}}', {
      urlParams,
      queryParams,
    });
  };
}
