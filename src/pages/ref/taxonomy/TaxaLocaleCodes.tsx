import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import useTaxaLocaleCodes from '../../../services/ebird/hooks/endpoints/ref/taxonomy/useTaxaLocaleCodes';

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
      description="Fetches a list of supported locale codes and names used for species common names, as well as the last time they were updated."
      onSubmit={getTaxaLocaleCodes}
      requiresApiKey
      tables={tables}
      title="Taxa Locale Codes"
    />
  );
}
