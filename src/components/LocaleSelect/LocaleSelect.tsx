import { useContext, useState } from 'react';

import Button from '../Button/Button';
import LocaleOptionsContext from '../../context/LocaleOptionsContext';
import { Select, type SelectProps } from '../Select/Select';
import Tooltip from '../Tooltip/Tooltip';
import useApiKey from '../../hooks/useApiKey';
import useEbirdApi from '../../services/ebird/useEbirdApi';

type Props = Omit<SelectProps<string>, 'id' | 'label' | 'options'>;

export default function LocaleSelect({ disabled, ...rest }: Props) {
  const { localeOptions, setLocaleOptions } = useContext(LocaleOptionsContext);

  const { apiKey } = useApiKey();
  const { getTaxaLocaleCodes } = useEbirdApi();

  const [isLoading, setIsLoading] = useState(false);

  function hasApiKey() {
    return apiKey !== '';
  }

  function hasQueried() {
    return localeOptions.length > 1;
  }

  function loadMoreButtonLabel() {
    return isLoading ? 'Loading...' : 'Load More';
  }

  function onLoadMoreClick() {
    setIsLoading(true);

    getTaxaLocaleCodes()
      .then(({ parsedResponse }) => {
        setLocaleOptions(
          parsedResponse.map(({ code, name }) => ({ label: name, value: code }))
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="locale-select">
      <div className="locale-select__select">
        <Select<string>
          {...rest}
          disabled={(disabled ?? false) || !hasQueried()}
          id="locale"
          label="Locale"
          options={localeOptions}
        />
      </div>
      {hasQueried() ? null : (
        <Tooltip
          disabled={hasApiKey()}
          text="An API key is required to load additional locales."
        >
          <Button
            disabled={!hasApiKey() || isLoading}
            onClick={onLoadMoreClick}
            type="button"
          >
            {loadMoreButtonLabel()}
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
