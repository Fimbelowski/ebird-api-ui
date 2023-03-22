import { type FormEvent, type ReactNode, useEffect, useState } from 'react';

import ApiKeyInput from './ApiKeyInput';
import csvToArray from '../utilities/csvToArray';
import Details from './Details';
import Form from './Form';
import isJson from '../utilities/isJson';
import useLoading from '../hooks/useLoading';

interface Props<T> {
  csvHeaders?: string[];
  csvIgnoreFirstLine?: boolean;
  disableSubmit?: boolean;
  formContent?: ReactNode;
  onLoad: (results: T) => void;
  request: () => Promise<Response>;
  requestOnMount?: boolean;
  requiresApiKey?: boolean;
  resultsContent?: ReactNode;
  title: string;
}

export default function BasePage<T>({
  csvHeaders = [],
  csvIgnoreFirstLine = false,
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
  const [rawResponse, setRawResponse] = useState('');

  useEffect(() => {
    if (requestOnMount) {
      makeRequest();
    }
  }, []);

  function makeRequest() {
    setLoading(true);

    request()
      .then(async (response) => {
        setHasQueried(true);
        return await response.text();
      })
      .then((data) => {
        setRawResponse(data);

        const results = isJson(data)
          ? JSON.parse(data)
          : csvToArray(data, csvHeaders, csvIgnoreFirstLine);

        onLoad(results);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
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
    return hasQueried && !loading;
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
      {showResults() ? (
        <div className="base-page__results-container">
          <Details summary="Raw Response">{rawResponse}</Details>
          {resultsContent}
        </div>
      ) : null}
    </section>
  );
}
