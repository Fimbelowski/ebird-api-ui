import { type RouteObject } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import ChecklistFeed from './pages/product/ChecklistFeed';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import HotspotsNearby from './pages/ref/hotspot/HotspotNearby/HotSpotsNearby';
import HotspotsRegion from './pages/ref/hotspot/HotspotsRegion';
import RecentChecklistsFeed from './pages/obs/RecentChecklistsFeed';
import RecentNotableObservationsInARegion from './pages/obs/RecentNotableObservationsInARegion';
import RecentObservationsSpeciesRegion from './pages/obs/RecentObservationsSpeciesRegion';
import RecentObservationsInARegion from './pages/obs/RecentObservationsInARegion';
import RegionInfo from './pages/ref/region/RegionInfo';
import RegionStats from './pages/product/RegionStats';
import Root from './pages/Root';
import type RouteName from './types/RouteName';
import SpeciesListRegion from './pages/product/SpeciesListRegion';
import SubregionList from './pages/ref/region/SubregionList';
import TaxaLocaleCodes from './pages/ref/taxonomy/TaxaLocaleCodes';
import TaxonomicForms from './pages/ref/taxonomy/TaxonomicForms';
import TaxonomicGroups from './pages/ref/taxonomy/TaxonomicGroups';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';
import Top100Contributors from './pages/product/Top100Contributors';

const ROUTES: [
  RouteObject & { children: Array<RouteObject & { path: RouteName }> }
] = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'adjacent-regions',
        element: <AdjacentRegions />,
      },
      {
        path: 'checklist-feed-on-a-date',
        element: <ChecklistFeed />,
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
        path: 'recent-checklists-feed',
        element: <RecentChecklistsFeed />,
      },
      {
        path: 'recent-notable-observations-in-a-region',
        element: <RecentNotableObservationsInARegion />,
      },
      {
        path: 'recent-observations-of-a-species-in-a-region',
        element: <RecentObservationsSpeciesRegion />,
      },
      {
        path: 'recent-observations-in-a-region',
        element: <RecentObservationsInARegion />,
      },
      {
        path: 'hotspots-in-a-region',
        element: <HotspotsRegion />,
      },
      {
        path: 'region-info',
        element: <RegionInfo />,
      },
      {
        path: 'regional-statistics-on-a-date',
        element: <RegionStats />,
      },
      {
        path: 'species-list-for-a-region',
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
        path: 'taxonomic-forms',
        element: <TaxonomicForms />,
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
