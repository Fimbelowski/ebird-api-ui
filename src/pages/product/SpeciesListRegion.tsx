import { useState } from 'react';

import BasePage from '../../components/BasePage';
import Details from '../../components/Details';
import EbirdRegionCodeInput from '../../components/EbirdRegionCodeInput';
import useEbirdApi from '../../hooks/useEbirdApi';
import useTable from '../../hooks/useTable';

export default function SpeciesListRegion() {
  const { getSpeciesListForRegion } = useEbirdApi();
  const { Table } = useTable<string>(
    [
      {
        callback: (speciesCode) => speciesCode,
      },
    ],
    [
      {
        label: 'Species Code',
      },
    ]
  );

  const [speciesCodes, setSpeciesCodes] = useState<string[]>([]);
  const [regionCode, setRegionCode] = useState('');

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
      <Table items={speciesCodes} />
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
