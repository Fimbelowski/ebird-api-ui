import { createContext } from 'react';

import { type SelectOptionArray } from '../components/Select/Select';

interface LocaleOptionsContext {
  localeOptions: SelectOptionArray<string>;
  setLocaleOptions: (newValue: SelectOptionArray<string>) => void;
}

export default createContext<LocaleOptionsContext>({
  localeOptions: [],
  setLocaleOptions: () => {},
});
