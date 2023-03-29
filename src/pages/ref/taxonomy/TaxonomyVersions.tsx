import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxonomyVersion from '../../../types/EbirdTaxonomyVersion';
import {
  Table,
  type TableCellArray,
  type TableHeader,
} from '../../../components/Table';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxonomyVersions() {
  const { getTaxonomyVersions } = useEbirdApi();

  const [versions, setVersions] = useState<EbirdTaxonomyVersion[]>([]);

  const tableCells: TableCellArray<EbirdTaxonomyVersion> = [
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
      <Table
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
