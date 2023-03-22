import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import Table from '../../components/Table';
import type TableCell from '../../types/TableCell';
import type TableHeader from '../../types/TableHeader';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function SpeciesListRegion() {
  const { getSpeciesListForRegion } = useEbirdApi();

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

  async function request() {
    return await getSpeciesListForRegion(regionCode);
  }

  const formContent = (
    <EbirdRegionCodeInput
      onChange={setRegionCode}
      value={regionCode}
    />
  );

  const resultsContent = (
    <Details
      open
      summary="Results Table"
    >
      <Table<string>
        cells={tableCells}
        headers={tableHeaders}
        items={speciesCodes}
      />
    </Details>
  );

  return (
    <BasePage<string[]>
      formContent={formContent}
      onLoad={setSpeciesCodes}
      request={request}
      resultsContent={resultsContent}
      requiresApiKey
      title="Speciest List for a Region"
    />
  );
}
