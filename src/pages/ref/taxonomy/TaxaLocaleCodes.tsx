import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useTable from '../../../hooks/useTable';

export default function TaxaLocaleCodes() {
  const { getTaxaLocaleCodes } = useEbirdApi();
  const Table = useTable<EbirdTaxaLocaleCode>(
    [
      {
        callback: ({ name }) => name,
      },
      {
        callback: ({ code }) => code,
      },
      {
        callback: ({ lastUpdate }) => new Date(lastUpdate).toLocaleString(),
      },
    ],
    [
      {
        label: 'Name',
      },
      {
        label: 'Code',
      },
      {
        label: 'Last Update',
      },
    ]
  );

  const [taxaLocaleCodes, setTaxaLocaleCodes] = useState<EbirdTaxaLocaleCode[]>(
    []
  );

  const resultsContent = (
    <>
      <Details
        open
        summary="Results Table"
      >
        <Table items={taxaLocaleCodes} />
      </Details>
    </>
  );

  return (
    <BasePage<EbirdTaxaLocaleCode[]>
      onLoad={setTaxaLocaleCodes}
      request={getTaxaLocaleCodes}
      requiresApiKey
      resultsContent={resultsContent}
      title="Taxa Locale Codes"
    />
  );
}
