import { Outlet } from 'react-router-dom';

import ebirdTaxonomy from './ebirdTaxonomy';
import type ExtendedRouteObject from '../ExtendedRouteObject';
import taxaLocaleCodes from './taxaLocaleCodes';
import taxonomicForms from './taxonomicForms';
import taxonomicGroups from './taxonomicGroups';
import taxonomyVersions from './taxonomyVersions';

const taxonomy: ExtendedRouteObject = {
  children: [
    ebirdTaxonomy,
    taxaLocaleCodes,
    taxonomicForms,
    taxonomicGroups,
    taxonomyVersions,
  ],
  element: <Outlet />,
  path: 'taxonomy',
};

export default taxonomy;
