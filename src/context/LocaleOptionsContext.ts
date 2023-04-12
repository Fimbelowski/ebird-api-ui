import { createContext } from 'react';

import { type SelectOptionArray } from '../components/Select';

interface LocaleOptionsContext {
  localeOptions: SelectOptionArray<string>;
  setLocaleOptions: (newValue: SelectOptionArray<string>) => void;
}

export default createContext<LocaleOptionsContext>({
  localeOptions: [],
  setLocaleOptions: () => {},
});
