import { useState } from 'react';

import BasePageList from '../../../components/BasePageList/BasePageList';
import EbirdSpeciesCodeInput from '../../../components/EbirdSpeciesCodeInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomicForms() {
  const { getTaxonomicForms } = useEbirdApi();

  const [speciesCode, setSpeciesCode] = useState('');

  async function onSubmit() {
    return await getTaxonomicForms(speciesCode);
  }

  const formContent = (
    <EbirdSpeciesCodeInput
      onChange={setSpeciesCode}
      value={speciesCode}
    />
  );

  return (
    <BasePageList
      formContent={formContent}
      onSubmit={onSubmit}
      requiresApiKey
      title="Taxonomic Forms"
    />
  );
}
