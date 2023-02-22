import { type RouteObject } from 'react-router-dom';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import RegionHotspots from './pages/ref/hotspot/RegionHotspots';
import Root from './pages/Root';

const ROUTES: RouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'nearby-hotspots',
        element: <NearbyHotspots />,
      },
      {
        path: 'region-hotspots',
        element: <RegionHotspots />,
      },
    ],
  },
];

export default ROUTES;
