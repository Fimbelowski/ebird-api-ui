import type ExtendedRouteObject from '../ExtendedRouteObject';
import HotspotInfo from '../../pages/ref/hotspot/HotspotInfo';

const hotspotInfo: ExtendedRouteObject = {
  element: <HotspotInfo />,
  path: 'hotspot-info',
  meta: {
    name: 'Hotspot Info',
  },
};

export default hotspotInfo;
