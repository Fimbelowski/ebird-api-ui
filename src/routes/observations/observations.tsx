import { Outlet } from 'react-router-dom';

import type ExtendedRouteObject from '../ExtendedRouteObject';
import historicObservationsOnADate from './historicObservationsOnADate';
import nearestObservationsOfASpecies from './nearestObservationsOfASpecies';
import recentChecklistsFeed from './recentChecklistsFeed';
import recentNearbyNotableObservations from './recentNearbyNotableObservations';
import recentNearbyObservations from './recentNearbyObservations';
import recentNearbyObservationsOfASpecies from './recentNearbyObservationsOfASpecies';
import recentNotableObservationsInARegion from './recentNotableObservationsInARegion';
import recentObservationsInARegion from './recentObservationsInARegion';
import recentObservationsOfASpeciesInARegion from './recentObservationsOfASpeciesInARegion';

const observations: ExtendedRouteObject = {
  children: [
    historicObservationsOnADate,
    nearestObservationsOfASpecies,
    recentChecklistsFeed,
    recentNearbyNotableObservations,
    recentNearbyObservations,
    recentNearbyObservationsOfASpecies,
    recentNotableObservationsInARegion,
    recentObservationsInARegion,
    recentObservationsOfASpeciesInARegion,
  ],
  element: <Outlet />,
  path: 'observations',
};

export default observations;
