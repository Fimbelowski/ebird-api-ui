import type ExtendedRouteObject from './routes/ExtendedRouteObject';
import geography from './routes/geography/geography';
import hotspots from './routes/hotspots/hotspots';
import observations from './routes/observations/observations';
import product from './routes/product/product';
import regions from './routes/regions/regions';
import Root from './pages/Root';
import taxonomy from './routes/taxonomy/taxonomy';

const ROUTES: ExtendedRouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [geography, hotspots, observations, product, regions, taxonomy],
  },
];

export default ROUTES;
