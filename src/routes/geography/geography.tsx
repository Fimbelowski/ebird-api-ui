import { Outlet } from 'react-router-dom';

import type ExtendedRouteObject from '../ExtendedRouteObject';
import adjacentRegions from './adjacentRegions';

const geography: ExtendedRouteObject = {
  children: [adjacentRegions],
  element: <Outlet />,
  path: 'geography',
  meta: {
    name: 'Geography',
  },
};

export default geography;
