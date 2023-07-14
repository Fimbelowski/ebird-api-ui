import { useState } from 'react';

import BasePageList from '../../../components/BasePageList/BasePageList';
import EbirdSpeciesCodeInput from '../../../components/EbirdSpeciesCodeInput';
import useTaxonomicForms from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomicForms';
import PAGE from './PAGE';

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
      formContent={formContent}
      onSubmit={onSubmit}
      page={PAGE.TaxonomicForms}
    />
  );
}
