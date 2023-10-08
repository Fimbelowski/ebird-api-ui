import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import useTaxonomyVersions from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxonomyVersions';
import type EbirdTaxonomyVersion from '../../../types/EbirdTaxonomyVersion';
import PAGE from './PAGE';

export default function TaxonomyVersions() {
  const getTaxonomyVersions = useTaxonomyVersions();

  const tables: Tables<EbirdTaxonomyVersion> = [
    {
      columns: [
        {
          callback: ({ authorityVer }) => authorityVer.toString(),
          label: 'Version',
        },
        {
          callback: ({ latest }) => latest.toString(),
          label: 'Latest',
        },
      ],
      title: 'Results Table',
    },
  ];

  return (
    <BasePageTable<EbirdTaxonomyVersion>
      onSubmit={getTaxonomyVersions}
      page={PAGE.TaxonomyVersions}
      requestOnMount
      tables={tables}
    />
  );
}
