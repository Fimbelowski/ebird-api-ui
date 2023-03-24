import type EbirdRegion from '../types/EbirdRegion';
import useTable from '../hooks/useTable';

interface Props {
  regions: EbirdRegion[];
}

export default function EbirdRegionTable({ regions }: Props) {
  const Table = useTable<EbirdRegion>(
    [
      {
        callback: ({ name }) => name,
      },
      {
        callback: ({ code }) => code,
      },
    ],
    [
      {
        label: 'Name',
      },
      {
        label: 'Code',
      },
    ]
  );

  return <Table items={regions} />;
}
