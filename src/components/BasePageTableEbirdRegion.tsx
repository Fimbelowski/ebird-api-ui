import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';
import { type SortConfig, SortDirection } from './Table/Table';

export interface EbirdRegion {
  code: string;
  name: string;
}

type Props = Omit<BasePageTableProps<EbirdRegion>, 'tables'>;

export function BasePageTableEbirdRegion(props: Props) {
  const sortConfig: Omit<SortConfig<EbirdRegion>, 'id'> = {
    initialSortDirection: SortDirection.Ascending,
    sort: (items: EbirdRegion[]) => items.toSorted(),
  };

  const tables: Tables<EbirdRegion> = [
    {
      columns: [
        {
          callback: ({ name }) => name,
          label: 'Name',
          sortConfig: {
            ...sortConfig,
            id: 'nameSort',
          },
        },
        {
          callback: ({ code }) => code,
          label: 'Code',
          sortConfig: {
            ...sortConfig,
            id: 'codeSort',
          },
        },
      ],
      title: 'Results Table',
    },
  ];

  return (
    <BasePageTable<EbirdRegion>
      {...props}
      tables={tables}
    />
  );
}
