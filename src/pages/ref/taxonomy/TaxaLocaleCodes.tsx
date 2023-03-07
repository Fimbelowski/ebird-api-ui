import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useRequestState from '../../../hooks/useRequestState';

export default function TaxaLocaleCodes() {
  const { getTaxaLocaleCodes } = useEbirdApi();
  const {
    hasQueried,
    loading,
    rawResponse,
    setHasQueried,
    setLoading,
    setRawResponse,
  } = useRequestState();

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

    getTaxaLocaleCodes()
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
    <BasePage
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      requiresApiKey
      resultsContent={resultsContent}
      title="Taxa Locale Codes"
    />
  );
}
