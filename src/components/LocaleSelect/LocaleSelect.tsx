import { useContext } from 'react';

import LocaleOptionsContext from '../../context/LocaleOptionsContext';
import type { SelectProps } from '../Select/Select';
import useTaxaLocaleCodes from '../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxaLocaleCodes';
import type EbirdTaxaLocaleCode from '../../types/EbirdTaxaLocaleCode';
import AsyncResourceSelect from '../AsyncResourceSelect/AsyncResourceSelect';

type Props = Omit<SelectProps<string>, 'id' | 'label' | 'options'>;

export default function LocaleSelect({ ...props }: Props) {
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
      id="locale"
      label="Locale"
      onLoad={onLoad}
      onLoadMoreClick={getTaxaLocaleCodes}
      options={localeOptions}
      resourcePlural="locales"
    />
  );
}
