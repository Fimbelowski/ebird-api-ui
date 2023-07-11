import type ExtendedRouteObject from '../ExtendedRouteObject';
import Top100 from '../../pages/product/Top100';

const top100: ExtendedRouteObject = {
  element: <Top100 />,
  path: 'top-100',
  meta: {
    name: 'Top 100 Contributors',
    requiresApiKey: true,
  },
};

export default top100;
