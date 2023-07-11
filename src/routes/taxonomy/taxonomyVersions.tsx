import type ExtendedRouteObject from '../ExtendedRouteObject';
import TaxonomyVersions from '../../pages/ref/taxonomy/TaxonomyVersions';

const taxonomyVersions: ExtendedRouteObject = {
  element: <TaxonomyVersions />,
  path: 'taxonomy-versions',
  meta: {
    name: 'Taxonomy Versions',
  },
};

export default taxonomyVersions;
