import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export default async function useHotspotInfo(locationId: string) {
  const urlParams: UrlParam[] = [
    {
      name: 'locId',
      value: locationId,
    },
  ];

  return await useEbirdApi('ref/hotspot/info/{{locId}}', { urlParams });
}
