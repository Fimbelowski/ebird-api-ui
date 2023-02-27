import { useEffect, useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxonomyVersion from '../../../types/EbirdTaxonomyVersion';
import ResultsContainer from '../../../components/ResultsContainer';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../utilities/useEbirdApi';
import useApiKeyRequired from '../../../hooks/useApiKeyRequired';

export default function TaxonomyVersions() {
  useApiKeyRequired(false);

  const [hasQueried, setHasQueried] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rawResponse, setRawResponse] = useState('');
  const [versions, setVersions] = useState<EbirdTaxonomyVersion[]>([]);

  const ebirdApi = useEbirdApi();

  const tableCells: Array<TableCell<EbirdTaxonomyVersion>> = [
    {
      callback: ({ authorityVer }) => authorityVer.toString(),
    },
    {
      callback: ({ latest }) => latest.toString(),
    },
  ];

  const tableHeaders: TableHeader[] = [
    {
      label: 'Version',
    },
    {
      label: 'Latest',
    },
  ];

  useEffect(() => {
    getTaxonomyVersions();
  }, []);

  function getTaxonomyVersions() {
    ebirdApi
      .getTaxonomyVersions()
      .then(async (response) => await response.text())
      .then((data) => {
        setRawResponse(data);
        setVersions(JSON.parse(data));
        setHasQueried(true);
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
    <BasePage title="Taxonomy Versions">
      {loading ? <p>Loading...</p> : null}
      {showResults() ? (
        <ResultsContainer>
          <Details summary="Raw Response">{rawResponse}</Details>
          <Details
            open
            summary="Results Table"
          >
            <Table<EbirdTaxonomyVersion>
              cells={tableCells}
              headers={tableHeaders}
              items={versions}
            />
          </Details>
        </ResultsContainer>
      ) : null}
    </BasePage>
  );
}
