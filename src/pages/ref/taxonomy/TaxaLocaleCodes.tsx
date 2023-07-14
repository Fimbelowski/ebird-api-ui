import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import useTaxaLocaleCodes from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxaLocaleCodes';
import PAGE from './PAGE';

export default function TaxaLocaleCodes() {
  const getTaxaLocaleCodes = useTaxaLocaleCodes();

  const tables: Tables<EbirdTaxaLocaleCode> = [
    {
      cells: [
        {
          callback: ({ name }) => name,
        },
        {
          callback: ({ code }) => code,
        },
        {
          callback: ({ lastUpdate }) => new Date(lastUpdate).toLocaleString(),
        },
      ],
      headers: [
        {
          label: 'Name',
        },
        {
          label: 'Code',
        },
        {
          label: 'Last Update',
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
