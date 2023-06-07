import useEbirdApiRegionSubfolder from './useEbirdApiRegionSubfolder';
import { type QueryParam, type UrlParam } from '../../../../ebirdApiClient';

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
  const urlParams: UrlParam[] = [];

  const queryParams: QueryParam[] = [];

  return await useEbirdApiRegionSubfolder('info/{{regionCode}}', {
    urlParams,
    queryParams,
  });
}
