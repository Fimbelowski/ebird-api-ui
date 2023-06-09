import {
  BasePageTable,
  type BasePageTableProps,
  type Tables,
} from './BasePageTable';

interface EbirdRegion {
  code: string;
  name: string;
}

type Props = Omit<BasePageTableProps<EbirdRegion>, 'tables'>;

export default function BasePageTableEbirdRegion(props: Props) {
  const tables: Tables<EbirdRegion> = [
    {
      cells: [
        {
          callback: ({ name }) => name,
        },
        {
          callback: ({ code }) => code,
        },
      ],
      headers: [
        {
          label: 'Name',
        },
        {
          label: 'Code',
        },
      ],
      open: true,
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
