import { type RouteObject } from 'react-router-dom';
import Root from './pages/Root';
import Geo from './pages/ref/hotspot/Geo';

const ROUTES: RouteObject[] = [
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'geo',
        element: <Geo />,
      },
    ],
  },
];

export default ROUTES;
