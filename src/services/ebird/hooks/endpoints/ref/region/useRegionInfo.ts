import useEbirdApi from '../../../useEbirdApi';
import {
  type QueryParam,
  type UrlParam,
  type BaseQueryParam,
} from '../../../../ebirdApiClient';

type EbirdRegionNameFormat =
  | 'detailed'
  | 'detailednoqual'
  | 'full'
  | 'namequal'
  | 'nameonly'
  | 'revdetailed';

export default async function useRegionInfo(
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

  return await useEbirdApi('ref/region/info/{{regionCode}}', {
    urlParams,
    queryParams,
  });
}
