import type { RouteObject } from 'react-router-dom';

import type RoutePath from './RoutePath';

interface Metable {
  meta?: {
    name: string;
    requiresApiKey?: boolean;
  };
}

interface RoutePathable {
  path: RoutePath;
}

type ExtendedRouteObject = RouteObject & Metable & RoutePathable;

export default ExtendedRouteObject;
