import { createContext } from 'react';

import type { SelectOptionArray } from '../components/Select/Select';

interface TaxonomyVersionOptionsContext {
  taxonomyVersionOptions: SelectOptionArray<string>;
  setTaxonomyVersionOptions: (newValue: SelectOptionArray<string>) => void;
}

export default createContext<TaxonomyVersionOptionsContext>({
  taxonomyVersionOptions: [],
  setTaxonomyVersionOptions: () => {},
});
