import { type FormEvent, useState } from 'react';

import ApiKeyInput from '../../../components/ApiKeyInput';
import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import Form from '../../../components/Form';
import ResultsContainer from '../../../components/ResultsContainer';
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

  function onSubmit(event: FormEvent) {
    event.preventDefault();

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

  function showResults() {
    return hasQueried && !loading;
  }

  return (
    <BasePage title="Taxa Locale Codes">
      <Form
        loading={loading}
        onSubmit={onSubmit}
      >
        <ApiKeyInput />
      </Form>
      {loading ? <p>Loading...</p> : null}
      {showResults() ? (
        <ResultsContainer>
          <Details summary="Raw Response">{rawResponse}</Details>
          <Details summary="Results Table">
            <Table<EbirdTaxaLocaleCode>
              cells={tableCells}
              headers={tableHeaders}
              items={taxaLocaleCodes}
            />
          </Details>
        </ResultsContainer>
      ) : null}
    </BasePage>
  );
}
