import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';

export interface EbirdRegion {
  code: string;
  name: string;
}

type Props = Omit<BasePageTableProps<EbirdRegion>, 'tables'>;

export function BasePageTableEbirdRegion(props: Props) {
  const tables: Tables<EbirdRegion> = [
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
