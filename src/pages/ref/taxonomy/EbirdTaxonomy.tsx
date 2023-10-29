import { useState } from 'react';

import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import csvToArray from '../../../utilities/csvToArray';
import type EbirdRecordFormat from '../../../types/EbirdRecordFormat';
import EbirdSpeciesLink from '../../../components/EbirdSpeciesLink';
import type EbirdTaxonomyCategory from '../../../types/EbirdTaxonomyCategory';
import EbirdTaxonomyCategorySelect from '../../../components/EbirdTaxonomyCategorySelect';
import FormatSelect from '../../../components/FormatSelect';
import hybridSortBy from '../../../utilities/hybridSortBy';
import PAGE from './PAGE';
import { SortDirection } from '../../../components/Table/Table';
import SpeciesCommonNameLocaleSelect from '../../../components/SpeciesCommonNameLocaleSelect';
import taxonomyCategoryToLabel from '../../../utilities/taxonomyCategoryToLabel';
import { TextInput } from '../../../components/TextInput';
import { useEbirdTaxonomy } from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useEbirdTaxonomy';
import VersionSelect from '../../../components/VersionSelect';

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
      columns: [
        {
          callback: ({ bandingCodes }) => bandingCodes.join(', '),
          label: 'bandingCodes',
        },
        {
          callback: ({ category }) => category,
          label: 'category',
        },
        {
          callback: ({ comName }) => comName,
          label: 'comName',
        },
        {
          callback: ({ comNameCodes }) => comNameCodes.join(', '),
          label: 'comNameCodes',
        },
        {
          callback: ({ extinct }) => extinct,
          label: 'extinct',
        },
        {
          align: 'right',
          callback: ({ extinctYear }) => extinctYear,
          label: 'extinctYear',
        },
        {
          callback: ({ familyCode }) => familyCode,
          label: 'familyCode',
        },
        {
          callback: ({ familyComName }) => familyComName,
          label: 'familyComName',
        },
        {
          callback: ({ familySciName }) => familySciName,
          label: 'familySciName',
        },
        {
          callback: ({ order }) => order,
          label: 'order',
        },
        {
          callback: ({ reportAs }) => reportAs,
          label: 'reportAs',
        },
        {
          callback: ({ sciName }) => sciName,
          label: 'sciName',
        },
        {
          callback: ({ sciNameCodes }) => sciNameCodes.join(', '),
          label: 'sciNameCodes',
        },
        {
          callback: ({ speciesCode }) => speciesCode,
          label: 'speciesCode',
        },
        {
          callback: ({ taxonOrder }) => taxonOrder,
          label: 'taxonOrder',
        },
      ],
      title: 'Detailed Table',
    },
    {
      columns: [
        {
          callback: ({ comName, speciesCode }) => (
            <EbirdSpeciesLink
              commonName={comName}
              speciesCode={speciesCode}
            />
          ),
          label: 'Common Name',
        },
        {
          callback: ({ speciesCode }) => speciesCode,
          label: 'Species Code',
        },
        {
          callback: ({ category }) => taxonomyCategoryToLabel(category),
          label: 'Category',
        },
        {
          callback: ({ sciName }) => sciName,
          label: 'Scientific Name',
        },
        {
          callback: ({ order }) => order,
          label: 'Order',
        },
        {
          callback: ({ familyComName }) => familyComName,
          label: 'Family Common Name',
        },
        {
          callback: ({ familySciName }) => familySciName,
          label: 'Family Scientific Name',
        },
        {
          callback: ({ extinct }) => (extinct ? 'Yes' : 'No'),
          label: 'Extinct?',
        },
        {
          align: 'right',
          callback: ({ extinctYear }) => extinctYear,
          label: 'Declared Extinct',
          sortConfig: {
            id: 'extinctYearSort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdTaxonomyEntry[]) =>
              hybridSortBy(
                items,
                ({ extinctYear = 0 }: EbirdTaxonomyEntry) => extinctYear
              ).reverse(),
          },
        },
      ],
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
      formContent={formContent}
      formOptionsFieldsetContent={formOptionsFieldsetContent}
      onSubmit={onSubmit}
      page={PAGE.EbirdTaxonomy}
      parser={format === 'csv' ? parser : undefined}
      tables={tables}
    />
  );
}
