import { useState } from 'react';

import { BasePage } from '../../../components/BasePage/BasePage';
import type EbirdTaxonomyCategory from '../../../types/EbirdTaxonomyCategory';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import { useEbirdTaxonomy } from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useEbirdTaxonomy';
import EbirdTaxonomyCategorySelect from '../../../components/EbirdTaxonomyCategorySelect';
import FormatSelect from '../../../components/FormatSelect';
import LocaleSelect from '../../../components/LocaleSelect/LocaleSelect';
import { TextInput } from '../../../components/TextInput';
import VersionSelect from '../../../components/VersionSelect';

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
      <TextInput
        id="species"
        label="Species (Species Codes, Lowercase, Comma-separated)"
        onChange={setSpecies}
        pattern="^[a-z]{6}\d{0,1}(?:,\s*[a-z]{6}\d{0,1})*$"
        placeholder="virrai, cangoo"
        value={species}
      />
      <VersionSelect
        onChange={setVersion}
        value={version}
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
