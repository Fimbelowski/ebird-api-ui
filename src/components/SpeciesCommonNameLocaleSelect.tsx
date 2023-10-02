import {
  AsyncResourceSelect,
  type AsyncResourceSelectProps,
} from './AsyncResourceSelect/AsyncResourceSelect';
import type EbirdTaxaLocaleCode from '../types/EbirdTaxaLocaleCode';
import { updateLocaleOptions } from '../store/slices/localeOptionsSlice';
import useAppDispatch from '../store/hooks/useAppDispatch';
import useAppSelector from '../store/hooks/useAppSelector';
import useTaxaLocaleCodes from '../services/ebird/hooks/endpoints/ref/taxonomy/useTaxaLocaleCodes';

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
  const dispatch = useAppDispatch();
  const localeOptions = useAppSelector((state) => state.localeOptions.value);

  const getTaxaLocaleCodes = useTaxaLocaleCodes();

  function hasQueried() {
    return localeOptions.length > 1;
  }

  function onLoad(results: EbirdTaxaLocaleCode[]) {
    dispatch(
      updateLocaleOptions(
        results.map(({ code, name }) => ({ label: name, value: code }))
      )
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
