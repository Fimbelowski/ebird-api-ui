import EbirdTaxonomy from '../../pages/ref/taxonomy/EbirdTaxonomy';
import type ExtendedRouteObject from '../ExtendedRouteObject';

const ebirdTaxonomy: ExtendedRouteObject = {
  element: <EbirdTaxonomy />,
  path: 'ebird-taxonomy',
  meta: {
    name: 'eBird Taxonomy',
    requiresApiKey: true,
  },
};

export default ebirdTaxonomy;
