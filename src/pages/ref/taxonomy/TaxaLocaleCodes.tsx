import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import useTaxaLocaleCodes from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxaLocaleCodes';
import PAGE from './PAGE';
import { SortDirection } from '../../../components/Table/Table';
import radixSortByDateString from '../../../utilities/radixSortByDateString';

export default function TaxaLocaleCodes() {
  const getTaxaLocaleCodes = useTaxaLocaleCodes();

  const tables: Tables<EbirdTaxaLocaleCode> = [
    {
      columns: [
        {
          callback: ({ name }) => name,
          label: 'Name',
        },
        {
          callback: ({ code }) => code,
          label: 'Code',
        },
        {
          callback: ({ lastUpdate }) => new Date(lastUpdate).toLocaleString(),
          label: 'Last Update',
          sortConfig: {
            id: 'lastUpdateSort',
            initialSortDirection: SortDirection.Descending,
            sort: (items: EbirdTaxaLocaleCode[]) =>
              radixSortByDateString(
                items,
                ({ lastUpdate }: EbirdTaxaLocaleCode) => lastUpdate
              ).reverse(),
          },
        },
      ],
      title: 'Results Table',
    },
  ];

  return (
    <BasePageTable<EbirdTaxaLocaleCode>
      onSubmit={getTaxaLocaleCodes}
      page={PAGE.TaxaLocaleCodes}
      tables={tables}
    />
  );
}
