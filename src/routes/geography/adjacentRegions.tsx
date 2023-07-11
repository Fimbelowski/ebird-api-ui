import AdjacentRegions from '../../pages/ref/geo/AdjacentRegions';
import type ExtendedRouteObject from '../ExtendedRouteObject';

const adjacentRegions: ExtendedRouteObject = {
  element: <AdjacentRegions />,
  path: 'adjacent-regions',
  meta: {
    name: 'Adjacent Regions',
    requiresApiKey: true,
  },
};

export default adjacentRegions;
