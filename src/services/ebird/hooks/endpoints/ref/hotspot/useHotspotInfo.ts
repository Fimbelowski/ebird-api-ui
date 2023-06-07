import useEbirdApiHotspotSubfolder from './useEbirdApiHotspotSubfolder';
import { type UrlParam } from '../../../../ebirdApiClient';

export default async function useHotspotInfo(locationId: string) {
  const urlParams: UrlParam[] = [
    {
      name: 'locId',
      value: locationId,
    },
  ];

  return await useEbirdApiHotspotSubfolder('info/{{locId}}', { urlParams });
}
