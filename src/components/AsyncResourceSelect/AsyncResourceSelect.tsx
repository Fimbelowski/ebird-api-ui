import { useState } from 'react';

import useApiKey from '../../hooks/useApiKey';
import Tooltip from '../Tooltip/Tooltip';
import Button from '../Button/Button';
import { Select, type SelectProps } from '../Select/Select';

interface Props<T> extends SelectProps<string> {
  hasQueried: boolean;
  onLoad: (results: T[]) => void;
  onLoadMoreClick: () => Promise<Response>;
  resourcePlural: string;
}

export default function AsyncResourceSelect<T>({
  disabled,
  hasQueried,
  onLoad,
  onLoadMoreClick: onLoadMoreClickProp,
  resourcePlural,
  ...rest
}: Props<T>) {
  const { apiKey } = useApiKey();

  const [isLoading, setIsLoading] = useState(false);

  function hasApiKey() {
    return apiKey !== '';
  }

  function loadMoreButtonLabel() {
    return isLoading ? 'Loading...' : 'Load More';
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

  return (
    <>
      <div className="async-resource-select">
        <div className="async-resource-select__select">
          <Select
            {...rest}
            disabled={disabled}
          />
        </div>
        {hasQueried ? null : (
          <Tooltip
            disabled={hasApiKey()}
            text={`An API key is required to load additional ${resourcePlural}.`}
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
    </>
  );
}
