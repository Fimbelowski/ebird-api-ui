import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxaLocaleCodes() {
  const { getTaxaLocaleCodes } = useEbirdApi();

  const [taxaLocaleCodes, setTaxaLocaleCodes] = useState<EbirdTaxaLocaleCode[]>(
    []
  );

  const tableCells: Array<TableCell<EbirdTaxaLocaleCode>> = [
    {
      callback: ({ name }) => name,
    },
    {
      callback: ({ code }) => code,
    },
    {
      callback: ({ lastUpdate }) => new Date(lastUpdate).toLocaleString(),
    },
  ];

  const tableHeaders: TableHeader[] = [
    {
      label: 'Name',
    },
    {
      label: 'Code',
    },
    {
      label: 'Last Update',
    },
  ];

  const resultsContent = (
    <>
      <Details
        open
        summary="Results Table"
      >
        <Table<EbirdTaxaLocaleCode>
          cells={tableCells}
          headers={tableHeaders}
          items={taxaLocaleCodes}
        />
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
