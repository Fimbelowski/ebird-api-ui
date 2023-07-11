import type ExtendedRouteObject from '../ExtendedRouteObject';
import RecentNotableObservationsInARegion from '../../pages/obs/RecentNotableObservationsInARegion';

const recentNotableObservationsInARegion: ExtendedRouteObject = {
  element: <RecentNotableObservationsInARegion />,
  path: 'recent-notable-observations-in-a-region',
  meta: {
    name: 'Recent Notable Observations in a Region',
    requiresApiKey: true,
  },
};

export default recentNotableObservationsInARegion;
