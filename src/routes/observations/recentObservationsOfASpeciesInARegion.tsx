import type ExtendedRouteObject from '../ExtendedRouteObject';
import RecentObservationsOfASpeciesInARegion from '../../pages/obs/RecentObservationsOfASpeciesInARegion';

const recentObservationsOfASpeciesInARegion: ExtendedRouteObject = {
  element: <RecentObservationsOfASpeciesInARegion />,
  path: 'recent-observations-of-a-species-in-a-region',
  meta: {
    name: 'Recent Observations of a Species in a Region',
    requiresApiKey: true,
  },
};

export default recentObservationsOfASpeciesInARegion;
