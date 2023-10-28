import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import dateStringToEpochMilliseconds from '../../../utilities/dateStringToEpochMilliseconds';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import PAGE from './PAGE';
import hybridSortByDateString from '../../../utilities/hybridSortByDateString';
import { SortDirection } from '../../../components/Table/Table';
import useTaxaLocaleCodes from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxaLocaleCodes';

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
              hybridSortByDateString(
                items,
                ({ lastUpdate }: EbirdTaxaLocaleCode) =>
                  dateStringToEpochMilliseconds(lastUpdate)
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
