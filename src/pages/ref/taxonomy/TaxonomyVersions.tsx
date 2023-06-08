import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import type EbirdTaxonomyVersion from '../../../services/ebird/types/EbirdTaxonomyVersion';
import useTaxonomyVersions from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomyVersions';

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
      open: true,
      title: 'Results Table',
    },
  ];

  return (
    <BasePageTable<EbirdTaxonomyVersion>
      onSubmit={getTaxonomyVersions}
      requestOnMount
      tables={tables}
      title="Taxonomy Versions"
    />
  );
}
