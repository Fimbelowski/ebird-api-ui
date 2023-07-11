import { Outlet } from 'react-router-dom';

import type ExtendedRouteObject from '../ExtendedRouteObject';
import hotspotInfo from './hotspotInfo';
import hotspotsInARegion from './hotspotsInARegion';
import nearbyHotspots from './nearbyHotspots';

const hotspots: ExtendedRouteObject = {
  children: [hotspotInfo, hotspotsInARegion, nearbyHotspots],
  element: <Outlet />,
  path: 'hotspots',
  meta: {
    name: 'Hotspots',
  },
};

export default hotspots;
