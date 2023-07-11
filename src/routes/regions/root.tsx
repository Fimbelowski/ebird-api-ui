import { Outlet } from 'react-router-dom';

import type ExtendedRouteObject from '../ExtendedRouteObject';
import regionInfo from './regionInfo';
import subregionList from './subregionList';

const root: ExtendedRouteObject = {
  children: [regionInfo, subregionList],
  element: <Outlet />,
  path: 'regions',
};

export default root;
