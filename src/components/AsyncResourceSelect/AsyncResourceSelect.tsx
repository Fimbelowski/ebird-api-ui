import { useState } from 'react';

import useApiKey from '../../hooks/useApiKey';
import Tooltip from '../Tooltip/Tooltip';
import Button from '../Button/Button';
import { Select, type SelectProps } from '../Select/Select';

export interface AsyncResourceSelectProps<T> extends SelectProps<string> {
  hasQueried: boolean;
  onLoad: (results: T[]) => void;
  onLoadMoreClick: () => Promise<Response>;
  resourcePlural: string;
}

export function AsyncResourceSelect<T>({
  disabled = false,
  hasQueried,
  onLoad,
  onLoadMoreClick: onLoadMoreClickProp,
  options,
  resourcePlural,
  ...rest
}: AsyncResourceSelectProps<T>) {
  const { apiKey } = useApiKey();

  const [isLoading, setIsLoading] = useState(false);

  function hasApiKey() {
    return apiKey !== '';
  }

  function loadMoreButtonLabel() {
    return isLoading ? 'Loading...' : 'Load Options';
  }

  function onLoadMoreClick() {
    setIsLoading(true);

    onLoadMoreClickProp()
      .then(async (response) => await response.json())
      .then((json) => {
        onLoad(json as T[]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function selectDisabled() {
    return disabled || options.length === 1;
  }

  return (
    <Tooltip
      disabled={hasApiKey()}
      text={`An API key is required to load additional ${resourcePlural}.`}
    >
      <div className="async-resource-select">
        <div className="async-resource-select__select">
          <Select
            {...rest}
            disabled={selectDisabled()}
            options={options}
          />
        </div>
        {hasQueried ? null : (
          <Button
            disabled={!hasApiKey() || isLoading}
            onClick={onLoadMoreClick}
            type="button"
          >
            {loadMoreButtonLabel()}
          </Button>
        )}
      </div>
    </Tooltip>
  );
}
