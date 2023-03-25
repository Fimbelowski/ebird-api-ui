import { type FormEvent, type ReactNode, useEffect, useState } from 'react';

import ApiKeyInput from './ApiKeyInput';
import Details from './Details';
import type EbirdApiClientResponse from '../types/EbirdApiClientResponse';
import Form from './Form';
import useLoading from '../hooks/useLoading';

interface Props<T> {
  disableSubmit?: boolean;
  formContent?: ReactNode;
  onLoad: (results: T) => void;
  request: () => EbirdApiClientResponse<T>;
  requestOnMount?: boolean;
  requiresApiKey?: boolean;
  resultsContent?: ReactNode;
  title: string;
}

export default function BasePage<T>({
  disableSubmit = false,
  formContent,
  onLoad,
  request,
  requestOnMount = false,
  requiresApiKey = false,
  resultsContent,
  title,
}: Props<T>) {
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

    request()
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
    return hasQueried && rawResponse.length === 0;
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
    return hasQueried && !loading && !isError && !noData();
  }

  return (
    <section className="base-page">
      <h2 className="base-page__title">{title}</h2>
      {renderForm() ? (
        <Form
          disableSubmit={disableSubmit}
          loading={loading}
          onSubmit={onSubmit}
        >
          {requiresApiKey ? <ApiKeyInput /> : null}
          {formContent}
        </Form>
      ) : null}
      {loading ? 'Loading...' : null}
      {isError ? 'An error occured and has been logged to the console. Please check the form and try again.' : null}
      {noData() ? 'No data' : null}
      {showResults() ? (
        <div className="base-page__results-container">
          <Details summary="Raw Response">{rawResponse}</Details>
          {resultsContent}
        </div>
      ) : null}
    </section>
  );
}
