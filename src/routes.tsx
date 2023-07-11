import adjacentRegions from './routes/geography/adjacentRegions';
import checklistFeedOnADate from './routes/product/checklistFeedOnADate';
import ebirdTaxonomy from './routes/taxonomy/ebirdTaxonomy';
import type ExtendedRouteObject from './routes/ExtendedRouteObject';
import historicObservationsOnADate from './routes/observations/historicObservationsOnADate';
import hotspotInfo from './routes/hotspots/hotspotInfo';
import hotspotsInARegion from './routes/hotspots/hotspotsInARegion';
import nearbyHotspots from './routes/hotspots/nearbyHotspots';
import nearestObservationsOfASpecies from './routes/observations/nearestObservationsOfASpecies';
import recentChecklistsFeed from './routes/observations/recentChecklistsFeed';
import recentNearbyNotableObservations from './routes/observations/recentNearbyNotableObservations';
import recentNearbyObservations from './routes/observations/recentNearbyObservations';
import recentNearbyObservationsOfASpecies from './routes/observations/recentNearbyObservationsOfASpecies';
import recentNotableObservationsInARegion from './routes/observations/recentNotableObservationsInARegion';
import recentObservationsInARegion from './routes/observations/recentObservationsInARegion';
import recentObservationsOfASpeciesInARegion from './routes/observations/recentObservationsOfASpeciesInARegion';
import regionInfo from './routes/regions/regionInfo';
import regionalStatisticsOnADate from './routes/product/regionalStatisticsOnADate';
import Root from './pages/Root';
import speciesListForARegion from './routes/product/speciesListForARegion';
import subregionList from './routes/regions/subregionList';
import taxaLocaleCodes from './routes/taxonomy/taxaLocaleCodes';
import taxonomicForms from './routes/taxonomy/taxonomicForms';
import taxonomicGroups from './routes/taxonomy/taxonomicGroups';
import taxonomyVersions from './routes/taxonomy/taxonomyVersions';
import top100 from './routes/product/top100';
import viewChecklist from './routes/product/viewChecklist';

const ROUTES: ExtendedRouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      adjacentRegions,
      checklistFeedOnADate,
      ebirdTaxonomy,
      historicObservationsOnADate,
      hotspotInfo,
      hotspotsInARegion,
      nearbyHotspots,
      nearestObservationsOfASpecies,
      recentChecklistsFeed,
      recentNearbyNotableObservations,
      recentNearbyObservations,
      recentNearbyObservationsOfASpecies,
      recentNotableObservationsInARegion,
      recentObservationsInARegion,
      recentObservationsOfASpeciesInARegion,
      regionInfo,
      regionalStatisticsOnADate,
      speciesListForARegion,
      subregionList,
      taxaLocaleCodes,
      taxonomicForms,
      taxonomicGroups,
      taxonomyVersions,
      top100,
      viewChecklist,
    ],
  },
];

export default ROUTES;
