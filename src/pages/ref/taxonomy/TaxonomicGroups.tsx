import { type FormEvent, useContext, useState } from 'react';

import ApiKeyContext from '../../../context/ApiKeyContext';
import ApiKeyInput from '../../../components/ApiKeyInput';
import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxonomicGroup from '../../../types/EbirdTaxonomicGroup';
import Form from '../../../components/Form';
import type GroupNameLocale from '../../../types/GroupNameLocale';
import ResultsContainer from '../../../components/ResultsContainer';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import type SpeciesGrouping from '../../../types/SpeciesGrouping';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomicGroups() {
  const { apiKey } = useContext(ApiKeyContext);

  const { getTaxonomicGroups } = useEbirdApi();

  const [groupNameLocale, setGroupNameLocale] = useState<GroupNameLocale>('en');
  const [hasQueried, setHasQueried] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');
  const [speciesGrouping, setSpeciesGrouping] =
    useState<SpeciesGrouping>('ebird');
  const [taxonomicGroups, setTaxonomicGroups] = useState<EbirdTaxonomicGroup[]>(
    []
  );

  const groupNameLocaleOptions: Array<SelectOption<GroupNameLocale>> = [
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

  const speciesGroupingSelectOptions: Array<SelectOption<SpeciesGrouping>> = [
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

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    getTaxonomicGroups(apiKey, speciesGrouping, groupNameLocale)
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

  function showResults() {
    return hasQueried && !loading;
  }

  return (
    <BasePage title="Taxonomic Groups">
      <Form
        loading={loading}
        onSubmit={onSubmit}
      >
        <ApiKeyInput />
        <Select<SpeciesGrouping>
          id="species-grouping"
          label="Species Grouping"
          loading={loading}
          onChange={setSpeciesGrouping}
          options={speciesGroupingSelectOptions}
          value={speciesGrouping}
        />
        <Select<GroupNameLocale>
          id="group-name-locale"
          label="Group Name Locale"
          loading={loading}
          onChange={setGroupNameLocale}
          options={groupNameLocaleOptions}
          value={groupNameLocale}
        />
      </Form>
      {loading ? 'Loading...' : null}
      {showResults() ? (
        <ResultsContainer>
          <Details summary="Raw Response">{rawResponse}</Details>
          <Details summary="Results Table">
            <Table<EbirdTaxonomicGroup>
              cells={tableCells}
              headers={tableHeaders}
              items={taxonomicGroups}
            />
          </Details>
        </ResultsContainer>
      ) : null}
    </BasePage>
  );
}
