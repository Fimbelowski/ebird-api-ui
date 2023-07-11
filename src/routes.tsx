import ebirdTaxonomy from './routes/taxonomy/ebirdTaxonomy';
import type ExtendedRouteObject from './routes/ExtendedRouteObject';
import geography from './routes/geography/geography';
import historicObservationsOnADate from './routes/observations/historicObservationsOnADate';
import hotspots from './routes/hotspots/hotspots';
import nearestObservationsOfASpecies from './routes/observations/nearestObservationsOfASpecies';
import product from './routes/product/product';
import recentChecklistsFeed from './routes/observations/recentChecklistsFeed';
import recentNearbyNotableObservations from './routes/observations/recentNearbyNotableObservations';
import recentNearbyObservations from './routes/observations/recentNearbyObservations';
import recentNearbyObservationsOfASpecies from './routes/observations/recentNearbyObservationsOfASpecies';
import recentNotableObservationsInARegion from './routes/observations/recentNotableObservationsInARegion';
import recentObservationsInARegion from './routes/observations/recentObservationsInARegion';
import recentObservationsOfASpeciesInARegion from './routes/observations/recentObservationsOfASpeciesInARegion';
import regions from './routes/regions/regions';
import Root from './pages/Root';
import taxaLocaleCodes from './routes/taxonomy/taxaLocaleCodes';
import taxonomicForms from './routes/taxonomy/taxonomicForms';
import taxonomicGroups from './routes/taxonomy/taxonomicGroups';
import taxonomyVersions from './routes/taxonomy/taxonomyVersions';

const ROUTES: ExtendedRouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      ebirdTaxonomy,
      geography,
      historicObservationsOnADate,
      hotspots,
      nearestObservationsOfASpecies,
      product,
      recentChecklistsFeed,
      recentNearbyNotableObservations,
      recentNearbyObservations,
      recentNearbyObservationsOfASpecies,
      recentNotableObservationsInARegion,
      recentObservationsInARegion,
      recentObservationsOfASpeciesInARegion,
      regions,
      taxaLocaleCodes,
      taxonomicForms,
      taxonomicGroups,
      taxonomyVersions,
    ],
  },
];

export default ROUTES;
