import type ExtendedRouteObject from '../ExtendedRouteObject';
import RecentNearbyObservations from '../../pages/obs/RecentNearbyObservations';

const recentNearbyObservations: ExtendedRouteObject = {
  element: <RecentNearbyObservations />,
  path: 'recent-nearby-observations',
  meta: {
    name: 'Recent Nearby Observations',
    requiresApiKey: true,
  },
};

export default recentNearbyObservations;
