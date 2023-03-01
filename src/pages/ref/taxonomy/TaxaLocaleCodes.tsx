import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useApiKey from '../../../hooks/useApiKey';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxaLocaleCodes() {
  const { apiKey } = useApiKey();
  const { getTaxaLocaleCodes } = useEbirdApi();

  const [hasQueried, setHasQueried] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState('');
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

  function onSubmit() {
    setLoading(true);

    getTaxaLocaleCodes(apiKey)
      .then(async (response) => await response.text())
      .then((data) => {
        setHasQueried(true);
        setRawResponse(data);
        setTaxaLocaleCodes(JSON.parse(data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function ResultsContent() {
    return (
      <>
        <Details summary="Results Table">
          <Table<EbirdTaxaLocaleCode>
            cells={tableCells}
            headers={tableHeaders}
            items={taxaLocaleCodes}
          />
        </Details>
      </>
    );
  }

  return (
    <BasePage
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      resultsContent={<ResultsContent />}
      title="Taxa Locale Codes"
    />
  );
}
