import { type RouteObject } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import ChecklistFeedOnDate from './pages/product/ChecklistFeedOnDate';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import HotspotsNearby from './pages/ref/hotspot/HotSpotsNearby';
import HotspotsRegion from './pages/ref/hotspot/HotspotsRegion';
import RegionInfo from './pages/ref/region/RegionInfo';
import RegionalStatsOnDate from './pages/product/RegionalStatsOnDate';
import Root from './pages/Root';
import SpeciesListRegion from './pages/product/SpeciesListRegion';
import SubregionList from './pages/ref/region/SubregionList';
import TaxaLocaleCodes from './pages/ref/taxonomy/TaxaLocaleCodes';
import TaxonomicGroups from './pages/ref/taxonomy/TaxonomicGroups';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';
import Top100Contributors from './pages/product/Top100Contributors';

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
        path: 'checklist-feed-on-date',
        element: <ChecklistFeedOnDate />,
      },
      {
        path: 'hotspot-info',
        element: <HotspotInfo />,
      },
      {
        path: 'nearby-hotspots',
        element: <HotspotsNearby />,
      },
      {
        path: 'region-hotspots',
        element: <HotspotsRegion />,
      },
      {
        path: 'region-info',
        element: <RegionInfo />,
      },
      {
        path: 'region-stats-on-date',
        element: <RegionalStatsOnDate />,
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
      {
        path: 'top-100',
        element: <Top100Contributors />,
      },
    ],
  },
];

export default ROUTES;
