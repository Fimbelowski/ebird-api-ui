import useEbirdApi from '../../../useEbirdApi';
import type {
  UrlParam,
  QueryParam,
  BaseQueryParam,
} from '../../../../types/EbirdApiParams';

type EbirdRegionNameFormat =
  | 'detailed'
  | 'detailednoqual'
  | 'full'
  | 'namequal'
  | 'nameonly'
  | 'revdetailed';

export default function useRegionInfo() {
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

    const regionNameFormatQueryParam: BaseQueryParam<EbirdRegionNameFormat> = {
      defaultValue: 'full',
      name: 'regionNameFormat',
      value: regionNameFormat,
    };

    const queryParams: QueryParam[] = [
      regionNameFormatQueryParam,
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
