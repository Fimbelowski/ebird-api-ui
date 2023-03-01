import { useEffect, useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxonomyVersion from '../../../types/EbirdTaxonomyVersion';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomyVersions() {
  const [hasQueried, setHasQueried] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rawResponse, setRawResponse] = useState('');
  const [versions, setVersions] = useState<EbirdTaxonomyVersion[]>([]);

  const { getTaxonomyVersions } = useEbirdApi();

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
    getTaxonomyVersions().catch((error) => {
      console.error(error);
    });
  }, []);

  function onSubmit() {
    getTaxonomyVersions()
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

  const resultsContent = (
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
  );

  return (
    <BasePage
      hasQueried={hasQueried}
      loading={loading}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      resultsContent={resultsContent}
      title="Taxonomy Versions"
    />
  );
}
