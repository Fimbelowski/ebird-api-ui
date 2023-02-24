import { type RouteObject } from 'react-router-dom';

import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import RegionHotspots from './pages/ref/hotspot/RegionHotspots';
import Root from './pages/Root';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';

const ROUTES: RouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'hotspot-info',
        element: <HotspotInfo />,
      },
      {
        path: 'nearby-hotspots',
        element: <NearbyHotspots />,
      },
      {
        path: 'region-hotspots',
        element: <RegionHotspots />,
      },
      {
        path: 'taxonomy-versions',
        element: <TaxonomyVersions />,
      },
    ],
  },
];

export default ROUTES;
