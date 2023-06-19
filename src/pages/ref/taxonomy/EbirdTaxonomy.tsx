import { useState } from 'react';

import { BasePage } from '../../../components/BasePage/BasePage';
import type EbirdTaxonomyCategory from '../../../types/EbirdTaxonomyCategory';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import { useEbirdTaxonomy } from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useEbirdTaxonomy';
import EbirdTaxonomyCategorySelect from '../../../components/EbirdTaxonomyCategorySelect';
import FormatSelect from '../../../components/FormatSelect';
import LocaleSelect from '../../../components/LocaleSelect/LocaleSelect';

export default function EbirdTaxonomy() {
  const getEbirdTaxonomy = useEbirdTaxonomy();

  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [format, setFormat] = useState<EbirdRecordFormat>('csv');
  const [locale, setLocale] = useState('en');
  const [species, setSpecies] = useState('');
  const [version, setVersion] = useState('');

  function onLoad(results: unknown[]) {}

  async function onSubmit() {
    return await getEbirdTaxonomy(category, format, locale, species, version);
  }

  const formContent = (
    <>
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
      />
      <FormatSelect
        onChange={setFormat}
        value={format}
      />
      <LocaleSelect
        onChange={setLocale}
        value={locale}
      />
    </>
  );

  return (
    <BasePage
      formContent={formContent}
      onLoad={onLoad}
      onSubmit={onSubmit}
      requiresApiKey
      title="eBird Taxonomy"
    />
  );
}
