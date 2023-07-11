import type ExtendedRouteObject from '../ExtendedRouteObject';
import RegionInfo from '../../pages/ref/region/RegionInfo';

const regionInfo: ExtendedRouteObject = {
  element: <RegionInfo />,
  path: 'region-info',
  meta: {
    name: 'Region Info',
    requiresApiKey: true,
  },
};

export default regionInfo;
