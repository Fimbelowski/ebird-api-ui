import { useState } from 'react';

import BasePageList from '../../../components/BasePageList';
import { TextInput } from '../../../components/TextInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomicForms() {
  const { getTaxonomicForms } = useEbirdApi();

  const [speciesCode, setSpeciesCode] = useState('');

  async function request() {
    return await getTaxonomicForms(speciesCode);
  }

  const formContent = (
    <TextInput
      id="species-code"
      label="Species Code"
      onChange={setSpeciesCode}
      placeholder="virrai"
      value={speciesCode}
    />
  );

  return (
    <BasePageList
      formContent={formContent}
      request={request}
      requiresApiKey
      title="Taxonomic Forms"
    />
  );
}
