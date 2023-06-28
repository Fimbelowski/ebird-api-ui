import type EbirdRecordFormat from '../../../../../../types/EbirdRecordFormat';
import useEbirdApi from '../../../useEbirdApi';
import type {
  BaseQueryParam,
  QueryParam,
} from '../../../../types/EbirdApiParams';
import type UrlParam from '../../../../types/UrlParam';

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

    return await curriedMakeRequest('ref/hotspot/{{regionCode}}', {
      urlParams,
      queryParams,
    });
  };
}
