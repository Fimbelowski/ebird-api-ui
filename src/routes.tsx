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
import taxonomy from './routes/taxonomy/taxonomy';

const ROUTES: ExtendedRouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
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
      taxonomy,
    ],
  },
];

export default ROUTES;
