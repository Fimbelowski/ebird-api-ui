import { type FormEvent, type ReactNode, useEffect, useState } from 'react';

import ApiKeyInput from '../ApiKeyInput/ApiKeyInput';
import Button from '../Button/Button';
import Details from '../Details/Details';
import useLoading from '../../hooks/useLoading';

export interface BasePageProps<T> {
  description: string;
  formContent?: ReactNode;
  onLoad: (results: T) => void;
  onSubmit: () => Promise<Response>;
  parser?: (rawResponse: string) => T;
  requestOnMount?: boolean;
  requiresApiKey?: boolean;
  resultsContent?: ReactNode;
  title: string;
}

export function BasePage<T>({
  description,
  formContent,
  onLoad,
  onSubmit: onSubmitProp,
  parser = (rawResponse) => JSON.parse(rawResponse) as T,
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
      .then(async (response) => await response.text())
      .then((rawResponse) => {
        setRawResponse(rawResponse);

        const parsedResponse = parser(rawResponse);
        onLoad(parsedResponse);

        setHasQueried(true);
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

  function onCopyToClipboardClick() {
    navigator.clipboard.writeText(rawResponse).catch((error) => {
      console.error(error);
    });
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
      <p className="base-page__description">{description}</p>
      {renderForm() ? (
        <form
          className="base-page__form"
          onSubmit={onSubmit}
        >
          {requiresApiKey ? <ApiKeyInput /> : null}
          {formContent}
          <Button type="submit">Submit</Button>
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
              <Details summary="Raw Response">
                <div className="base-page__copy-to-clipboard">
                  <Button
                    onClick={onCopyToClipboardClick}
                    type="button"
                  >
                    Copy to Clipboard
                  </Button>
                </div>
                <div>{rawResponse}</div>
              </Details>
              {resultsContent}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
