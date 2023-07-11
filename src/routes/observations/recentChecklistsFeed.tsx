import type ExtendedRouteObject from '../ExtendedRouteObject';
import RecentChecklistsFeed from '../../pages/obs/RecentChecklistsFeed';

const recentChecklistsFeed: ExtendedRouteObject = {
  element: <RecentChecklistsFeed />,
  path: 'recent-checklists-feed',
  meta: {
    name: 'Recent Checklists',
    requiresApiKey: true,
  },
};

export default recentChecklistsFeed;
