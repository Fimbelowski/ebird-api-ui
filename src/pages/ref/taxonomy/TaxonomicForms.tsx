import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import TextInput from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomicForms() {
  const { getTaxonomicForms } = useEbirdApi();

  const [speciesCode, setSpeciesCode] = useState('');
  const [taxonomicForms, setTaxonomicForms] = useState<string[]>([]);

  function ResultsList() {
    const listItems = taxonomicForms.map((form) => <li key={form}>{form}</li>);

    return <ul className="taxonomic-forms__list">{listItems}</ul>;
  }

  async function request() {
    return await getTaxonomicForms(speciesCode);
  }

  const formContent = (
    <TextInput
      id="species-code"
      label="Species Code"
      onChange={setSpeciesCode}
      placeholder="virrai"
    />
  );

  const resultsContent = (
    <Details
      open
      summary="Results"
    >
      <ResultsList />
    </Details>
  );

  return (
    <BasePage<string[]>
      formContent={formContent}
      onLoad={setTaxonomicForms}
      request={request}
      requiresApiKey
      resultsContent={resultsContent}
      title="Taxonomic Forms"
    />
  );
}
