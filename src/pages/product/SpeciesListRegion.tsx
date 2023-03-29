import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../../components/Table';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function SpeciesListRegion() {
  const { getSpeciesListForRegion } = useEbirdApi();

  const [speciesCodes, setSpeciesCodes] = useState<string[]>([]);
  const [regionCode, setRegionCode] = useState('');

  const tableCells: TableCellArray<string> = [
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
      <Table
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
