import { useContext } from 'react';

import LocaleOptionsContext from '../context/LocaleOptionsContext';
import useTaxaLocaleCodes from '../services/ebird/hooks/endpoints/ref/taxonomy/useTaxaLocaleCodes';
import type EbirdTaxaLocaleCode from '../types/EbirdTaxaLocaleCode';
import {
  AsyncResourceSelect,
  type AsyncResourceSelectProps,
} from './AsyncResourceSelect/AsyncResourceSelect';

type Props = Omit<
  AsyncResourceSelectProps<string>,
  | 'hasQueried'
  | 'id'
  | 'label'
  | 'onLoad'
  | 'onLoadOptionsClick'
  | 'options'
  | 'resourcePlural'
>;

export default function SpeciesCommonNameLocaleSelect(props: Props) {
  const { localeOptions, setLocaleOptions } = useContext(LocaleOptionsContext);

  const getTaxaLocaleCodes = useTaxaLocaleCodes();

  function hasQueried() {
    return localeOptions.length > 1;
  }

  function onLoad(results: EbirdTaxaLocaleCode[]) {
    setLocaleOptions(
      results.map(({ code, name }) => ({ label: name, value: code }))
    );
  }

  return (
    <AsyncResourceSelect<EbirdTaxaLocaleCode>
      {...props}
      hasQueried={hasQueried()}
      id="species-common-name-locale"
      label="Species Common Name Locale"
      onLoad={onLoad}
      onLoadOptionsClick={getTaxaLocaleCodes}
      options={localeOptions}
      resourcePlural="locales"
    />
  );
}
