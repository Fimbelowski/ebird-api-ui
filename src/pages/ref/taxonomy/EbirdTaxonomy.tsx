import { useState } from 'react';

import { BasePage } from '../../../components/BasePage/BasePage';
import type EbirdTaxonomyCategory from '../../../types/EbirdTaxonomyCategory';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import { useEbirdTaxonomy } from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useEbirdTaxonomy';

export default function EbirdTaxonomy() {
  const getEbirdTaxonomy = useEbirdTaxonomy();

  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [format, setFormat] = useState<EbirdRecordFormat>('csv');
  const [locale, setLocale] = useState('en');
  const [species, setSpecies] = useState('');
  const [version, setVersion] = useState('');

  async function onSubmit() {
    return await getEbirdTaxonomy(category, format, locale, species, version);
  }

  return (
    <BasePage
      onSubmit={onSubmit}
      requiresApiKey
      title="eBird Taxonomy"
    />
  );
}
