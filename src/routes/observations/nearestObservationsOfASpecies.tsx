import type ExtendedRouteObject from '../ExtendedRouteObject';
import NearestObservationOfASpecies from '../../pages/obs/NearestObservationsOfASpecies';

const nearestObservationsOfASpecies: ExtendedRouteObject = {
  element: <NearestObservationOfASpecies />,
  path: 'nearest-observations-of-a-species',
  meta: {
    name: 'Nearest Observations of a Species',
    requiresApiKey: true,
  },
};

export default nearestObservationsOfASpecies;
