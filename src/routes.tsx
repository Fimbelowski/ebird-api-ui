import { type RouteObject } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import ChecklistFeedOnADate from './pages/product/ChecklistFeedOnADate';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import HotspotsNearby from './pages/ref/hotspot/HotspotNearby/HotSpotsNearby';
import HotspotsRegion from './pages/ref/hotspot/HotspotsRegion';
import RecentChecklistsFeed from './pages/obs/RecentChecklistsFeed';
import RecentNotableObservationsInARegion from './pages/obs/RecentNotableObservationsInARegion';
import RecentObservationsOfASpeciesInARegion from './pages/obs/RecentObservationsOfASpeciesInARegion';
import RecentObservationsInARegion from './pages/obs/RecentObservationsInARegion';
import RegionInfo from './pages/ref/region/RegionInfo';
import RegionalStatisticsOnADate from './pages/product/RegionalStatisticsOnADate';
import Root from './pages/Root';
import type RouteName from './types/RouteName';
import SpeciesListForARegion from './pages/product/SpeciesListForARegion';
import SubregionList from './pages/ref/region/SubregionList';
import TaxaLocaleCodes from './pages/ref/taxonomy/TaxaLocaleCodes';
import TaxonomicForms from './pages/ref/taxonomy/TaxonomicForms';
import TaxonomicGroups from './pages/ref/taxonomy/TaxonomicGroups';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';
import Top100 from './pages/product/Top100';

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
        element: <ChecklistFeedOnADate />,
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
        element: <RecentObservationsOfASpeciesInARegion />,
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
        element: <RegionalStatisticsOnADate />,
      },
      {
        path: 'species-list-for-a-region',
        element: <SpeciesListForARegion />,
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
        element: <Top100 />,
      },
    ],
  },
];

export default ROUTES;
