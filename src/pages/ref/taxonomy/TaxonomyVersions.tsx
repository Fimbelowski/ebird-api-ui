import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import useTaxonomyVersions from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomyVersions';
import type EbirdTaxonomyVersion from '../../../types/EbirdTaxonomyVersion';

export default function TaxonomyVersions() {
  const getTaxonomyVersions = useTaxonomyVersions();

  const tables: Tables<EbirdTaxonomyVersion> = [
    {
      cells: [
        {
          callback: ({ authorityVer }) => authorityVer.toString(),
        },
        {
          callback: ({ latest }) => latest.toString(),
        },
      ],
      headers: [
        {
          label: 'Version',
        },
        {
          label: 'Latest',
        },
      ],
      title: 'Results Table',
    },
  ];

  return (
    <BasePageTable<EbirdTaxonomyVersion>
      description="Fetches a list of all versions of eBird's taxonomy, with a flag indicating the latest version."
      onSubmit={getTaxonomyVersions}
      requestOnMount
      tables={tables}
      title="Taxonomy Versions"
    />
  );
}
