import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import Table from '../../components/Table';
import type TableCell from '../../types/TableCell';
import type TableHeader from '../../types/TableHeader';
import useApiKey from '../../hooks/useApiKey';
import useEbirdApi from '../../hooks/useEbirdApi';
import useRequestState from '../../hooks/useRequestState';

export default function SpeciesListRegion() {
  const { apiKey } = useApiKey();
  const { getSpeciesListForRegion } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

  const [speciesCodes, setSpeciesCodes] = useState<string[]>([]);
  const [regionCode, setRegionCode] = useState('');

  const tableCells: Array<TableCell<string>> = [
    {
      callback: (speciesCode) => speciesCode,
    },
  ];

  const tableHeaders: TableHeader[] = [
    {
      label: 'Species Code',
    },
  ];

  function onSubmit() {
    setLoading(true);

    getSpeciesListForRegion(apiKey, regionCode)
      .then(async (response) => await response.text())
      .then((data) => {
        setSpeciesCodes(JSON.parse(data));
        setRawResponse(data);
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
    <EbirdRegionCodeInput
      onChange={setRegionCode}
      value={regionCode}
    />
  );

  const resultsContent = (
    <Details summary="Results Table">
      <Table<string>
        cells={tableCells}
        headers={tableHeaders}
        items={speciesCodes}
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
      resultsContent={resultsContent}
      requiresApiKey
      title="Speciest List for a Region"
    />
  );
}
