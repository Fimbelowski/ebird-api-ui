import { type FormEvent, type ReactNode } from 'react';

import Details from './Details';
import Form from './Form';
import ResultsContainer from './ResultsContainer';

interface Props {
  formContent?: ReactNode;
  hasQueried: boolean;
  loading: boolean;
  onFormSubmit?: () => void;
  rawResponse: string;
  resultsContent?: ReactNode;
  title: string;
}

export default function BasePage({
  formContent,
  hasQueried,
  loading,
  onFormSubmit = () => {},
  rawResponse,
  resultsContent,
  title,
}: Props) {
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    onFormSubmit();
  }

  function showResults() {
    return hasQueried && !loading;
  }

  return (
    <section className="base-page">
      <h2 className="base-page__title">{title}</h2>
      {formContent !== undefined ? (
        <Form
          loading={loading}
          onSubmit={onSubmit}
        >
          {formContent}
        </Form>
      ) : null}
      {loading ? 'Loading...' : null}
      {showResults() ? (
        <ResultsContainer>
          <Details summary="Raw Response">{rawResponse}</Details>
          {resultsContent}
        </ResultsContainer>
      ) : null}
    </section>
  );
}
