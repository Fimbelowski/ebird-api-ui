import type ExtendedRouteObject from '../ExtendedRouteObject';
import RecentObservationsInARegion from '../../pages/obs/RecentObservationsInARegion';

const recentObservationsInARegion: ExtendedRouteObject = {
  element: <RecentObservationsInARegion />,
  path: 'recent-observations-in-a-region',
  meta: {
    name: 'Recent Observations in a Region',
    requiresApiKey: true,
  },
};

export default recentObservationsInARegion;
