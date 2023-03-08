import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxonomicGroup from '../../../types/EbirdTaxonomicGroup';
import type EbirdGroupNameLocale from '../../../types/EbirdGroupNameLocale';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import type EbirdSpeciesGrouping from '../../../types/EbirdSpeciesGrouping';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useRequestState from '../../../hooks/useRequestState';

export default function TaxonomicGroups() {
  const { getTaxonomicGroups } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [groupNameLocale, setGroupNameLocale] =
    useState<EbirdGroupNameLocale>('en');
  const [speciesGrouping, setSpeciesGrouping] =
    useState<EbirdSpeciesGrouping>('ebird');
  const [taxonomicGroups, setTaxonomicGroups] = useState<EbirdTaxonomicGroup[]>(
    []
  );

  const groupNameLocaleOptions: Array<SelectOption<EbirdGroupNameLocale>> = [
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

  const speciesGroupingSelectOptions: Array<
    SelectOption<EbirdSpeciesGrouping>
  > = [
    {
      label: 'eBird',
      value: 'ebird',
    },
    {
      label: 'Merlin',
      value: 'merlin',
    },
  ];

  const tableCells: Array<TableCell<EbirdTaxonomicGroup>> = [
    {
      callback: ({ groupName }) => groupName,
    },
    {
      callback: ({ groupOrder }) => groupOrder.toString(),
    },
    {
      callback: ({ taxonOrderBounds }) => taxonOrderBounds[0].join(', '),
    },
  ];

  const tableHeaders: TableHeader[] = [
    {
      label: 'Name',
    },
    {
      label: 'Order',
    },
    {
      label: 'Taxon Order Bounds',
    },
  ];

  const formContent = (
    <>
      <Select<EbirdSpeciesGrouping>
        id="species-grouping"
        label="Species Grouping"
        loading={loading}
        onChange={setSpeciesGrouping}
        options={speciesGroupingSelectOptions}
        value={speciesGrouping}
      />
      <Select<EbirdGroupNameLocale>
        id="group-name-locale"
        label="Group Name Locale"
        loading={loading}
        onChange={setGroupNameLocale}
        options={groupNameLocaleOptions}
        value={groupNameLocale}
      />
    </>
  );

  const resultsContent = (
    <Details
      open
      summary="Results Table"
    >
      <Table<EbirdTaxonomicGroup>
        cells={tableCells}
        headers={tableHeaders}
        items={taxonomicGroups}
      />
    </Details>
  );

  function onSubmit() {
    setLoading(true);

    getTaxonomicGroups(speciesGrouping, groupNameLocale)
      .then(async (response) => await response.text())
      .then((data) => {
        setRawResponse(data);
        setTaxonomicGroups(JSON.parse(data));
        setHasQueried(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      resultsContent={resultsContent}
      title="Taxonomic Groups"
    />
  );
}
