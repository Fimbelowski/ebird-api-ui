import { useState } from 'react';

import { BasePage } from '../../../components/BasePage/BasePage';
import type EbirdTaxonomyCategory from '../../../types/EbirdTaxonomyCategory';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';

export default function EbirdTaxonomy() {
  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [format, setFormat] = useState<EbirdRecordFormat>('csv');
  const [locale, setLocale] = useState('en');
  const [species, setSpecies] = useState('');
  const [version, setVersion] = useState('');

  return (
    <BasePage
      requiresApiKey
      title="eBird Taxonomy"
    />
  );
}
