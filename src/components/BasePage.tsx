import { type FormEvent, type ReactNode } from 'react';

import ApiKeyInput from './ApiKeyInput';
import Details from './Details';
import Form from './Form';

interface Props {
  formContent?: ReactNode;
  hasQueried: boolean;
  loading: boolean;
  onFormSubmit?: () => void;
  rawResponse: string;
  requiresApiKey?: boolean;
  resultsContent?: ReactNode;
  title: string;
}

export default function BasePage({
  formContent,
  hasQueried,
  loading,
  onFormSubmit = () => {},
  rawResponse,
  requiresApiKey = false,
  resultsContent,
  title,
}: Props) {
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    onFormSubmit();
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
