import { type RouteObject } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import ChecklistFeedOnADate from './pages/product/ChecklistFeedOnADate';
import EbirdTaxonomy from './pages/ref/taxonomy/EbirdTaxonomy';
import HistoricObservationsOnADate from './pages/obs/HistoricObservationsOnADate';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import HotspotsInARegion from './pages/ref/hotspot/HotspotsInARegion';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import NearestObservationOfASpecies from './pages/obs/NearestObservationsOfASpecies';
import RecentChecklistsFeed from './pages/obs/RecentChecklistsFeed';
import RecentNearbyNotableObservations from './pages/obs/RecentNearbyNotableObservations';
import RecentNearbyObservations from './pages/obs/RecentNearbyObservations';
import RecentNearbyObservationsOfASpecies from './pages/obs/RecentNearbyObservationsOfASpecies';
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
import ViewChecklist from './pages/product/ViewChecklist';

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
        path: 'ebird-taxonomy',
        element: <EbirdTaxonomy />,
      },
      {
        path: 'historic-observations-on-a-date',
        element: <HistoricObservationsOnADate />,
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
        path: 'nearest-observations-of-a-species',
        element: <NearestObservationOfASpecies />,
      },
      {
        path: 'recent-checklists-feed',
        element: <RecentChecklistsFeed />,
      },
      {
        path: 'recent-nearby-notable-observations',
        element: <RecentNearbyNotableObservations />,
      },
      {
        path: 'recent-nearby-observations',
        element: <RecentNearbyObservations />,
      },
      {
        path: 'recent-nearby-observations-of-a-species',
        element: <RecentNearbyObservationsOfASpecies />,
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
        element: <HotspotsInARegion />,
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
      {
        path: 'view-checklist',
        element: <ViewChecklist />,
      },
    ],
  },
];

export default ROUTES;
