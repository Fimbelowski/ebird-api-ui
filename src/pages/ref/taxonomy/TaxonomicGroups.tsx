import { useState } from 'react';

import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import type EbirdTaxonomicGroup from '../../../types/EbirdTaxonomicGroup';
import type EbirdGroupNameLocale from '../../../types/EbirdGroupNameLocale';
import type EbirdSpeciesGrouping from '../../../types/EbirdSpeciesGrouping';
import { Select, type SelectOptionArray } from '../../../components/Select';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomicGroups() {
  const { getTaxonomicGroups } = useEbirdApi();

  const [groupNameLocale, setGroupNameLocale] =
    useState<EbirdGroupNameLocale>('en');
  const [speciesGrouping, setSpeciesGrouping] =
    useState<EbirdSpeciesGrouping>('ebird');

  const tables: Tables<EbirdTaxonomicGroup> = [
    {
      cells: [
        {
          callback: ({ groupName }) => groupName,
        },
        {
          callback: ({ groupOrder }) => groupOrder.toString(),
        },
        {
          callback: ({ taxonOrderBounds }) => taxonOrderBounds[0].join(', '),
        },
      ],
      headers: [
        {
          label: 'Name',
        },
        {
          label: 'Order',
        },
        {
          label: 'Taxon Order Bounds',
        },
      ],
      open: true,
      title: 'Results Table',
    },
  ];

  const groupNameLocaleOptions: SelectOptionArray<EbirdGroupNameLocale> = [
    {
      label: 'Bulgarian',
      value: 'bg',
    },
    {
      label: 'Chinese, Mandarin (Traditional)',
      value: 'zh',
    },
    {
      label: 'Czech',
      value: 'cs',
    },
    {
      label: 'Danish',
      value: 'da',
    },
    {
      label: 'Dutch',
      value: 'nl',
    },
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'French',
      value: 'fr',
    },
    {
      label: 'German',
      value: 'de',
    },
    {
      label: 'Hebrew',
      value: 'he',
    },
    {
      label: 'Icelandic',
      value: 'is',
    },
    {
      label: 'Norwegian',
      value: 'no',
    },
    {
      label: 'Portuguese, Brazil',
      value: 'pt_BR',
    },
    {
      label: 'Portuguese, Portugal',
      value: 'pt_PT',
    },
    {
      label: 'Russian',
      value: 'ru',
    },
    {
      label: 'Serbian',
      value: 'sr',
    },
    {
      label: 'Spanish, Argentina',
      value: 'es_AR',
    },
    {
      label: 'Spanish, Chile',
      value: 'es_CL',
    },
    {
      label: 'Spanish, Cuba',
      value: 'es_CU',
    },
    {
      label: 'Spanish, Mexico',
      value: 'es_MX',
    },
    {
      label: 'Spanish, Panama',
      value: 'es_PA',
    },
    {
      label: 'Spanish, Spain',
      value: 'es_ES',
    },
    {
      label: 'Thai',
      value: 'th',
    },
    {
      label: 'Turkish',
      value: 'th',
    },
  ];

  const speciesGroupingOptions: SelectOptionArray<EbirdSpeciesGrouping> = [
    {
      label: 'eBird',
      value: 'ebird',
    },
    {
      label: 'Merlin',
      value: 'merlin',
    },
  ];

  async function request() {
    return await getTaxonomicGroups(speciesGrouping, groupNameLocale);
  }

  const formContent = (
    <>
      <Select<EbirdSpeciesGrouping>
        id="species-grouping"
        label="Species Grouping"
        onChange={setSpeciesGrouping}
        options={speciesGroupingOptions}
        value={speciesGrouping}
      />
      <Select<EbirdGroupNameLocale>
        id="group-name-locale"
        label="Group Name Locale"
        onChange={setGroupNameLocale}
        options={groupNameLocaleOptions}
        value={groupNameLocale}
      />
    </>
  );

  return (
    <BasePageTable<EbirdTaxonomicGroup>
      formContent={formContent}
      request={request}
      requiresApiKey
      tables={tables}
      title="Taxonomic Groups"
    />
  );
}
