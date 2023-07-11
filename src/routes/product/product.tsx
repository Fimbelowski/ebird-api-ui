import { Outlet } from 'react-router-dom';

import checklistFeedOnADate from './checklistFeedOnADate';
import type ExtendedRouteObject from '../ExtendedRouteObject';
import regionalStatisticsOnADate from './regionalStatisticsOnADate';
import speciesListForARegion from './speciesListForARegion';
import top100 from './top100';
import viewChecklist from './viewChecklist';

const product: ExtendedRouteObject = {
  children: [
    checklistFeedOnADate,
    regionalStatisticsOnADate,
    speciesListForARegion,
    top100,
    viewChecklist,
  ],
  element: <Outlet />,
  path: 'product',
};

export default product;
