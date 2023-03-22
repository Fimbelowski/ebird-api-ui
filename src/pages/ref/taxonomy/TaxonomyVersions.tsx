import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxonomyVersion from '../../../types/EbirdTaxonomyVersion';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomyVersions() {
  const { getTaxonomyVersions } = useEbirdApi();

  const [versions, setVersions] = useState<EbirdTaxonomyVersion[]>([]);

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
    <BasePage<EbirdTaxonomyVersion[]>
      onLoad={setVersions}
      request={getTaxonomyVersions}
      requestOnMount
      resultsContent={resultsContent}
      title="Taxonomy Versions"
    />
  );
}
