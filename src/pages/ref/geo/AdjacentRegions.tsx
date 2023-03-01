import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdRegion from '../../../types/EbirdRegion';
import TextInput from '../../../components/TextInput';
import useApiKey from '../../../hooks/useApiKey';
import useEbirdApi from '../../../hooks/useEbirdApi';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';

export default function AdjacentRegions() {
  const { apiKey } = useApiKey();
  const { getAdjacentRegions } = useEbirdApi();

  const [hasQueried, setHasQueried] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [regions, setRegions] = useState<EbirdRegion[]>([]);

  const tableHeaders: TableHeader[] = [
    {
      label: 'Name',
    },
    {
      label: 'Code',
    },
  ];

  const tableCells: Array<TableCell<EbirdRegion>> = [
    {
      callback: ({ name }) => name,
    },
    {
      callback: ({ code }) => code,
    },
  ];

  function onRegionCodeChange(value: string) {
    setRegionCode(value);
  }

  function onSubmit() {
    setLoading(true);

    getAdjacentRegions(apiKey, regionCode)
      .then(async (response) => await response.text())
      .then((data) => {
        setRawResponse(data);
        setRegions(JSON.parse(data));
        setHasQueried(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const formContent = (
    <TextInput
      id="region-code"
      label="Region Code"
      onChange={onRegionCodeChange}
      placeholder="US-CO"
      required
      value={regionCode}
    />
  );

  const resultsContent = (
    <Details
      open
      summary="Results Table"
    >
      <Table<EbirdRegion>
        cells={tableCells}
        headers={tableHeaders}
        items={regions}
      />
    </Details>
  );

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      resultsContent={resultsContent}
      title="Adjacent Regions"
    />
  );
}
