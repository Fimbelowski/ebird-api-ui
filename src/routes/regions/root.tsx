import type ExtendedRouteObject from '../ExtendedRouteObject';
import regionInfo from './regionInfo';
import subregionList from './subregionList';
import Root from '../../pages/ref/region/Root';

const root: ExtendedRouteObject = {
  children: [regionInfo, subregionList],
  element: <Root />,
  path: 'regions',
};

export default root;
