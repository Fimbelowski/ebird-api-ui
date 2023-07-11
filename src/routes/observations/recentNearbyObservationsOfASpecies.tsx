import type ExtendedRouteObject from '../ExtendedRouteObject';
import RecentNearbyObservationsOfASpecies from '../../pages/obs/RecentNearbyObservationsOfASpecies';

const recentNearbyObservationsOfASpecies: ExtendedRouteObject = {
  element: <RecentNearbyObservationsOfASpecies />,
  path: 'recent-nearby-observations-of-a-species',
  meta: {
    name: 'Recent Nearby Observations of a Species',
    requiresApiKey: true,
  },
};

export default recentNearbyObservationsOfASpecies;
