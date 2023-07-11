import type ExtendedRouteObject from '../ExtendedRouteObject';
import TaxaLocaleCodes from '../../pages/ref/taxonomy/TaxaLocaleCodes';

const taxaLocaleCodes: ExtendedRouteObject = {
  element: <TaxaLocaleCodes />,
  path: 'taxa-locale-codes',
  meta: {
    name: 'Taxa Locale Codes',
    requiresApiKey: true,
  },
};

export default taxaLocaleCodes;
