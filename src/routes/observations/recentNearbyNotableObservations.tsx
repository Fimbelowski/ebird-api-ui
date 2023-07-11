import type ExtendedRouteObject from '../ExtendedRouteObject';
import RecentNearbyNotableObservations from '../../pages/obs/RecentNearbyNotableObservations';

const recentNearbyNotableObservations: ExtendedRouteObject = {
  element: <RecentNearbyNotableObservations />,
  path: 'recent-nearby-notable-observations',
  meta: {
    name: 'Recent Nearby Notable Observations',
    requiresApiKey: true,
  },
};

export default recentNearbyNotableObservations;
