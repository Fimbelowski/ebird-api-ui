import { type FormEvent, type ReactNode, useEffect, useState } from 'react';

import ApiKeyInput from './ApiKeyInput/ApiKeyInput';
import Button from './Button/Button';
import Details from './Details/Details';
import type EbirdApiClientResponse from '../types/EbirdApiClientResponse';
import useLoading from '../hooks/useLoading';

export interface BasePageProps<T> {
  disableSubmit?: boolean;
  formContent?: ReactNode;
  onLoad: (results: T) => void;
  onSubmit: () => EbirdApiClientResponse<T>;
  requestOnMount?: boolean;
  requiresApiKey?: boolean;
  resultsContent?: ReactNode;
  title: string;
}

export function BasePage<T>({
  disableSubmit = false,
  formContent,
  onLoad,
  onSubmit: onSubmitProp,
  requestOnMount = false,
  requiresApiKey = false,
  resultsContent,
  title,
}: BasePageProps<T>) {
  const { loading, setLoading } = useLoading();

  const [hasQueried, setHasQueried] = useState(false);
  const [isError, setIsError] = useState(false);
  const [rawResponse, setRawResponse] = useState('');

  useEffect(() => {
    if (requestOnMount) {
      makeRequest();
    }
  }, []);

  function makeRequest() {
    setLoading(true);
    setIsError(false);

    onSubmitProp()
      .then(({ parsedResponse, rawResponse }) => {
        setHasQueried(true);
        setRawResponse(rawResponse);
        onLoad(parsedResponse);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function noData() {
    return hasQueried && (rawResponse.length === 0 || rawResponse === '[]');
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    makeRequest();
  }

  function renderForm() {
    return formContent !== undefined || requiresApiKey;
  }

  function showResults() {
    return hasQueried && !isError && !noData();
  }

  return (
    <section className="base-page">
      <h2 className="base-page__title">{title}</h2>
      {renderForm() ? (
        <form
          className="base-page__form"
          onSubmit={onSubmit}
        >
          {requiresApiKey ? <ApiKeyInput /> : null}
          {formContent}
          <Button
            disabled={disableSubmit}
            loading={loading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      ) : null}
      {loading ? (
        'Loading...'
      ) : (
        <>
          {isError
            ? 'An error occured and has been logged to the console. Please check the form and try again.'
            : null}
          {noData() ? 'No data' : null}
          {showResults() ? (
            <div className="base-page__results-container">
              <Details summary="Raw Response">{rawResponse}</Details>
              {resultsContent}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
