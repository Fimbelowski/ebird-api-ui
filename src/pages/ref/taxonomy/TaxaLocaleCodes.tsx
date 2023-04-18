import { BasePageTable, type Tables } from '../../../components/BasePageTable';
import type EbirdTaxaLocaleCode from '../../../types/EbirdTaxaLocaleCode';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function TaxaLocaleCodes() {
  const { getTaxaLocaleCodes } = useEbirdApi();

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
      open: true,
      title: 'Results Table',
    },
  ];

  return (
    <BasePageTable<EbirdTaxaLocaleCode>
      onSubmit={getTaxaLocaleCodes}
      requiresApiKey
      tables={tables}
      title="Taxa Locale Codes"
    />
  );
}
