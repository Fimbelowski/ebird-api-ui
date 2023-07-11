import type ExtendedRouteObject from '../ExtendedRouteObject';
import SpeciesListForARegion from '../../pages/product/SpeciesListForARegion';

const speciesListForARegion: ExtendedRouteObject = {
  element: <SpeciesListForARegion />,
  path: 'species-list-for-a-region',
  meta: {
    name: 'Species List for a Region',
    requiresApiKey: true,
  },
};

export default speciesListForARegion;
