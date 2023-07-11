import { Outlet } from 'react-router-dom';

import type ExtendedRouteObject from '../ExtendedRouteObject';
import regionInfo from './regionInfo';
import subregionList from './subregionList';

const regions: ExtendedRouteObject = {
  children: [regionInfo, subregionList],
  element: <Outlet />,
  path: 'regions',
  meta: {
    name: 'Regions',
  },
};

export default regions;
