import useEbirdApi from '../../../useEbirdApi';
import { type UrlParam } from '../../../../types/EbirdApiParams';

export default function useHotspotInfo() {
  const curriedMakeRequest = useEbirdApi();

  return async function getHotspotInfo(locationId: string) {
    const urlParams: UrlParam[] = [
      {
        name: 'locId',
        value: locationId,
      },
    ];

    return await curriedMakeRequest('ref/hotspot/info/{{locId}}', {
      urlParams,
    });
  };
}
