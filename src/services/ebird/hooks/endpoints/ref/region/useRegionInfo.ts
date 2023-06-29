import useEbirdApi from '../../../useEbirdApi';
import type UrlParam from '../../../../types/UrlParam';
import type QueryParam from '../../../../types/QueryParam';
import type EbirdRegionNameFormat from '../../../../../../types/EbirdRegionNameFormat';

export function useRegionInfo() {
  const curriedMakeRequest = useEbirdApi();

  return async function getRegionInfo(
    regionCode: string,
    regionNameFormat: EbirdRegionNameFormat = 'full',
    delimiter = ', '
  ) {
    const urlParams: UrlParam[] = [
      {
        name: 'regionCode',
        value: regionCode,
      },
    ];

    const queryParams: QueryParam[] = [
      {
        defaultValue: 'full',
        name: 'regionNameFormat',
        value: regionNameFormat,
      },
      {
        defaultValue: ', ',
        name: 'delim',
        value: delimiter,
      },
    ];

    return await curriedMakeRequest('ref/region/info/{{regionCode}}', {
      urlParams,
      queryParams,
    });
  };
}
