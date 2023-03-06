import { type RouteObject } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import RegionHotspots from './pages/ref/hotspot/RegionHotspots';
import RegionInfo from './pages/ref/region/RegionInfo';
import Root from './pages/Root';
import SpeciesListRegion from './pages/product/SpeciesListRegion';
import SubregionList from './pages/ref/region/SubregionList';
import TaxaLocaleCodes from './pages/ref/taxonomy/TaxaLocaleCodes';
import TaxonomicGroups from './pages/ref/taxonomy/TaxonomicGroups';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';

const ROUTES: RouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'adjacent-regions',
        element: <AdjacentRegions />,
      },
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
        path: 'region-info',
        element: <RegionInfo />,
      },
      {
        path: 'species-list-region',
        element: <SpeciesListRegion />,
      },
      {
        path: 'sub-region-list',
        element: <SubregionList />,
      },
      {
        path: 'taxa-locale-codes',
        element: <TaxaLocaleCodes />,
      },
      {
        path: 'taxonomic-groups',
        element: <TaxonomicGroups />,
      },
      {
        path: 'taxonomy-versions',
        element: <TaxonomyVersions />,
      },
    ],
  },
];

export default ROUTES;
