import type ExtendedRouteObject from '../ExtendedRouteObject';
import SubregionList from '../../pages/ref/region/SubregionList';

const subregionList: ExtendedRouteObject = {
  element: <SubregionList />,
  path: 'sub-region-list',
  meta: {
    name: 'Sub-Region List',
    requiresApiKey: true,
  },
};

export default subregionList;
