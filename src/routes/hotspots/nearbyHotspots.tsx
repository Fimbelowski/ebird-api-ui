import type ExtendedRouteObject from '../ExtendedRouteObject';
import NearbyHotspots from '../../pages/ref/hotspot/NearbyHotspots';

const nearbyHotspots: ExtendedRouteObject = {
  element: <NearbyHotspots />,
  path: 'nearby-hotspots',
  meta: {
    name: 'Nearby Hotspots',
  },
};

export default nearbyHotspots;
