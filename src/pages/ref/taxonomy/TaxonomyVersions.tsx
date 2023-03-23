import { useState } from 'react';

import BasePage from '../../../components/BasePage';
import Details from '../../../components/Details';
import type EbirdTaxonomyVersion from '../../../types/EbirdTaxonomyVersion';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useTable from '../../../hooks/useTable';

export default function TaxonomyVersions() {
  const { getTaxonomyVersions } = useEbirdApi();
  const { Table } = useTable<EbirdTaxonomyVersion>(
    [
      {
        callback: ({ authorityVer }) => authorityVer.toString(),
      },
      {
        callback: ({ latest }) => latest.toString(),
      },
    ],
    [
      {
        label: 'Version',
      },
      {
        label: 'Latest',
      },
    ]
  );

  const [versions, setVersions] = useState<EbirdTaxonomyVersion[]>([]);

  const resultsContent = (
    <Details
      open
      summary="Results Table"
    >
      <Table items={versions} />
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
