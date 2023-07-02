import { useState } from 'react';

import BasePageList from '../../../components/BasePageList/BasePageList';
import EbirdSpeciesCodeInput from '../../../components/EbirdSpeciesCodeInput';
import useTaxonomicForms from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomicForms';

export default function TaxonomicForms() {
  const getTaxonomicForms = useTaxonomicForms();

  const [speciesCode, setSpeciesCode] = useState('');

  async function onSubmit() {
    return await getTaxonomicForms(speciesCode);
  }

  const formContent = (
    <EbirdSpeciesCodeInput
      onChange={setSpeciesCode}
      value={speciesCode}
      required
    />
  );

  return (
    <BasePageList
      description="For a given species, fetches a list of subspecies recognised by the eBird taxonomy (including the given species)."
      formContent={formContent}
      onSubmit={onSubmit}
      requiresApiKey
      title="Taxonomic Forms"
    />
  );
}
