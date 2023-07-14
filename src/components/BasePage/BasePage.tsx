import { type FormEvent, type ReactNode, useEffect, useState } from 'react';

import ApiKeyInput from '../ApiKeyInput/ApiKeyInput';
import { Button } from '../Button/Button';
import Details from '../Details/Details';
import Notification from '../Notification/Notification';
import useLoading from '../../hooks/useLoading';
import Fieldset from '../Fieldset/Fieldset';
import CopyRawResponseButton from '../CopyRawResponseButton/CopyRawResponseButton';
import type Page from '../../types/Page';

export interface ResultsSection {
  content: ReactNode;
  title: string;
}

export interface BasePageProps<T> {
  formContent?: ReactNode;
  formOptionsFieldsetContent?: ReactNode;
  onLoad: (results: T) => void;
  onSubmit: () => Promise<Response>;
  page: Page;
  parser?: (rawResponse: string) => T;
  requestOnMount?: boolean;
  resultsSections: ResultsSection[];
}

export function BasePage<T>({
  formContent,
  formOptionsFieldsetContent,
  onLoad,
  onSubmit: onSubmitProp,
  page: { description, requiresApiKey = false, title },
  parser = (rawResponse) => JSON.parse(rawResponse) as T,
  requestOnMount = false,
  resultsSections,
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

  function resultsContent() {
    const listItems = resultsSections.map(({ content, title }, index) => (
      <Details
        key={title}
        open={index === resultsSections.length - 1}
        summary={title}
      >
        {content}
      </Details>
    ));

    return (
      <>
        <div className="base-page__copy-raw-response">
          <CopyRawResponseButton onClick={onCopyToClipboardClick} />
        </div>
        {listItems}
      </>
    );
  }

  function showResults() {
    return hasQueried && !isError && !noData();
  }

  return (
    <section className="base-page">
      <h2 className="base-page__title">{title}</h2>
      <div className="base-page__info-box">
        <p className="base-page__description">{description}</p>
        {requiresApiKey ? (
          <Notification type="info">
            <p>
              This page requires an eBird API key. To get one, visit{' '}
              <a
                href="https://ebird.org/api/keygen"
                rel="noopener noreferrer"
                target="_blank"
              >
                this page
              </a>{' '}
              and fill out the form.
            </p>
          </Notification>
        ) : null}
      </div>
      {renderForm() ? (
        <form
          className="base-page__form"
          onSubmit={onSubmit}
        >
          {requiresApiKey ? <ApiKeyInput /> : null}
          {formContent}
          {formOptionsFieldsetContent === undefined ? null : (
            <Fieldset legendText="Options">
              {formOptionsFieldsetContent}
            </Fieldset>
          )}
          <Button
            primary
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
              {resultsContent()}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
