import { useState } from 'react';

import type EbirdTaxonomyCategory from '../../../types/EbirdTaxonomyCategory';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import { useEbirdTaxonomy } from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useEbirdTaxonomy';
import EbirdTaxonomyCategorySelect from '../../../components/EbirdTaxonomyCategorySelect';
import FormatSelect from '../../../components/FormatSelect';
import SpeciesCommonNameLocaleSelect from '../../../components/SpeciesCommonNameLocaleSelect';
import { TextInput } from '../../../components/TextInput';
import VersionSelect from '../../../components/VersionSelect';
import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import taxonomyCategoryToLabel from '../../../utilities/taxonomyCategoryToLabel';
import csvToArray from '../../../utilities/csvToArray';

interface EbirdTaxonomyEntry {
  bandingCodes: string[];
  category: Exclude<EbirdTaxonomyCategory, ''>;
  comName: string;
  comNameCodes: string[];
  extinct: boolean;
  extinctYear?: number;
  familyCode?: string;
  familyComName?: string;
  familySciName?: string;
  order?: string;
  reportAs: string;
  sciName: string;
  sciNameCodes: string[];
  speciesCode: string;
  taxonOrder: number;
}

export default function EbirdTaxonomy() {
  const getEbirdTaxonomy = useEbirdTaxonomy();

  const [category, setCategory] = useState<EbirdTaxonomyCategory>('');
  const [format, setFormat] = useState<EbirdRecordFormat>('csv');
  const [locale, setLocale] = useState('en');
  const [species, setSpecies] = useState('');
  const [version, setVersion] = useState('');

  const tables: Tables<EbirdTaxonomyEntry> = [
    {
      cells: [
        {
          callback: ({ bandingCodes }) => bandingCodes.join(', '),
        },
        {
          callback: ({ category }) => category,
        },
        {
          callback: ({ comName }) => comName,
        },
        {
          callback: ({ comNameCodes }) => comNameCodes.join(', '),
        },
        {
          callback: ({ extinct }) => extinct,
        },
        {
          align: 'right',
          callback: ({ extinctYear }) => extinctYear,
        },
        {
          callback: ({ familyCode }) => familyCode,
        },
        {
          callback: ({ familyComName }) => familyComName,
        },
        {
          callback: ({ familySciName }) => familySciName,
        },
        {
          callback: ({ order }) => order,
        },
        {
          callback: ({ reportAs }) => reportAs,
        },
        {
          callback: ({ sciName }) => sciName,
        },
        {
          callback: ({ sciNameCodes }) => sciNameCodes.join(', '),
        },
        {
          callback: ({ speciesCode }) => speciesCode,
        },
        {
          callback: ({ taxonOrder }) => taxonOrder,
        },
      ],
      headers: [
        {
          label: 'bandingCodes',
        },
        {
          label: 'category',
        },
        {
          label: 'comName',
        },
        {
          label: 'comNameCodes',
        },
        {
          label: 'extinct',
        },
        {
          align: 'right',
          label: 'extinctYear',
        },
        {
          label: 'familyCode',
        },
        {
          label: 'familyComName',
        },
        {
          label: 'familySciName',
        },
        {
          label: 'order',
        },
        {
          label: 'reportAs',
        },
        {
          label: 'sciName',
        },
        {
          label: 'sciNameCodes',
        },
        {
          label: 'speciesCode',
        },
        {
          label: 'taxonOrder',
        },
      ],
      title: 'Detailed Table',
    },
    {
      cells: [
        {
          callback: ({ speciesCode }) => speciesCode,
        },
        {
          callback: ({ category }) => taxonomyCategoryToLabel(category),
        },
        {
          callback: ({ comName }) => comName,
        },
        {
          callback: ({ sciName }) => sciName,
        },
        {
          callback: ({ order }) => order,
        },
        {
          callback: ({ familyComName }) => familyComName,
        },
        {
          callback: ({ familySciName }) => familySciName,
        },
        {
          callback: ({ extinct }) => (extinct ? 'Yes' : 'No'),
        },
        {
          align: 'right',
          callback: ({ extinctYear }) => extinctYear,
        },
      ],
      headers: [
        {
          label: 'Species Code',
        },
        {
          label: 'Category',
        },
        {
          label: 'Common Name',
        },
        {
          label: 'Scientific Name',
        },
        {
          label: 'Order',
        },
        {
          label: 'Family Common Name',
        },
        {
          label: 'Family Scientific Name',
        },
        {
          label: 'Extinct?',
        },
        {
          align: 'right',
          label: 'Declared Extinct',
        },
      ],
      open: true,
      title: 'Simplified Table',
    },
  ];

  async function onSubmit() {
    return await getEbirdTaxonomy(category, format, locale, species, version);
  }

  function parser(rawResponse: string) {
    return csvToArray<EbirdTaxonomyEntry>(
      rawResponse,
      [
        'sciName',
        'comName',
        'speciesCode',
        'category',
        'taxonOrder',
        'comNameCodes',
        'sciNameCodes',
        'bandingCodes',
        'order',
        'familyComName',
        'familySciName',
        'reportAs',
        'extinct',
        'extinctYear',
        'familyCode',
      ],
      {
        bandingCodes: (stringValue: string) => [stringValue],
        comNameCodes: (stringValue: string) => [stringValue],
        extinct: (stringValue: string) => Boolean(stringValue),
        extinctYear: (stringValue: string) =>
          stringValue === '' ? undefined : parseInt(stringValue),
        sciNameCodes: (stringValue: string) => [stringValue],
        taxonOrder: (stringValue: string) => parseInt(stringValue),
      },
      true
    );
  }

  const formContent = (
    <>
      <EbirdTaxonomyCategorySelect
        onChange={setCategory}
        value={category}
      />
      <TextInput
        id="species"
        label="Species (Species Codes, Lowercase, Comma-separated)"
        onChange={setSpecies}
        pattern="^(?:[a-z]{2,6}\d{0,2}|[xy]\d{5})(?:\s*,\s*(?:[a-z]{2,6}\d{0,2}|[xy]\d{5}))*$"
        placeholder="virrai, cangoo"
        value={species}
      />
      <VersionSelect
        onChange={setVersion}
        value={version}
      />
    </>
  );

  const formOptionsFieldsetContent = (
    <>
      <SpeciesCommonNameLocaleSelect
        onChange={setLocale}
        value={locale}
      />
      <FormatSelect
        onChange={setFormat}
        value={format}
      />
    </>
  );

  return (
    <BasePageTable<EbirdTaxonomyEntry>
      description="Fetches the taxonomy (species, species codes, common names, scientific names, etc.) used by Ebird"
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      parser={format === 'csv' ? parser : undefined}
      requiresApiKey
      tables={tables}
      title="eBird Taxonomy"
    />
  );
}
