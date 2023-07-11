import type ExtendedRouteObject from '../ExtendedRouteObject';
import TaxonomicForms from '../../pages/ref/taxonomy/TaxonomicForms';

const taxonomicForms: ExtendedRouteObject = {
  element: <TaxonomicForms />,
  path: 'taxonomic-forms',
  meta: {
    name: 'Taxonomic Forms',
    requiresApiKey: true,
  },
};

export default taxonomicForms;
