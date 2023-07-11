import type ExtendedRouteObject from '../ExtendedRouteObject';
import TaxonomicGroups from '../../pages/ref/taxonomy/TaxonomicGroups';

const taxonomicGroups: ExtendedRouteObject = {
  element: <TaxonomicGroups />,
  path: 'taxonomic-groups',
  meta: {
    name: 'Taxonomic Groups',
    requiresApiKey: true,
  },
};

export default taxonomicGroups;
