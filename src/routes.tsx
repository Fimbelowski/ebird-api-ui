import { type RouteObject } from 'react-router-dom';
import Root from './pages/Root';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';

const ROUTES: RouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'nearby-hotspots',
        element: <NearbyHotspots />,
      },
    ],
  },
];

export default ROUTES;
