import type ExtendedRouteObject from '../ExtendedRouteObject';
import RegionalStatisticsOnADate from '../../pages/product/RegionalStatisticsOnADate';

const regionalStatisticsOnADate: ExtendedRouteObject = {
  element: <RegionalStatisticsOnADate />,
  path: 'regional-statistics-on-a-date',
  meta: {
    name: 'Regional Statistics on a Date',
    requiresApiKey: true,
  },
};

export default regionalStatisticsOnADate;
